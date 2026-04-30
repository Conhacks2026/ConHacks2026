import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Vector3 } from 'three';

export default function LocationPin({ location, isSelected }) {
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

  const pinColor = isSelected ? '#ea4335' : '#7c3aed'; // Google red for selected, purple for unselected
  const pinSize = isSelected ? 40 : 28;

  return (
    <group ref={groupRef} position={position}>
      {/* Thin stem */}
      <mesh position={[0, 0.04, 0]}>
        <cylinderGeometry args={[0.0015, 0.0015, 0.08, 4]} />
        <meshBasicMaterial color={pinColor} />
      </mesh>

      {/* Google Maps style teardrop pin via Html */}
      <group position={[0, 0.09, 0]}>
        <Html center zIndexRange={[200, 0]} distanceFactor={5} sprite>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.6))',
            pointerEvents: 'none',
            userSelect: 'none',
          }}>
            {/* Teardrop shape: rounded square rotated 45deg */}
            <div style={{
              width: `${pinSize}px`,
              height: `${pinSize}px`,
              backgroundColor: pinColor,
              borderRadius: '50% 50% 50% 0',
              transform: 'rotate(-45deg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2.5px solid white',
              boxShadow: `0 0 14px ${pinColor}88`,
            }}>
              {/* White dot in center, rotated back */}
              <div style={{
                width: `${pinSize * 0.35}px`,
                height: `${pinSize * 0.35}px`,
                backgroundColor: 'white',
                borderRadius: '50%',
                transform: 'rotate(45deg)',
              }} />
            </div>
            {/* Location name label (only for selected) */}
            {isSelected && (
              <div style={{
                marginTop: '6px',
                backgroundColor: 'rgba(0,0,0,0.8)',
                borderRadius: '8px',
                padding: '3px 10px',
                border: '1px solid rgba(255,255,255,0.2)',
              }}>
                <span style={{
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: 700,
                  fontFamily: "'Inter', sans-serif",
                  whiteSpace: 'nowrap',
                }}>
                  📍 {location.name}
                </span>
              </div>
            )}
          </div>
        </Html>
      </group>
    </group>
  );
}
