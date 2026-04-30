import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cloud, Moon, Wind, Eye, Navigation } from 'lucide-react';
import { useAppContext } from '../../store/AppContext';
import { getLocationDetails } from '../../services/api';

export default function AnalysisPanel() {
  const { selectedLocation, setSelectedLocation, setMetricPins } = useAppContext();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedLocation) {
      setLoading(true);
      getLocationDetails(selectedLocation).then(data => {
        setDetails(data);
        setMetricPins(data.metricPins || []);
        setLoading(false);
      });
    } else {
      setDetails(null);
      setMetricPins([]);
    }
  }, [selectedLocation, setMetricPins]);

  return (
    <AnimatePresence>
      {selectedLocation && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ type: 'spring', damping: 22, stiffness: 180 }}
          className="fixed right-4 md:right-8 top-4 md:top-8 w-[calc(100%-2rem)] md:w-[380px] glass-panel-strong border border-white/10 rounded-2xl z-50 p-6 overflow-y-auto max-h-[85vh] shadow-2xl pointer-events-auto"
        >
          <button
            onClick={() => setSelectedLocation(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 transition"
          >
            <X className="h-4 w-4 text-white" />
          </button>

          <div className="mt-6">
            <h2 className="text-xl font-bold text-white mb-1">{selectedLocation.name}</h2>
            <div className="flex items-center gap-4 text-sm text-white/60 mb-6 border-b border-white/10 pb-4">
              <span className="flex items-center gap-1"><Navigation className="h-3.5 w-3.5" /> {selectedLocation.distance}</span>
              {details && <span>{details.travelTime} drive</span>}
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <span className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-500/30 border-t-cyan-500" />
              </div>
            ) : details ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-5"
              >
                {/* Visibility Score */}
                <div className="glass-panel rounded-xl p-4 border border-white/5">
                  <div className="flex items-center gap-3 mb-3">
                    <Eye className="h-5 w-5 text-cyan-400" />
                    <h3 className="font-semibold text-white text-sm">Visibility Score</h3>
                  </div>
                  <div className="text-4xl font-bold text-white glow-text-cyan mb-2">{details.visibilityScore}</div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${details.visibilityScore}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                    />
                  </div>
                </div>

                {/* Metric cards — matching the pin colors */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="glass-panel rounded-xl p-3 border border-white/5">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <p className="text-xs text-white/50 uppercase tracking-wider">Air Quality</p>
                    </div>
                    <p className="font-semibold text-white text-sm">{details.airQuality}</p>
                  </div>
                  <div className="glass-panel rounded-xl p-3 border border-white/5">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-purple-500" />
                      <p className="text-xs text-white/50 uppercase tracking-wider">Light Pollution</p>
                    </div>
                    <p className="font-semibold text-white text-sm">{details.lightPollution}</p>
                  </div>
                  <div className="glass-panel rounded-xl p-3 border border-white/5">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <p className="text-xs text-white/50 uppercase tracking-wider">Cloud Cover</p>
                    </div>
                    <p className="font-semibold text-white text-sm">{details.cloudCover}</p>
                  </div>
                  <div className="glass-panel rounded-xl p-3 border border-white/5">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-yellow-500" />
                      <p className="text-xs text-white/50 uppercase tracking-wider">Moon Phase</p>
                    </div>
                    <p className="font-semibold text-white text-sm">{details.moonPhase}</p>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
