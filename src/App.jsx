import React from 'react';
import { AppProvider } from './store/AppContext';
import Scene from './components/canvas/Scene';
import Overlay from './components/ui/Overlay';

function App() {
  return (
    <AppProvider>
      {/* 3D globe stays fixed behind everything */}
      <Scene />
      {/* Scrollable UI overlay on top */}
      <Overlay />
    </AppProvider>
  );
}

export default App;
