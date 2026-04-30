import React, { useRef, useMemo, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { useScroll } from 'framer-motion';
import { TextureLoader, MeshStandardMaterial, MathUtils, Color, Quaternion, Euler } from 'three';
import { useAppContext } from '../../store/AppContext';
import LocationPin from './LocationPin';

export default function Earth() {
  const earthRef = useRef();
  const { selectedLocation, searchResults } = useAppContext();
  const { scrollYProgress } = useScroll();

  // Load a highly detailed generic earth map
  const colorMap = useLoader(TextureLoader, 'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg');

  const material = useMemo(() => {
    return new MeshStandardMaterial({
      map: colorMap,
      roughness: 0.8,
      metalness: 0.1,
    });
  }, [colorMap]);

  // Target quaternion for smooth rotation
  const targetQuaternion = useMemo(() => new Quaternion(), []);
  
  useFrame((state, delta) => {
    if (!earthRef.current) return;

    if (!selectedLocation) {
      // Idle rotation + scroll effect
      const scrollRotation = scrollYProgress.get() * Math.PI; // Rotate based on scroll
      
      // Calculate idle target rotation
      const idleY = earthRef.current.rotation.y + delta * 0.05;
      const idleX = scrollRotation * 0.2;
      
      const idleEuler = new Euler(idleX, idleY, 0, 'YXZ');
      targetQuaternion.setFromEuler(idleEuler);
      
      earthRef.current.quaternion.slerp(targetQuaternion, 0.05);
      
      // Move earth to the left on scroll
      const targetX = scrollYProgress.get() > 0.1 ? -1.5 : 0;
      earthRef.current.position.x = MathUtils.lerp(earthRef.current.position.x, targetX, 0.05);
      
      // Slight zoom out on scroll
      const targetZ = scrollYProgress.get() > 0.1 ? -1 : 0;
      earthRef.current.position.z = MathUtils.lerp(earthRef.current.position.z, targetZ, 0.05);

    } else {
      // Animate to specific lat/lng facing the camera
      const latRad = selectedLocation.lat * (Math.PI / 180);
      const lngRad = -selectedLocation.lng * (Math.PI / 180);

      // The texture orientation vs the math we used:
      // In LocationPin, we used x = R*cos(lat)cos(lng), y=R*sin(lat), z=R*cos(lat)sin(lng)
      // To make this point face +Z (the camera), we need to rotate the earth.
      // 1. Rotate Y by -lngRad to bring the point to the X-Y plane
      // Wait, if z=sin(lng), rotating Y by -lngRad makes z=0.
      // Actually, we want the point to end up at (0, 0, R).
      // Let's construct the target Euler:
      const targetEuler = new Euler(latRad, lngRad - Math.PI/2, 0, 'YXZ');
      targetQuaternion.setFromEuler(targetEuler);

      // Smoothly rotate using quaternion slerp (duration ~1.2s to 1.8s inherently handled by continuous slerp)
      earthRef.current.quaternion.slerp(targetQuaternion, 0.04);
      
      // Center the earth and push it back slightly if needed, or rely on camera zoom
      earthRef.current.position.x = MathUtils.lerp(earthRef.current.position.x, -1, 0.05);
      earthRef.current.position.z = MathUtils.lerp(earthRef.current.position.z, 0, 0.05);
    }
  });

  return (
    <group>
      {/* Glow/Atmosphere */}
      <mesh scale={1.05}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshBasicMaterial color={new Color(0x00f3ff)} transparent opacity={0.1} side={1} />
      </mesh>
      
      <mesh ref={earthRef} material={material} castShadow receiveShadow>
        <sphereGeometry args={[2, 64, 64]} />
        
        {/* Render multiple pins if searching, or just the selected one */}
        {selectedLocation ? (
          <LocationPin location={selectedLocation} isSelected={true} />
        ) : searchResults && searchResults.length > 0 ? (
          searchResults.map(loc => (
            <LocationPin key={loc.id} location={loc} isSelected={false} />
          ))
        ) : null}
      </mesh>
    </group>
  );
}
