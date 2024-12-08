import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import style from "./Modal.module.scss";
import * as THREE from "three";

type ModalProps = {
  model?: string;
  selected: { id: string; modelPath: string; mesh: THREE.Mesh };
  onShelf: () => void;
  onCart: (product: string) => void;
};

const Modal = ({ selected, onShelf, onCart }: ModalProps) => {
  const { mesh } = selected;

  return (
    <div className={style.overlay}>
      <div className={style.modal}>
        <div className={style.preview}>
          <Canvas
            camera={{ position: [0, 0, 150], fov: 50 }}
            style={{ height: "300px", width: "300px" }}
            shadows
          >
            <directionalLight
              position={[0, 0, 50]}
              intensity={7}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              shadow-camera-near={0.1}
              shadow-camera-far={100}
            />
            <mesh
              geometry={mesh.geometry}
              material={
                Array.isArray(mesh.material)
                  ? mesh.material.map((mat) => mat.clone())
                  : mesh.material.clone()
              }
              scale={[1, 1, 1]}
            />
            <OrbitControls minDistance={50} maxDistance={300} />
          </Canvas>
        </div>
        <div className={style.buttons}>
          <button onClick={() => onCart(mesh.name)}>Put in cart</button>
          <button onClick={onShelf}>Put back on shelf</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
