import { generateNearbyCoordinates } from '../utils/coordinates';

export const searchLocations = async (query) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  if (!query) return [];

  return [
    {
      id: '1',
      name: 'Dark Sky Preserve',
      lat: 34.0522,
      lng: -118.2437,
      distance: '24 km',
      score: 95,
      preview: 'Clear skies, high elevation'
    },
    {
      id: '2',
      name: 'Observatory Ridge',
      lat: 40.7128,
      lng: -74.0060,
      distance: '45 km',
      score: 88,
      preview: 'Good visibility, slight light pollution'
    },
    {
      id: '3',
      name: 'Lake Solitude',
      lat: 51.5074,
      lng: -0.1278,
      distance: '12 km',
      score: 82,
      preview: 'Near water, medium cloud cover'
    }
  ];
};

export const getLocationDetails = async (location) => {
  await new Promise(resolve => setTimeout(resolve, 500));

  // Generate 4 nearby coordinates for the 4 metric pins
  const coords = generateNearbyCoordinates(location.lat, location.lng, 4, 2.5);

  const metricPins = [
    { id: 'm1', type: 'AQI',    value: 'AQI 24',       lat: coords[0].lat, lng: coords[0].lng },
    { id: 'm2', type: 'BORTLE', value: 'Bortle 3',      lat: coords[1].lat, lng: coords[1].lng },
    { id: 'm3', type: 'CLOUD',  value: '12% Cover',     lat: coords[2].lat, lng: coords[2].lng },
    { id: 'm4', type: 'MOON',   value: 'Crescent 15%',  lat: coords[3].lat, lng: coords[3].lng },
  ];

  return {
    id: location.id,
    cloudCover: '12%',
    moonPhase: 'Waxing Crescent (15%)',
    lightPollution: 'Class 3 (Bortle)',
    airQuality: 'AQI 24 (Optimal)',
    visibilityScore: 92,
    travelTime: '45 mins',
    metricPins
  };
};
