import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export default function Camiseta({ color = '#ffffff' }) {
  let gltf;
  try {
    gltf = useGLTF('/camiseta.glb', true);
  } catch {
    gltf = null;
  }

  if (gltf?.scene) {
    const clone = gltf.scene.clone();
    clone.traverse((obj) => {
      if (obj.isMesh) {
        obj.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(color),
          roughness: 0.7,
          metalness: 0.05
        });
      }
    });
    return <primitive object={clone} scale={2} position={[0, -1, 0]} />;
  }

  // Fallback: esfera si no hay modelo GLB
  const geometry = useMemo(() => new THREE.SphereGeometry(1, 32, 32), []);
  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
