import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin } from 'lucide-react';
import { searchLocations } from '../../services/api';
import { useAppContext } from '../../store/AppContext';

export default function SearchSystem() {
  const [query, setQuery] = useState('');
  const {
    isSearching, setIsSearching,
    searchResults, setSearchResults,
    setSelectedLocation, selectedLocation
  } = useAppContext();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    try {
      const results = await searchLocations(query);
      setSearchResults(results);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
  };

  return (
    <AnimatePresence mode="wait">
      {!selectedLocation ? (
        <motion.section
          key="search-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4 }}
          className="min-h-screen flex flex-col items-center justify-center px-4 relative z-50 pointer-events-auto"
        >
          <div className="w-full max-w-xl">
            <h2 className="text-2xl font-semibold mb-8 text-center text-white glow-text-cyan">
              Track Milky Way, planets, and visibility in real-time
            </h2>

            <form onSubmit={handleSearch} className="relative mb-8 pointer-events-auto">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-white/50" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search address or city..."
                className="w-full bg-black/40 border border-white/20 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-white/50 backdrop-blur-md focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all shadow-lg"
              />
              <button
                type="submit"
                disabled={isSearching}
                className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-6 rounded-xl font-medium transition-all shadow-[0_0_15px_rgba(0,243,255,0.4)] disabled:opacity-50"
              >
                {isSearching ? 'Scanning...' : 'Search'}
              </button>
            </form>

            {/* Suggestions list */}
            <AnimatePresence>
              {searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-3 pointer-events-auto overflow-hidden"
                >
                  {searchResults.map((loc, idx) => (
                    <motion.button
                      key={loc.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      onClick={() => handleSelectLocation(loc)}
                      className="w-full text-left glass-panel rounded-xl p-5 hover:bg-white/10 transition-all border border-white/10 hover:border-cyan-400/50 group"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-cyan-400" />
                            {loc.name}
                          </h3>
                          <p className="text-sm text-white/60 mt-1">{loc.preview}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-white block glow-text-cyan">{loc.score}</span>
                          <span className="text-xs uppercase tracking-wider text-white/50">{loc.distance}</span>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.section>
      ) : (
        /* When location is selected, this section is completely gone — 
           the globe and pins are fully visible */
        <motion.div
          key="selected-spacer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="h-screen"
        />
      )}
    </AnimatePresence>
  );
}
