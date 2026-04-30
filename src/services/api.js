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

export const getLocationDetails = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 500));

  return {
    id,
    cloudCover: '12%',
    moonPhase: 'Waxing Crescent (15%)',
    lightPollution: 'Class 3 (Bortle)',
    airQuality: 'AQI 24 (Optimal)',
    visibilityScore: 92,
    travelTime: '45 mins'
  };
};
