import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [metricPins, setMetricPins] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  return (
    <AppContext.Provider value={{
      selectedLocation,
      setSelectedLocation,
      metricPins,
      setMetricPins,
      isSearching,
      setIsSearching,
      searchResults,
      setSearchResults,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
