import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cloud, Moon, Wind, Eye, Navigation } from 'lucide-react';
import { useAppContext } from '../../store/AppContext';
import { getLocationDetails } from '../../services/api';

export default function AnalysisPanel() {
  const { selectedLocation, setSelectedLocation } = useAppContext();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedLocation) {
      setLoading(true);
      getLocationDetails(selectedLocation.id).then(data => {
        setDetails(data);
        setLoading(false);
      });
    } else {
      setDetails(null);
    }
  }, [selectedLocation]);

  return (
    <AnimatePresence>
      {selectedLocation && (
        <motion.div
          initial={{ y: '-100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed right-0 md:right-8 top-0 md:top-8 bottom-0 md:bottom-auto md:max-h-[90vh] w-full md:w-[400px] glass-panel-strong border border-white/10 rounded-none md:rounded-3xl z-50 p-6 overflow-y-auto shadow-2xl"
        >
          <button 
            onClick={() => setSelectedLocation(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition"
          >
            <X className="h-5 w-5 text-white" />
          </button>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-1">{selectedLocation.name}</h2>
            <div className="flex items-center gap-4 text-sm text-white/60 mb-8 border-b border-white/10 pb-6">
              <span className="flex items-center gap-1"><Navigation className="h-4 w-4" /> {selectedLocation.distance}</span>
              {details && <span>{details.travelTime} drive</span>}
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <span className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-500/30 border-t-cyan-500" />
              </div>
            ) : details ? (
              <div className="space-y-6">
                
                <div className="glass-panel rounded-xl p-5 border border-white/5">
                  <div className="flex items-center gap-3 mb-4">
                    <Eye className="h-5 w-5 text-cyan-400" />
                    <h3 className="font-semibold text-white">Visibility Score</h3>
                  </div>
                  <div className="text-5xl font-bold text-white glow-text-cyan mb-2">{details.visibilityScore}</div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${details.visibilityScore}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="glass-panel rounded-xl p-4 border border-white/5">
                    <Cloud className="h-5 w-5 text-blue-400 mb-2" />
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Cloud Cover</p>
                    <p className="font-semibold text-white">{details.cloudCover}</p>
                  </div>
                  <div className="glass-panel rounded-xl p-4 border border-white/5">
                    <Moon className="h-5 w-5 text-yellow-400 mb-2" />
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Moon Phase</p>
                    <p className="font-semibold text-white">{details.moonPhase}</p>
                  </div>
                  <div className="glass-panel rounded-xl p-4 border border-white/5">
                    <Wind className="h-5 w-5 text-teal-400 mb-2" />
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Air Quality</p>
                    <p className="font-semibold text-white">{details.airQuality}</p>
                  </div>
                  <div className="glass-panel rounded-xl p-4 border border-white/5">
                    <div className="h-5 w-5 text-purple-400 mb-2 flex items-center justify-center font-bold font-mono">B</div>
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Light Pollution</p>
                    <p className="font-semibold text-white">{details.lightPollution}</p>
                  </div>
                </div>
                
                <button className="w-full mt-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors border border-white/10">
                  Get Directions
                </button>
              </div>
            ) : null}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
