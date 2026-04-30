import { useCallback, useEffect, useMemo, useState } from 'react';
import SpaceCanvas from './components/SpaceCanvas';
import Overlay from './components/Overlay';
import {
  getLocationSuggestions,
  getNearby,
  getPlan,
  getUpcomingMoments,
} from './services/api';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [suggestLoading, setSuggestLoading] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [nearbyData, setNearbyData] = useState(null);
  const [planData, setPlanData] = useState(null);
  const [upcomingMoments, setUpcomingMoments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const q = searchQuery.trim();
    if (q.length < 3) {
      setSuggestions([]);
      return undefined;
    }
    setSuggestLoading(true);
    const t = setTimeout(() => {
      getLocationSuggestions(q, 6)
        .then((res) => {
          setSuggestions(Array.isArray(res?.suggestions) ? res.suggestions : []);
        })
        .catch(() => {
          setSuggestions([]);
        })
        .finally(() => setSuggestLoading(false));
    }, 400);
    return () => clearTimeout(t);
  }, [searchQuery]);

  const selectPinFromNearby = useCallback((nearby, labelFallback) => {
    const best = nearby?.best_spot;
    const optimal = nearby?.optimal_coordinates;
    if (best?.latitude != null && best?.longitude != null) {
      return {
        latitude: Number(best.latitude),
        longitude: Number(best.longitude),
        name: best.name || labelFallback || 'Best spot',
      };
    }
    if (optimal?.latitude != null && optimal?.longitude != null) {
      return {
        latitude: Number(optimal.latitude),
        longitude: Number(optimal.longitude),
        name: 'Best Physics-Based Location',
      };
    }
    return null;
  }, []);

  const runSearch = useCallback(
    async (payload, displayName = '') => {
      setLoading(true);
      setError('');
      try {
        const nearbyPayload = {
          target: 'milky_way',
          radius_km: 150,
          ...payload,
        };
        const nearby = await getNearby(nearbyPayload);
        setNearbyData(nearby);

        const pin = selectPinFromNearby(nearby, displayName);
        setSelectedLocation(pin);

        const planBase =
          pin?.latitude != null && pin?.longitude != null
            ? { latitude: pin.latitude, longitude: pin.longitude }
            : payload;

        const now = new Date();
        const date = now.toISOString().slice(0, 10);
        const time = `${String(now.getHours()).padStart(2, '0')}:00`;

        const [plan, moments] = await Promise.all([
          getPlan({
            ...planBase,
            target: 'milky_way',
            date,
            time,
            location_name: displayName || payload.location_name || undefined,
          }),
          getUpcomingMoments({
            ...planBase,
            days: 3,
            radius_km: 120,
          }),
        ]);
        setPlanData(plan);
        setUpcomingMoments(moments?.moments || []);
        setSuggestions([]);
      } catch (err) {
        const detail = err?.response?.data?.detail;
        const msg =
          typeof detail === 'string'
            ? detail
            : Array.isArray(detail)
              ? detail.map((d) => d?.msg || d).join('; ')
              : err?.message || 'Request failed';
        setError(String(msg));
      } finally {
        setLoading(false);
      }
    },
    [selectPinFromNearby],
  );

  const handleSubmitSearch = useCallback(() => {
    const q = searchQuery.trim();
    if (!q) return;
    runSearch({ location_name: q }, q);
  }, [runSearch, searchQuery]);

  const handlePickSuggestion = useCallback(
    (s) => {
      const lat = s?.latitude;
      const lon = s?.longitude;
      const label = s?.description || '';
      if (lat != null && lon != null) {
        runSearch({ latitude: Number(lat), longitude: Number(lon) }, label);
        setSearchQuery(label);
      } else if (label) {
        runSearch({ location_name: label }, label);
        setSearchQuery(label);
      }
    },
    [runSearch],
  );

  const handleUseBrowserLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Browser geolocation is not available.');
      return;
    }
    setLoading(true);
    setError('');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        runSearch(
          {
            latitude: Number(pos.coords.latitude),
            longitude: Number(pos.coords.longitude),
          },
          'Your location',
        );
      },
      (geoErr) => {
        setLoading(false);
        setError(geoErr?.message || 'Could not read your location.');
      },
      { enableHighAccuracy: true, timeout: 15000 },
    );
  }, [runSearch]);

  const overlayProps = useMemo(
    () => ({
      searchQuery,
      setSearchQuery,
      suggestions,
      suggestLoading,
      onPickSuggestion: handlePickSuggestion,
      onSubmitSearch: handleSubmitSearch,
      onUseBrowserLocation: handleUseBrowserLocation,
      loading,
      error,
      nearbyData,
      planData,
      upcomingMoments,
      onPickLocation: setSelectedLocation,
    }),
    [
      searchQuery,
      suggestions,
      suggestLoading,
      handlePickSuggestion,
      handleSubmitSearch,
      handleUseBrowserLocation,
      loading,
      error,
      nearbyData,
      planData,
      upcomingMoments,
    ],
  );

  return (
    <>
      <SpaceCanvas selectedLocation={selectedLocation} />
      <Overlay {...overlayProps} />
    </>
  );
}

export default App;
