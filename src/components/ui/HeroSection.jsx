import React from 'react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="h-screen w-full flex flex-col items-center justify-center pointer-events-none relative">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="text-center px-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 glow-text-white drop-shadow-2xl">
          Find the clearest window tonight
        </h1>
        <p className="text-lg text-white/70 max-w-xl mx-auto">
          Your sky is dynamic. We decode it for you.
        </p>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-12 opacity-50"
      >
        <span className="text-sm tracking-widest uppercase text-white/50">Scroll to explore</span>
      </motion.div>
    </section>
  );
}
