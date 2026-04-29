import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Wind, Cloud, Sun, Moon, Compass, BarChart2, MapPin, Calendar, Clock, Search } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" }
};

export default function Overlay() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      alert(`Observation data loaded for: ${searchQuery}`);
    }, 1500);
  };

  return (
    <div className="relative z-10 w-full text-white font-sans selection:bg-white/20 selection:text-white">
      
      {/* 1. Top Navigation (Fixed) */}
      <nav className="fixed top-0 left-0 w-full p-4 flex justify-between items-center bg-slate-950/80 backdrop-blur-md border-b border-white/10 z-50">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-sm font-mono font-bold tracking-wider text-white uppercase">NIGHTOWL // SYS</span>
        </div>
        <ul className="hidden md:flex gap-6 font-mono text-xs tracking-widest text-gray-300">
          <li><a href="#conditions" className="hover:text-white transition-colors">CONDITIONS</a></li>
          <li><a href="#visibility" className="hover:text-white transition-colors">VISIBILITY</a></li>
          <li><a href="#locations" className="hover:text-white transition-colors">LOCATIONS</a></li>
          <li><a href="#events" className="hover:text-white transition-colors">EVENTS</a></li>
          <li><a href="#forecast" className="hover:text-white transition-colors">FORECAST</a></li>
        </ul>
        <div className="text-[10px] font-mono text-gray-400 hidden sm:block">
          SYS_STATUS: <span className="text-green-400 font-bold">NOMINAL</span>
        </div>
      </nav>

      {/* Main Content Flow */}
      <div className="flex flex-col items-center px-4 pt-24 pb-12 gap-24 md:gap-32">
        
        {/* 2. Main Page (Hero with Search Bar only) */}
        <section className="min-h-[85vh] flex flex-col items-center justify-center max-w-xl w-full">
          <motion.div 
            {...fadeInUp}
            className="w-full"
          >
            <h1 className="text-xl font-mono font-bold tracking-wider text-center text-white mb-6 uppercase">
              Locate Optimal Observation Zone
            </h1>
            <form onSubmit={handleSearch} className="relative flex items-center">
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ENTER COORDINATES OR LOCATION..."
                className="w-full bg-slate-950/60 backdrop-blur-md border border-white/20 rounded-lg py-4 pl-12 pr-32 text-sm font-mono tracking-wider text-white placeholder-gray-500 focus:outline-none focus:border-white/40 shadow-2xl transition-all"
              />
              <Search className="absolute left-4 text-gray-400 w-5 h-5" />
              <button 
                type="submit"
                disabled={isSearching}
                className="absolute right-2 top-2 bottom-2 bg-white text-slate-950 hover:bg-gray-200 disabled:bg-gray-500 font-mono text-xs font-bold tracking-wider px-4 rounded transition-all flex items-center gap-1 uppercase"
              >
                {isSearching ? 'SEARCHING' : 'SEARCH'}
              </button>
            </form>
          </motion.div>
        </section>

        {/* 3. Conditions Module */}
        <section id="conditions" className="scroll-mt-24 max-w-xl w-full">
          <motion.div 
            {...fadeInUp}
            className="w-full bg-slate-950/60 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-2xl"
          >
            <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-6">
              <Wind className="text-gray-300 w-4 h-4" />
              <h2 className="text-xs font-mono font-bold tracking-widest text-gray-400 uppercase">01 // Conditions Module</h2>
            </div>

            <div className="divide-y divide-white/10 font-mono text-xs">
              {[
                { label: 'Air Quality (AQI)', value: '24', desc: 'Optimal' },
                { label: 'Light Pollution Index', value: 'Class 3', desc: 'Bortle Scale' },
                { label: 'Cloud Forecast', value: '12%', desc: 'Clear' },
                { label: 'Moon Illumination', value: '15%', desc: 'Waxing Crescent' },
                { label: 'Atmospheric Clarity', value: '92%', desc: 'Excellent' },
              ].map((item, index) => (
                <div key={index} className="py-3 flex items-center justify-between">
                  <span className="text-gray-400 uppercase">{item.label}</span>
                  <div className="text-right">
                    <span className="text-white font-bold">{item.value}</span>
                    <span className="block text-[10px] text-gray-400 uppercase tracking-wider">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 4. Visibility Computation Panel */}
        <section id="visibility" className="scroll-mt-24 max-w-xl w-full">
          <motion.div 
            {...fadeInUp}
            className="w-full bg-slate-950/60 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-2xl"
          >
            <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-6">
              <BarChart2 className="text-gray-300 w-4 h-4" />
              <h2 className="text-xs font-mono font-bold tracking-widest text-gray-400 uppercase">02 // Visibility Computation</h2>
            </div>

            <div className="mb-6 flex items-baseline justify-between">
              <span className="text-sm font-mono text-gray-400">OVERALL SCORE</span>
              <span className="text-4xl font-mono font-bold text-white">88%</span>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Stellar Visibility Probability', value: 94 },
                { label: 'Milky Way Visibility', value: 85 },
                { label: 'Aurora Probability', value: 12 },
              ].map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-baseline font-mono text-xs">
                    <span className="text-gray-400 uppercase">{item.label}</span>
                    <span className="text-white font-bold">{item.value}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      style={{ width: `${item.value}%` }}
                      className="h-full bg-white rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 5. Locations Panel */}
        <section id="locations" className="scroll-mt-24 max-w-xl w-full">
          <motion.div 
            {...fadeInUp}
            className="w-full bg-slate-950/60 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-2xl"
          >
            <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-6">
              <MapPin className="text-gray-300 w-4 h-4" />
              <h2 className="text-xs font-mono font-bold tracking-widest text-gray-400 uppercase">03 // Optimal Locations</h2>
            </div>

            <div className="space-y-4 font-mono text-xs">
              {[
                { name: 'Dark Sky Preserve A', elevation: '420m', openness: 'High', score: 92, distance: '24km' },
                { name: 'Observatory Ridge', elevation: '510m', openness: 'Medium', score: 85, distance: '45km' },
                { name: 'Lake Solitude', elevation: '310m', openness: 'High', score: 78, distance: '12km' },
              ].map((loc, index) => (
                <div key={index} className="p-3 bg-white/5 border border-white/10 rounded-lg flex justify-between items-center">
                  <div>
                    <span className="font-bold text-white block">{loc.name}</span>
                    <span className="text-[10px] text-gray-400 block mt-0.5">EL: {loc.elevation} // OPENNESS: {loc.openness}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-white block">{loc.score}</span>
                    <span className="text-[10px] text-gray-400 block uppercase">{loc.distance}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 6. Events Panel */}
        <section id="events" className="scroll-mt-24 max-w-xl w-full">
          <motion.div 
            {...fadeInUp}
            className="w-full bg-slate-950/60 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-2xl"
          >
            <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-6">
              <Calendar className="text-gray-300 w-4 h-4" />
              <h2 className="text-xs font-mono font-bold tracking-widest text-gray-400 uppercase">04 // Celestial Events</h2>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {[
                { event: 'Northern Lights Probability', value: '12% / Low' },
                { event: 'Perseid Meteor Shower', value: 'Peak in 14 days' },
                { event: 'Lunar Eclipse', value: 'Oct 28 (Partial)' },
              ].map((evt, index) => (
                <div key={index} className="py-2 flex justify-between border-b border-white/5 last:border-0">
                  <span className="text-gray-400 uppercase">{evt.event}</span>
                  <span className="text-white font-bold">{evt.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 7. Forecast Panel */}
        <section id="forecast" className="scroll-mt-24 max-w-xl w-full mb-12">
          <motion.div 
            {...fadeInUp}
            className="w-full bg-slate-950/60 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-2xl"
          >
            <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-6">
              <Clock className="text-gray-300 w-4 h-4" />
              <h2 className="text-xs font-mono font-bold tracking-widest text-gray-400 uppercase">05 // Observation Forecast</h2>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                <span className="text-gray-400 block uppercase">Best Time Tonight</span>
                <span className="text-sm font-bold text-white block mt-1">23:00 - 02:30 UTC</span>
              </div>
              <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                <span className="text-gray-400 block uppercase">Best Night This Week</span>
                <span className="text-sm font-bold text-white block mt-1">Thursday (Sky Score: 94)</span>
              </div>
              <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                <span className="text-gray-400 block uppercase">Recommended Window</span>
                <span className="text-sm font-bold text-white block mt-1">Next 48 Hours</span>
              </div>
            </div>
          </motion.div>
        </section>

      </div>

      {/* Footer */}
      <footer className="w-full text-center font-mono text-[10px] text-gray-500 py-6 border-t border-white/10 bg-slate-950/80 backdrop-blur-md">
        <span>&copy; 2026 NIGHTOWL OBSERVATORY // ALL SYSTEMS OPERATIONAL</span>
      </footer>

    </div>
  );
}
