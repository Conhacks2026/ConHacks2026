import { motion, useScroll, useTransform } from 'framer-motion';
import { Rocket, Shield, Zap, Terminal, Globe, Cpu } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: "easeOut" }
};

export default function Overlay() {
  const { scrollY } = useScroll();

  // Scroll transforms for sequential fade-out and drift
  // 1. JUL 20
  const opacityJul = useTransform(scrollY, [0, 150], [1, 0]);
  const yJul = useTransform(scrollY, [0, 150], [0, -40]);

  // 2. NATIONAL
  const opacityNat = useTransform(scrollY, [100, 250], [1, 0]);
  const yNat = useTransform(scrollY, [100, 250], [0, -50]);

  // 3. MOON
  const opacityMoon = useTransform(scrollY, [200, 350], [1, 0]);
  const yMoon = useTransform(scrollY, [200, 350], [0, -60]);

  // 4. DAY
  const opacityDay = useTransform(scrollY, [300, 450], [1, 0]);
  const yDay = useTransform(scrollY, [300, 450], [0, -70]);
  return (
    <div className="relative z-10 w-full text-white font-sans selection:bg-cyan-500 selection:text-black">
      
      {/* HUD Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center bg-black/40 backdrop-blur-md border-b border-white/5 z-50">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-cyan-500 animate-pulse" />
          <span 
            className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500"
            style={{ fontFamily: 'Brasika, Playfair Display, serif' }}
          >
            NightOwl
          </span>
        </div>
        <ul className="hidden md:flex gap-8 font-display text-sm tracking-wider text-gray-400">
          <li><a href="#conditions" className="hover:text-cyan-400 transition-colors">CONDITIONS</a></li>
          <li><a href="#visibility" className="hover:text-purple-400 transition-colors">VISIBILITY</a></li>
          <li><a href="#locations" className="hover:text-pink-400 transition-colors">LOCATIONS</a></li>
          <li><a href="#events" className="hover:text-yellow-400 transition-colors">EVENTS</a></li>
          <li><a href="#forecast" className="hover:text-orange-400 transition-colors">FORECAST</a></li>
        </ul>
        <a href="https://github.com" target="_blank" rel="noreferrer" className="px-4 py-2 rounded border border-cyan-500/30 font-display text-xs tracking-widest hover:bg-cyan-500/10 hover:border-cyan-500 transition-all duration-300 shadow-[0_0_15px_rgba(0,243,255,0.1)]">
          ACCESS TERMINAL
        </a>
      </nav>

      {/* Hero Section - HUD Style */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative">
        <div className="absolute top-32 left-12 text-left font-mono text-xs text-cyan-500/50 hidden lg:block">
          <div>SYS.LOC: ORBIT_EARTH</div>
          <div>ALTITUDE: 408 KM</div>
          <div>STATUS: STABLE</div>
        </div>
        <div className="absolute top-32 right-12 text-right font-mono text-xs text-purple-500/50 hidden lg:block">
          <div>LAT: 43.4723° N</div>
          <div>LONG: 80.5449° W</div>
          <div>TARGET: DEEP_SPACE</div>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center pt-[12vh] z-20 pointer-events-none font-poster select-none">

          <motion.div 
            style={{ opacity: opacityJul }}
            className="mt-12 pointer-events-auto"
          >
            <a href="#mission" className="px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-display font-bold tracking-wider hover:scale-105 hover:shadow-[0_0_30px_rgba(0,243,255,0.5)] transition-all duration-300">
              INITIATE LAUNCH
            </a>
          </motion.div>
        </div>
      </section>

      {/* Mission Section (About) */}
      <section id="mission" className="min-h-screen flex items-center justify-center px-4 py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/5 to-transparent pointer-events-none" />
        
        <motion.div 
          {...fadeInUp}
          className="max-w-4xl w-full glass-panel p-8 md:p-12 rounded-2xl border border-white/5 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
          
          <div className="font-mono text-xs text-cyan-400 mb-2 tracking-widest flex items-center gap-2">
            <Terminal size={14} /> 01 // CORE_MISSION
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-white tracking-wide">
            Zero Gravity Development
          </h2>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Antigravity removes the weight of legacy constraints. No slow build times, no environment issues, no friction. Just pure, unadulterated creation in deep space.
          </p>

          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="p-6 rounded-xl bg-white/2 border border-white/5 hover:border-cyan-500/20 transition-colors">
              <Zap className="text-cyan-400 mb-3" size={24} />
              <h3 className="font-display font-bold mb-2 tracking-wider">WARP SPEED COMPILATION</h3>
              <p className="text-gray-400 text-sm">Instant feedback loops with sub-millisecond compilation directly in the cloud.</p>
            </div>
            <div className="p-6 rounded-xl bg-white/2 border border-white/5 hover:border-purple-500/20 transition-colors">
              <Shield className="text-purple-400 mb-3" size={24} />
              <h3 className="font-display font-bold mb-2 tracking-wider">QUANTUM SECURITY</h3>
              <p className="text-gray-400 text-sm">Your code orbits safely in isolated, hyper-secure cryptographic containers.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Sectors Section (Tracks) */}
      <section id="sectors" className="min-h-screen flex flex-col justify-center px-4 py-20">
        <motion.div 
          {...fadeInUp}
          className="max-w-6xl mx-auto w-full text-center"
        >
          <div className="font-mono text-xs text-purple-400 mb-2 tracking-widest">
            02 // EXPEDITION_SECTORS
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-12 tracking-wide">
            Choose Your Trajectory
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Rocket, title: "STELLAR INFRASTRUCTURE", desc: "Build the backbone of the decentralized cosmos. Scale to infinity.", color: "cyan" },
              { icon: Cpu, title: "NEURAL NETWORKS", desc: "Train AI models that think, adapt, and build alongside human developers.", color: "purple" },
              { icon: Globe, title: "COSMIC INTERFACES", desc: "Design immersive 3D/AR spatial web applications that redefine depth.", color: "pink" }
            ].map((sector, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="glass-panel p-6 rounded-xl border border-white/5 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className={`p-4 rounded-lg bg-white/2 w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <sector.icon className={`text-${sector.color}-400`} size={32} />
                </div>
                <h3 className="font-display font-bold text-lg mb-3 tracking-wider text-left">{sector.title}</h3>
                <p className="text-gray-400 text-sm text-left leading-relaxed">{sector.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer / CTA */}
      <footer className="border-t border-white/5 py-12 px-4 bg-black/80 text-center relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <span className="font-display font-black text-xl tracking-widest mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            ANTIGRAVITY
          </span>
          <p className="text-gray-500 font-mono text-xs tracking-widest mb-6">
            &copy; 2026 ANTIGRAVITY LABS. ALL SYSTEMS OPERATIONAL.
          </p>
          <div className="w-1/2 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        </div>
      </footer>

    </div>
  );
}
