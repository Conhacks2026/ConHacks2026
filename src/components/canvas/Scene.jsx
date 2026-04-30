import React, { Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Vector3, MathUtils } from 'three';
import { useAppContext } from '../../store/AppContext';
import Earth from './Earth';
import SpaceEnvironment from './SpaceEnvironment';

function CameraController() {
  const { selectedLocation } = useAppContext();

  useFrame((state) => {
    if (selectedLocation) {
      // Cinematic zoom in and slight tilt
      // We moved the Earth to x: -1, z: 0. The pin is facing +Z relative to Earth.
      // So the pin is at roughly (-1, 0, 2).
      // We want the camera to look slightly above it and move closer.
      
      const targetPos = new Vector3(-1, 0.5, 4); 
      const targetLookAt = new Vector3(-1, 0, 0); // Look at center of Earth

      state.camera.position.lerp(targetPos, 0.03);
      
      // We can't directly lerp lookAt easily without an object, but since the camera
      // is just moving, we can let the position shift naturally change the angle, 
      // or we can manually rotate.
      // For cinematic feel, just lerp the position to a dramatic angle.
    } else {
      // Default view
      const targetPos = new Vector3(0, 0, 5);
      state.camera.position.lerp(targetPos, 0.03);
    }
  });

  return null;
}

export default function Scene() {
  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <CameraController />
          <SpaceEnvironment />
          <Earth />
        </Suspense>
      </Canvas>
    </div>
  );
}
