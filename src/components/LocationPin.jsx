import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const EARTH_RADIUS = 1.0;

export default function LocationPin({ latitude, longitude }) {
  const groupRef = useRef();
  const orbRef = useRef();
  const ringRef = useRef();
  const bornAt = useRef(0);

  useEffect(() => {
    bornAt.current = performance.now();
  }, [latitude, longitude]);

  const position = useMemo(() => {
    const lat = Number(latitude) * (Math.PI / 180);
    const lon = -Number(longitude) * (Math.PI / 180);
    const x = EARTH_RADIUS * Math.cos(lat) * Math.cos(lon);
    const y = EARTH_RADIUS * Math.sin(lat);
    const z = EARTH_RADIUS * Math.cos(lat) * Math.sin(lon);
    return new THREE.Vector3(x, y, z);
  }, [latitude, longitude]);

  useFrame((state) => {
    if (!groupRef.current) return;

    const elapsed = (performance.now() - bornAt.current) / 1000;
    const dropT = Math.min(elapsed / 0.8, 1);
    const lift = (1 - dropT) * 0.35;
    const normal = position.clone().normalize();
    groupRef.current.position.copy(position).add(normal.multiplyScalar(lift));

    groupRef.current.lookAt(new THREE.Vector3(0, 0, 0));
    groupRef.current.rotateX(Math.PI / 2);

    const pulse = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.14;
    if (orbRef.current) {
      orbRef.current.scale.setScalar(pulse);
      orbRef.current.material.emissiveIntensity = 1.2 + Math.sin(state.clock.elapsedTime * 4) * 0.45;
    }
    if (ringRef.current) {
      ringRef.current.scale.setScalar(1.2 * pulse);
      ringRef.current.material.opacity = 0.35 + Math.sin(state.clock.elapsedTime * 4) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <group position={[0, 0.06, 0]}>
        <mesh position={[0, -0.03, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.02, 0.06, 20]} />
          <meshStandardMaterial color="#ff2f7a" roughness={0.25} metalness={0.6} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.03, 18, 18]} />
          <meshStandardMaterial color="#ff2f7a" roughness={0.2} metalness={0.7} />
        </mesh>
        <mesh ref={orbRef} position={[0, 0, 0.012]}>
          <sphereGeometry args={[0.016, 16, 16]} />
          <meshStandardMaterial emissive="#00f3ff" emissiveIntensity={1.5} color="#ffffff" toneMapped={false} />
        </mesh>
      </group>

      <mesh ref={ringRef} position={[0, 0.004, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.02, 0.035, 32]} />
        <meshBasicMaterial color="#00f3ff" transparent opacity={0.45} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
