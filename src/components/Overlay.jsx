import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, BarChart2, MapPin, Calendar, Clock, Search, ChevronRight, ChevronLeft } from 'lucide-react';
import Toggle from './toggle';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" }
};

export default function Overlay() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [activeCard, setActiveCard] = useState(0);

  const containerRef = useRef(null);
  const cardContainerRef = useRef(null);
  const imageRefs = useRef([]);

  const handleNavClick = (index) => {
    setActiveCard(index);
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const floatingItemsRef = useRef([
    { src: '/elementsinspace/1.png', x: 50, y: 150, vx: 0.4, vy: 0.3, w: 220, h: 220 },
    { src: '/elementsinspace/2.png', x: 100, y: 600, vx: -0.3, vy: 0.4, w: 220, h: 220 },
    { src: '/elementsinspace/4.png', x: 900, y: 200, vx: 0.4, vy: -0.3, w: 220, h: 220 },
    { src: '/elementsinspace/5.png', x: 800, y: 650, vx: -0.4, vy: -0.4, w: 220, h: 220 },
  ]);

  const cards = [
    {
      id: 'conditions',
      title: '01 // Conditions Module',
      icon: Wind,
      color: 'from-cyan-500/20 to-blue-500/10',
      accent: 'text-cyan-400',
      content: (
        <div className="divide-y divide-white/5 font-card text-lg">
          {[
            { label: 'Air Quality (AQI)', value: '24', desc: 'Optimal' },
            { label: 'Light Pollution Index', value: 'Class 3', desc: 'Bortle Scale' },
            { label: 'Cloud Forecast', value: '12%', desc: 'Clear' },
            { label: 'Moon Illumination', value: '15%', desc: 'Waxing Crescent' },
            { label: 'Atmospheric Clarity', value: '92%', desc: 'Excellent' },
          ].map((item, index) => (
            <div key={index} className="py-4 px-4 mb-3 flex items-center justify-between rounded-[1.5rem] bg-white/5 border border-white/10 shadow-[0_14px_32px_rgba(0,100,180,0.06)] backdrop-blur-md">
              <span className="text-gray-300 uppercase text-sm">{item.label}</span>
              <div className="text-right">
                <span className="text-white font-bold text-xl">{item.value}</span>
                <span className="block text-sm text-gray-400 uppercase tracking-wider">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'visibility',
      title: '02 // Visibility Computation',
      icon: BarChart2,
      color: 'from-purple-500/20 to-pink-500/10',
      accent: 'text-purple-400',
      content: (
        <div className="font-card">
          <div className="mb-5 flex items-baseline justify-between">
            <span className="text-sm text-gray-400">OVERALL SCORE</span>
            <span className="text-2xl font-bold text-purple-400">88%</span>
          </div>
          <div className="space-y-6">
            {[
              { label: 'Stellar Visibility Probability', value: 94 },
              { label: 'Milky Way Visibility', value: 85 },
              { label: 'Aurora Probability', value: 12 },
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-baseline text-sm">
                  <span className="text-gray-300 uppercase text-base">{item.label}</span>
                  <span className="text-white font-bold text-xl">{item.value}%</span>
                </div>
                <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    style={{ width: `${item.value}%` }}
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'locations',
      title: '03 // Optimal Locations',
      icon: MapPin,
      color: 'from-blue-500/20 to-cyan-500/10',
      accent: 'text-blue-400',
      content: (
        <div className="space-y-4 font-card">
          {[
            { name: 'Dark Sky Preserve A', elevation: '420m', openness: 'High', score: 92, distance: '24km' },
            { name: 'Observatory Ridge', elevation: '510m', openness: 'Medium', score: 85, distance: '45km' },
            { name: 'Lake Solitude', elevation: '310m', openness: 'High', score: 78, distance: '12km' },
          ].map((loc, index) => (
            <div key={index} className="p-4 bg-white/5 border border-white/5 rounded-xl flex justify-between items-center hover:border-blue-500/30 transition-all duration-300">
              <div>
                <span className="font-bold text-white text-xl block">{loc.name}</span>
                <span className="text-base text-gray-400 block mt-1">EL: {loc.elevation} // OPENNESS: {loc.openness}</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-blue-400 block">{loc.score}</span>
                <span className="text-sm text-gray-400 block uppercase tracking-wider">{loc.distance}</span>
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'events',
      title: '04 // Celestial Events',
      icon: Calendar,
      color: 'from-pink-500/20 to-purple-500/10',
      accent: 'text-pink-400',
      content: (
        <div className="space-y-4 font-card text-base">
          {[
            { event: 'Northern Lights Probability', value: '12% / Low' },
            { event: 'Perseid Meteor Shower', value: 'Peak in 14 days' },
            { event: 'Lunar Eclipse', value: 'Oct 28 (Partial)' },
          ].map((evt, index) => (
            <div key={index} className="py-3 flex justify-between border-b border-white/5 last:border-0">
              <span className="text-gray-300 uppercase text-sm">{evt.event}</span>
              <span className="text-pink-300 font-bold text-base">{evt.value}</span>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'forecast',
      title: '05 // Observation Forecast',
      icon: Clock,
      color: 'from-indigo-500/20 to-blue-500/10',
      accent: 'text-indigo-400',
      content: (
        <div className="grid grid-cols-1 gap-4 font-card text-sm">
          {[
            { label: 'Best Time Tonight', value: '23:00 - 02:30 UTC' },
            { label: 'Best Night This Week', value: 'Thursday (Score: 94)' },
            { label: 'Recommended Window', value: 'Next 48 Hours' },
          ].map((item, index) => (
            <div key={index} className="p-4 bg-white/5 border border-white/5 rounded-2xl">
              <span className="text-gray-400 block text-base uppercase tracking-wider">{item.label}</span>
              <span className="text-xl font-bold text-indigo-300 block mt-1">{item.value}</span>
            </div>
          ))}
        </div>
      )
    }
  ];

  const nextCard = () => setActiveCard((prev) => (prev + 1) % cards.length);
  const prevCard = () => setActiveCard((prev) => (prev - 1 + cards.length) % cards.length);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      alert(`Observation data loaded for: ${searchQuery}`);
    }, 1500);
  };

  useEffect(() => {
    let animationId;
    const items = floatingItemsRef.current;

    const updatePhysics = () => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const containerW = containerRect.width;
      const containerH = containerRect.height;

      let cardRel = { left: containerW / 2 - 300, right: containerW / 2 + 300, top: containerH / 2 - 250, bottom: containerH / 2 + 250 };
      
      if (cardContainerRef.current) {
        const cardRect = cardContainerRef.current.getBoundingClientRect();
        cardRel.left = cardRect.left - containerRect.left;
        cardRel.top = cardRect.top - containerRect.top;
        cardRel.right = cardRel.left + cardRect.width;
        cardRel.bottom = cardRel.top + cardRect.height;
      }

      items.forEach((item, index) => {
        item.x += item.vx;
        item.y += item.vy;

        if (item.x < 0) {
          item.x = 0;
          item.vx = Math.abs(item.vx);
        } else if (item.x + item.w > containerW) {
          item.x = containerW - item.w;
          item.vx = -Math.abs(item.vx);
        }

        if (item.y < 0) {
          item.y = 0;
          item.vy = Math.abs(item.vy);
        } else if (item.y + item.h > containerH) {
          item.y = containerH - item.h;
          item.vy = -Math.abs(item.vy);
        }

        if (
          item.x + item.w > cardRel.left &&
          item.x < cardRel.right &&
          item.y + item.h > cardRel.top &&
          item.y < cardRel.bottom
        ) {
          const dLeft = (item.x + item.w) - cardRel.left;
          const dRight = cardRel.right - item.x;
          const dTop = (item.y + item.h) - cardRel.top;
          const dBottom = cardRel.bottom - item.y;

          const minD = Math.min(dLeft, dRight, dTop, dBottom);

          if (minD === dLeft) {
            item.vx = -Math.abs(item.vx);
            item.x = cardRel.left - item.w;
          } else if (minD === dRight) {
            item.vx = Math.abs(item.vx);
            item.x = cardRel.right;
          } else if (minD === dTop) {
            item.vy = -Math.abs(item.vy);
            item.y = cardRel.top - item.h;
          } else if (minD === dBottom) {
            item.vy = Math.abs(item.vy);
            item.y = cardRel.bottom;
          }
        }

        if (imageRefs.current[index]) {
          imageRefs.current[index].style.transform = `translate(${item.x}px, ${item.y}px)`;
        }
      });

      for (let i = 0; i < items.length; i++) {
        for (let j = i + 1; j < items.length; j++) {
          const itA = items[i];
          const itB = items[j];

          const cAx = itA.x + itA.w / 2;
          const cAy = itA.y + itA.h / 2;
          const cBx = itB.x + itB.w / 2;
          const cBy = itB.y + itB.h / 2;

          const dist = Math.hypot(cAx - cBx, cAy - cBy);
          const minSafety = (itA.w + itB.w) / 2;

          if (dist < minSafety) {
            const vxSwap = itA.vx;
            itA.vx = itB.vx;
            itB.vx = vxSwap;

            const vySwap = itA.vy;
            itA.vy = itB.vy;
            itB.vy = vySwap;

            const overlap = minSafety - dist;
            const pushX = ((cAx - cBx) / dist) * overlap / 2;
            const pushY = ((cAy - cBy) / dist) * overlap / 2;

            itA.x += pushX;
            itA.y += pushY;
            itB.x -= pushX;
            itB.y -= pushY;
          }
        }
      }

      animationId = requestAnimationFrame(updatePhysics);
    };

    animationId = requestAnimationFrame(updatePhysics);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="relative z-10 w-full font-sans text-white selection:bg-white/20 selection:text-white">
      
      {/* 1. Top Navigation */}
      <nav className="fixed top-0 left-0 w-full p-4 flex justify-between items-center bg-slate-950/80 backdrop-blur-md border-b border-white/10 z-50 text-white">
        <div className="flex items-end gap-3">
          <div className="w-2 h-2 rounded-full bg-white animate-pulse mt-1" />
          <div className="flex flex-col items-start gap-0">
            <span className="site-title beau-rivage-regular text-xl sm:text-2xl lg:text-3xl font-bold tracking-[0.18em] pb-1 border-b border-white/20 leading-none">NightOwl</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-slate-400">SYS</span>
          </div>
        </div>
        <ul className="hidden md:flex gap-6 font-mono text-base tracking-widest text-slate-300">
          {cards.map((card, index) => (
            <li key={card.id}>
              <button 
                onClick={() => handleNavClick(index)}
                className={`hover:text-white transition-colors uppercase ${activeCard === index ? 'text-white font-bold border-b border-white' : ''}`}
              >
                {card.id}
              </button>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-6 hidden sm:flex">
          <Toggle label="OBS_MODE" />
          <div className="text-[10px] font-mono text-slate-400">
            SYS_STATUS: <span className="text-green-400 font-bold">NOMINAL</span>
          </div>
        </div>
      </nav>

      {/* Main Content Flow - Transparent to reveal 3D canvas */}
      <div className="flex flex-col items-center w-full bg-transparent">
        
        {/* 2. Main Page (Hero - Transparent to reveal space canvas) */}
        <section className="min-h-[90vh] flex flex-col items-center justify-center max-w-xl w-full px-4 text-white">
          <motion.div 
            {...fadeInUp}
            className="w-full p-0"
          >
            <h1 className="text-lg sm:text-xl lg:text-2xl font-mono font-bold tracking-[0.22em] text-center text-white mb-6 uppercase">
              Locate Optimal Observation Zone
            </h1>
            <form onSubmit={handleSearch} className="relative flex items-center">
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ENTER COORDINATES OR LOCATION..."
                className="w-full bg-slate-950/60 backdrop-blur-md border border-white/20 rounded-lg py-4 pl-12 pr-32 text-base font-mono tracking-wider text-white placeholder-slate-400 focus:outline-none focus:border-white/40 shadow-sm transition-all"
              />
              <Search className="absolute left-4 text-slate-400 w-5 h-5" />
              <button 
                type="submit"
                disabled={isSearching}
                className="absolute right-2 top-2 bottom-2 bg-white text-slate-950 hover:bg-slate-200 disabled:bg-slate-400 font-mono text-base font-bold tracking-wider px-4 rounded transition-all flex items-center gap-1 uppercase"
              >
                {isSearching ? 'SEARCHING' : 'SEARCH'}
              </button>
            </form>
          </motion.div>
        </section>

        {/* 3. Spacer Section (Transparent) */}
        <section className="min-h-[60vh] w-full flex items-center justify-center relative pointer-events-none">
          <span className="text-slate-400 font-mono text-[10px] tracking-[0.3em] uppercase animate-pulse">
            SCROLL TO INITIATE SPACE LEAKAGE
          </span>
        </section>

        {/* 4. Leakage Visual & Constellation View */}
        <section 
          ref={containerRef}
          id="constellation" 
          className="min-h-screen w-full bg-[#0a1128]/95 backdrop-blur-sm text-white relative pt-24 pb-28 px-6 flex flex-col items-center justify-end gap-10 overflow-hidden border-t border-white/10"
        >
          {/* Wave SVG blending transparency from above to dark space */}
          <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[150px] transform rotate-180 opacity-90">
              <path d="M0,0 C300,130 900,130 1200,0 L1200,120 L0,120 Z" fill="#000000" className="mix-blend-multiply opacity-20"></path>
            </svg>
            <div className="absolute top-[80px] left-1/2 -translate-x-1/2 w-48 h-48 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" />
          </div>

          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px] animate-pulse" />
            <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[160px] animate-pulse" style={{ animationDelay: '3s' }} />
          </div>

          {floatingItemsRef.current.map((item, index) => (
            <img 
              key={index}
              ref={(el) => (imageRefs.current[index] = el)}
              src={item.src}
              alt="Floating Element"
              style={{ width: `${item.w}px`, height: `${item.h}px` }}
              className="absolute left-0 top-0 object-contain pointer-events-none mix-blend-screen opacity-90 filter drop-shadow-[0_0_25px_rgba(255,255,255,0.2)] z-10"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          ))}

          <div className="relative z-20 text-center max-w-2xl w-full">
            <span className="font-mono text-sm text-cyan-400 tracking-[0.3em] uppercase animate-pulse">
              DEEP SPACE TELEMETRY
            </span>
            <h2 className="text-2xl font-mono font-bold tracking-wider text-white mt-2 uppercase">
              ORBITAL STACK
            </h2>
          </div>

          {/* Card Stack Carousel */}
          <div 
            ref={cardContainerRef}
            className="relative z-20 w-full max-w-2xl h-[500px] flex items-center justify-center"
          >
            <button 
              onClick={prevCard}
              className="absolute left-[-60px] z-30 p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white transition-all hidden md:block"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="relative w-full h-full flex items-center justify-center">
              <AnimatePresence mode="popLayout">
                {cards.map((card, index) => {
                  if (index !== activeCard) return null;

                  return (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, scale: 0.8, x: 100 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.8, x: -100 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="absolute w-full h-full bg-[#08111f]/95 backdrop-blur-3xl border border-white/10 rounded-[1.75rem] p-6 shadow-[0_30px_90px_rgba(0,165,255,0.18)] overflow-hidden flex flex-col font-card"
                    >
                      <div className="pointer-events-none absolute inset-0 rounded-[2rem] border border-white/5" />
                      <div className="pointer-events-none absolute top-6 left-6 w-22 h-1 rounded-full bg-cyan-400/20 blur-sm" />
                      <div className="pointer-events-none absolute bottom-6 right-6 w-24 h-1 rounded-full bg-purple-400/20 blur-sm" />
                      <div className="pointer-events-none absolute top-5 right-5 rounded-full border border-cyan-300/20 bg-slate-900/60 px-2 py-0.5 text-[10px] uppercase tracking-[0.3em] text-cyan-300">
                        CORE NODE
                      </div>
                      <div>
                        <div className="relative flex items-center gap-3 pb-2 mb-4">
                          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-cyan-400/30 via-transparent to-purple-400/30" />
                          <card.icon className={`relative z-10 w-6 h-6 ${card.accent}`} />
                          <h3 className="relative z-10 text-xl font-card font-bold tracking-[0.22em] text-white uppercase">
                            {card.title}
                          </h3>
                        </div>
                      </div>
                      <div className="flex-1 overflow-y-auto pr-2 space-y-4 min-h-0">
                        {card.content}
                      </div>

                      <div className="flex justify-center gap-2 mt-4 pb-2">
                        {cards.map((_, dotIndex) => (
                          <div 
                            key={dotIndex} 
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${dotIndex === activeCard ? 'bg-white w-6' : 'bg-white/20'}`}
                          />
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            <button 
              onClick={nextCard}
              className="absolute right-[-60px] z-30 p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white transition-all hidden md:block"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="flex gap-4 md:hidden relative z-20">
            <button onClick={prevCard} className="p-3 bg-white/5 border border-white/10 rounded-full text-white">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={nextCard} className="p-3 bg-white/5 border border-white/10 rounded-full text-white">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

        </section>

      </div>

      <footer className="w-full text-center font-mono text-[10px] text-gray-500 py-6 border-t border-white/5 bg-slate-950 relative z-20">
        <span>&copy; 2026 NIGHTOWL OBSERVATORY // ALL SYSTEMS OPERATIONAL</span>
      </footer>

    </div>
  );
}
