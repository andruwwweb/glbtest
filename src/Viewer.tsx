import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

type viewerProps = {
  width: string;
  height: string;
  file: string;
};

const Viewer = ({ width, height, file }: viewerProps) => {
  const Model = () => {
    const { scene } = useGLTF(file);
    return <primitive object={scene} />;
  };
  return (
    <div style={{ width, height, margin: "50px auto" }}>
      <Canvas shadows camera={{ position: [0, 300, 700], fov: 60 }}>
        <directionalLight position={[50, 50, 100]} intensity={3} castShadow />
        <mesh receiveShadow rotation={[0, 0, 0]} position={[0, 0, 0]}>
          <planeGeometry args={[100, 100]} />
          <shadowMaterial opacity={3} />
        </mesh>
        <Model />
        <OrbitControls
          minDistance={200}
          maxDistance={700}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
          enableZoom={true}
        />
      </Canvas>
    </div>
  );
};

export default Viewer;
