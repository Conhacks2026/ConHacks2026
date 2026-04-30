import React from 'react';
import HeroSection from './HeroSection';
import SearchSystem from './SearchSystem';
import AnalysisPanel from './AnalysisPanel';

export default function Overlay() {
  return (
    <div className="relative z-10">
      {/* Section 1: Hero — full viewport, centered text over the globe */}
      <HeroSection />

      {/* Section 2: Search — scrolls into view below the hero */}
      <SearchSystem />

      {/* Section 3: Analysis panel — fixed overlay that appears on selection */}
      <AnalysisPanel />
    </div>
  );
}
