import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader, MeshStandardMaterial, MathUtils, Color, Quaternion, Euler } from 'three';
import { useAppContext } from '../../store/AppContext';
import LocationPin from './LocationPin';
import MetricPin from './MetricPin';

export default function Earth() {
  const earthRef = useRef();
  const { selectedLocation, searchResults, metricPins } = useAppContext();

  // Load Earth texture
  const colorMap = useLoader(TextureLoader, 'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg');

  const material = useMemo(() => {
    return new MeshStandardMaterial({
      map: colorMap,
      roughness: 0.8,
      metalness: 0.1,
    });
  }, [colorMap]);

  // Target quaternion for programmatic rotation
  const targetQuaternion = useMemo(() => new Quaternion(), []);

  useFrame((state, delta) => {
    if (!earthRef.current) return;

    if (selectedLocation) {
      // Programmatic rotation to face the selected location toward camera
      const latRad = selectedLocation.lat * (Math.PI / 180);
      const lngRad = -selectedLocation.lng * (Math.PI / 180);

      const targetEuler = new Euler(latRad, lngRad - Math.PI / 2, 0, 'YXZ');
      targetQuaternion.setFromEuler(targetEuler);

      // Smooth slerp to target
      earthRef.current.quaternion.slerp(targetQuaternion, 0.04);

      // Shift earth left so the pin area is visible alongside the panel
      earthRef.current.position.x = MathUtils.lerp(earthRef.current.position.x, -1, 0.04);
      earthRef.current.position.z = MathUtils.lerp(earthRef.current.position.z, 0, 0.04);
    } else {
      // Slow idle rotation when no location selected (user can also drag via OrbitControls)
      earthRef.current.rotation.y += delta * 0.05;

      // Return to center position
      earthRef.current.position.x = MathUtils.lerp(earthRef.current.position.x, 0, 0.04);
      earthRef.current.position.z = MathUtils.lerp(earthRef.current.position.z, 0, 0.04);
    }
  });

  return (
    <group>
      {/* Atmospheric glow */}
      <mesh scale={1.04}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshBasicMaterial color={new Color(0x4488ff)} transparent opacity={0.08} side={1} />
      </mesh>

      <mesh ref={earthRef} material={material} castShadow receiveShadow>
        <sphereGeometry args={[2, 64, 64]} />

        {/* Main location pin */}
        {selectedLocation && (
          <LocationPin location={selectedLocation} isSelected={true} />
        )}

        {/* Metric pins around the selected location */}
        {selectedLocation && metricPins.map(pin => (
          <MetricPin
            key={pin.id}
            location={{ lat: pin.lat, lng: pin.lng }}
            type={pin.type}
            value={pin.value}
            color={pin.color}
            icon={pin.icon}
          />
        ))}

        {/* Search result pins (before selection) */}
        {!selectedLocation && searchResults && searchResults.length > 0 && (
          searchResults.map(loc => (
            <LocationPin key={loc.id} location={loc} isSelected={false} />
          ))
        )}
      </mesh>
    </group>
  );
}
