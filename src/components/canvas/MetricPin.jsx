import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Vector3 } from 'three';

// Consistent color system for each metric
const METRIC_CONFIG = {
  AQI:    { color: '#22c55e', icon: '🌿', label: 'Air Quality' },
  BORTLE: { color: '#a855f7', icon: '💡', label: 'Light Pollution' },
  CLOUD:  { color: '#3b82f6', icon: '☁️', label: 'Weather' },
  MOON:   { color: '#eab308', icon: '🌙', label: 'Moon Phase' },
};

export default function MetricPin({ location, type, value }) {
  const groupRef = useRef();

  const latRad = location.lat * (Math.PI / 180);
  const lngRad = -location.lng * (Math.PI / 180);
  const radius = 2.01;

  const x = radius * Math.cos(latRad) * Math.cos(lngRad);
  const y = radius * Math.sin(latRad);
  const z = radius * Math.cos(latRad) * Math.sin(lngRad);

  const position = new Vector3(x, y, z);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.lookAt(new Vector3(0, 0, 0));
      groupRef.current.rotateX(Math.PI / 2);
    }
  });

  const config = METRIC_CONFIG[type] || { color: '#6b7280', icon: '📍', label: type };

  return (
    <group ref={groupRef} position={position}>
      {/* Thin stem connecting to surface */}
      <mesh position={[0, 0.04, 0]}>
        <cylinderGeometry args={[0.001, 0.001, 0.08, 4]} />
        <meshBasicMaterial color={config.color} />
      </mesh>

      {/* Google Maps style pin rendered via Html */}
      <group position={[0, 0.09, 0]}>
        <Html center zIndexRange={[100, 0]} distanceFactor={5} sprite>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.5))',
            pointerEvents: 'none',
            userSelect: 'none',
          }}>
            {/* The teardrop pin body */}
            <div style={{
              width: '32px',
              height: '32px',
              backgroundColor: config.color,
              borderRadius: '50% 50% 50% 0',
              transform: 'rotate(-45deg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid rgba(255,255,255,0.9)',
              boxShadow: `0 0 10px ${config.color}66`,
            }}>
              {/* Inner icon rotated back to upright */}
              <span style={{
                transform: 'rotate(45deg)',
                fontSize: '14px',
                lineHeight: 1,
              }}>
                {config.icon}
              </span>
            </div>
            {/* Small label below pin */}
            <div style={{
              marginTop: '4px',
              backgroundColor: 'rgba(0,0,0,0.75)',
              borderRadius: '6px',
              padding: '2px 6px',
              border: `1px solid ${config.color}88`,
            }}>
              <span style={{
                color: 'white',
                fontSize: '9px',
                fontWeight: 700,
                fontFamily: "'Inter', sans-serif",
                whiteSpace: 'nowrap',
              }}>
                {value}
              </span>
            </div>
          </div>
        </Html>
      </group>
    </group>
  );
}
