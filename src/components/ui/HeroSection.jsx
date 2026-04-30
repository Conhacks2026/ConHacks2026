import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HeroSection() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.1], [0, -50]);

  return (
    <motion.section 
      style={{ opacity, y }}
      className="h-screen w-full flex flex-col items-center justify-center pointer-events-none relative z-10"
    >
      <div className="text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 glow-text-white drop-shadow-2xl">
          Find the clearest window tonight
        </h1>
        <p className="text-lg text-white/70 max-w-xl mx-auto">
          Your sky is dynamic. We decode it for you.
        </p>
      </div>
      
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-12 opacity-50"
      >
        <span className="text-sm tracking-widest uppercase text-white/50">Scroll to explore</span>
      </motion.div>
    </motion.section>
  );
}
