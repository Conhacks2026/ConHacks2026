import React, { Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Vector3 } from 'three';
import { useAppContext } from '../../store/AppContext';
import Earth from './Earth';
import SpaceEnvironment from './SpaceEnvironment';

function CameraController() {
  const { selectedLocation } = useAppContext();

  useFrame((state) => {
    if (selectedLocation) {
      // When a location is selected, smoothly move camera closer and slightly above
      const targetPos = new Vector3(-1, 0.5, 4.5);
      state.camera.position.lerp(targetPos, 0.03);
    } else {
      // Default resting position
      const targetPos = new Vector3(0, 0, 5.5);
      state.camera.position.lerp(targetPos, 0.03);
    }
  });

  return null;
}

export default function Scene() {
  const { selectedLocation } = useAppContext();

  return (
    <div className="fixed inset-0 w-full h-full z-0">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
        <Suspense fallback={null}>
          <CameraController />
          <SpaceEnvironment />
          <Earth />
          {/* OrbitControls for manual drag-to-rotate */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={!selectedLocation}
            rotateSpeed={0.4}
            dampingFactor={0.1}
            enableDamping
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
