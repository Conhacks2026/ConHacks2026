// Utility to generate a cluster of coordinates around a central lat/lng
export const generateNearbyCoordinates = (lat, lng, count, radiusInDegrees = 2) => {
  const coordinates = [];
  
  for (let i = 0; i < count; i++) {
    // Generate a random angle and distance within the radius
    const angle = Math.random() * Math.PI * 2;
    const r = Math.random() * radiusInDegrees;
    
    // Calculate new lat/lng offsets
    // Note: longitude offset varies depending on latitude (cos(lat))
    const latOffset = r * Math.sin(angle);
    const lngOffset = (r * Math.cos(angle)) / Math.cos(lat * (Math.PI / 180));
    
    coordinates.push({
      lat: lat + latOffset,
      lng: lng + lngOffset,
    });
  }
  
  return coordinates;
};
