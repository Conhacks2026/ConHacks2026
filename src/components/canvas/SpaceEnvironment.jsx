import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

export default function SpaceEnvironment() {
  const starsRef = useRef();

  useFrame((state, delta) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <group>
      <group ref={starsRef}>
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        {/* Mock Milky Way Glow */}
        <mesh position={[0, 0, -20]} scale={[50, 10, 1]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial color="#a100ff" transparent opacity={0.05} />
        </mesh>
      </group>
      
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 3, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-5, -3, -5]} intensity={0.5} color="#00f3ff" />
    </group>
  );
}
