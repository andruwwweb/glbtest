import React, { useState } from "react";
import { Canvas, ThreeEvent } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import style from "./Viewer.module.scss";
import Modal from "../Modal/Modal";
import Model from "./Model";

type viewerProps = {
  width: string;
  height: string;
  model: string;
};

const Viewer = ({ width, height, model }: viewerProps) => {
  const [cart, setCart] = useState<string[]>([]);
  const [selected, setSelected] = useState<THREE.Mesh | null>(null);

  const onProductClick = (event: ThreeEvent<MouseEvent>, mesh: THREE.Mesh) => {
    console.log(mesh);
    event.stopPropagation();
    const idPattern = /^q\d+a\d+_\d+_instance_\d+$/;
    if (idPattern.test(mesh.name)) {
      setSelected(mesh);
    }
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container} style={{ width, height }}>
        <Canvas
          shadows
          camera={{ position: [140, 100, 750], fov: 60, near: 0.1, far: 1200 }}
          gl={{
            alpha: true,
            precision: "highp",
            logarithmicDepthBuffer: true,
          }}
        >
          <pointLight position={[0, 80, 50]} intensity={10} castShadow />
          <directionalLight
            position={[0, 35, 70]}
            intensity={3.5}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-bias={-0.00005}
          />
          <Model onProductClick={onProductClick} cart={cart} model={model} />
          <OrbitControls
            minDistance={200}
            maxDistance={700}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 2}
            minAzimuthAngle={-Math.PI / 10}
            maxAzimuthAngle={Math.PI / 10}
            enableZoom={true}
          />
        </Canvas>
      </div>
      {selected && (
        <Modal
          selected={{
            id: selected.name,
            modelPath: model,
            mesh: selected,
          }}
          onShelf={() => setSelected(null)}
          onCart={(product) => {
            setCart((state) => [...state, product]);
            setSelected(null);
          }}
        />
      )}
    </div>
  );
};

export default Viewer;
