import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html } from '@react-three/drei';
import Camiseta from './Camiseta';

export default function App() {
  const [color, setColor] = useState('#ffffff');

  return (
    <div className="app">
      <div className="panel">
        <h2>Mi Camiseta 3D</h2>
        <label>Color base</label>
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
      </div>

      <div className="viewer">
        <Canvas shadows camera={{ position: [0, 1, 3], fov: 40 }}>
          <ambientLight intensity={0.6} />
          <directionalLight castShadow position={[5,5,5]} intensity={1} />
          <Suspense fallback={<Html><div>Cargando...</div></Html>}>
            <Camiseta color={color} />
            <Environment preset="studio" />
            <ContactShadows position={[0,-1.5,0]} opacity={0.6} blur={2} far={2} />
          </Suspense>
          <OrbitControls />
        </Canvas>
      </div>
    </div>
  );
}
