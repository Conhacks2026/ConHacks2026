import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3, MathUtils } from 'three';

export default function LocationPin({ location, isSelected }) {
  const groupRef = useRef();
  const orbRef = useRef();
  const ringRef = useRef();
  const [mounted, setMounted] = useState(false);
  const mountTime = useRef(0);

  useEffect(() => {
    setMounted(true);
    mountTime.current = performance.now();
  }, []);

  const latRad = location.lat * (Math.PI / 180);
  const lngRad = -location.lng * (Math.PI / 180);
  const radius = 2.0;

  const x = radius * Math.cos(latRad) * Math.cos(lngRad);
  const y = radius * Math.sin(latRad);
  const z = radius * Math.cos(latRad) * Math.sin(lngRad);

  const surfacePosition = new Vector3(x, y, z);

  useFrame((state) => {
    if (!groupRef.current) return;

    groupRef.current.lookAt(new Vector3(0, 0, 0));
    // Rotate to point Y away from center
    groupRef.current.rotateX(Math.PI / 2);

    const elapsed = (performance.now() - mountTime.current) / 1000;
    
    let currentHeightOffset = 0;
    if (elapsed < 1.0) {
      const t = Math.min(elapsed / 0.8, 1.0);
      const c4 = (2 * Math.PI) / 3;
      const easeOutElastic = t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
      currentHeightOffset = 0.5 * (1 - easeOutElastic);
    }

    const normal = surfacePosition.clone().normalize();
    groupRef.current.position.copy(surfacePosition).add(normal.multiplyScalar(currentHeightOffset));

    if (isSelected) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.15;
      if (orbRef.current) {
        orbRef.current.scale.set(pulse, pulse, pulse);
        orbRef.current.material.emissiveIntensity = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.5;
      }
      if (ringRef.current) {
        ringRef.current.scale.set(pulse * 1.5, pulse * 1.5, pulse * 1.5);
        ringRef.current.material.opacity = MathUtils.lerp(ringRef.current.material.opacity, 0.4 + Math.sin(state.clock.elapsedTime * 4) * 0.4, 0.1);
      }
    } else {
      if (orbRef.current) {
        orbRef.current.scale.set(0.8, 0.8, 0.8);
        orbRef.current.material.emissiveIntensity = 0.5;
      }
      if (ringRef.current) {
        ringRef.current.scale.set(0.1, 0.1, 0.1);
        ringRef.current.material.opacity = 0;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* Map Pin Container - Shifted up so the point is at 0 */}
      <group position={[0, 0.08, 0]}>
        {/* Inverted Cone pointing down */}
        <mesh position={[0, -0.04, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.03, 0.08, 16]} />
          <meshStandardMaterial color={isSelected ? "#ff0055" : "#a100ff"} roughness={0.2} metalness={0.8} />
        </mesh>
        
        {/* Top Sphere of the pin */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color={isSelected ? "#ff0055" : "#a100ff"} roughness={0.2} metalness={0.8} />
        </mesh>

        {/* Inner Glowing Orb */}
        <mesh ref={orbRef} position={[0, 0, 0.015]}>
          <sphereGeometry args={[0.02, 16, 16]} />
          <meshStandardMaterial 
            color="#ffffff" 
            emissive={isSelected ? "#00f3ff" : "#ffffff"}
            emissiveIntensity={isSelected ? 2 : 0.5}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* Surface Glowing Ring */}
      <mesh ref={ringRef} position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.03, 0.05, 32]} />
        <meshBasicMaterial color="#00f3ff" transparent opacity={0.6} side={2} />
      </mesh>
    </group>
  );
}
