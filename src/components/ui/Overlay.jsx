import React from 'react';
import HeroSection from './HeroSection';
import SearchSystem from './SearchSystem';
import AnalysisPanel from './AnalysisPanel';

export default function Overlay() {
  return (
    <div className="absolute inset-0 w-full z-10 pointer-events-none">
      <HeroSection />
      <SearchSystem />
      <AnalysisPanel />
    </div>
  );
}
