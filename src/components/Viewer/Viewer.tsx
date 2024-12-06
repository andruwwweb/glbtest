import React, { useState } from "react";
import { Canvas, ThreeEvent } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import style from "./Viewer.module.scss";
import Modal from "../Modal/Modal";

type ViewerProps = {
  width: string;
  height: string;
  model: string;
};

const Viewer = ({ width, height, model }: ViewerProps) => {
  const [cart, setCart] = useState<string[]>([]);
  const [selected, setSelected] = useState<THREE.Mesh | null>(null);

  const onProductClick = (event: ThreeEvent<MouseEvent>, mesh: THREE.Mesh) => {
    event.stopPropagation();
    const idPattern = /^q\d+a\d+_\d+_instance_\d+$/;
    if (idPattern.test(mesh.name)) {
      setSelected(mesh);
    }
  };

  const Model = ({
    onProductClick,
    cart,
  }: {
    onProductClick: (event: ThreeEvent<MouseEvent>, mesh: THREE.Mesh) => void;
    cart: string[];
  }) => {
    const { scene } = useGLTF(model);
    const items = scene.children.filter(
      (child): child is THREE.Mesh => child instanceof THREE.Mesh
    );

    return (
      <group>
        {items.map((item, index) => {
          if (cart.includes(item.name)) return null;

          return (
            <mesh
              key={index}
              geometry={item.geometry}
              material={item.material}
              position={item.position}
              onClick={(event) => onProductClick(event, item)}
            />
          );
        })}
      </group>
    );
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container} style={{ width, height }}>
        <Canvas
          shadows
          camera={{ position: [0, 0, 750], fov: 60 }}
          gl={{ alpha: true }}
        >
          <directionalLight
            position={[0, 300, 700]}
            intensity={6}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-bias={-0.0001}
          />
          <ambientLight intensity={0.4} />
          <pointLight position={[0, 300, 0]} intensity={0.3} castShadow />
          <spotLight
            position={[200, 300, 200]}
            intensity={0.5}
            angle={Math.PI / 8}
            penumbra={1}
            castShadow
          />
          <mesh receiveShadow rotation={[0, 0, 0]} position={[0, -50, 0]}>
            <planeGeometry args={[100, 100]} />
            <shadowMaterial opacity={4} />
          </mesh>
          <Model onProductClick={onProductClick} cart={cart} />
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
          model={model}
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
