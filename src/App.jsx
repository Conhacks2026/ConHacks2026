import React from 'react';
import { AppProvider } from './store/AppContext';
import Scene from './components/canvas/Scene';
import Overlay from './components/ui/Overlay';

function App() {
  return (
    <AppProvider>
      {/* 
        The outer container must be able to scroll to trigger Framer Motion's useScroll.
        We make it tall enough to have scroll sections.
      */}
      <div className="relative w-full" style={{ height: '200vh' }}>
        <Scene />
        <Overlay />
      </div>
    </AppProvider>
  );
}

export default App;
