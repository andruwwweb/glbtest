import React from "react";
import { useGLTF } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { fixMaterials } from "./functions";

type modelProps = {
  onProductClick: (event: ThreeEvent<MouseEvent>, mesh: THREE.Mesh) => void;
  cart: string[];
  model: string;
};

const Model = ({ onProductClick, cart, model }: modelProps) => {
  const canvas = useGLTF(model);
  const items = canvas.scene
    .clone()
    .children.filter(
      (child): child is THREE.Mesh => child instanceof THREE.Mesh
    );
  for (let mesh of items) {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    fixMaterials(mesh);
  }

  return (
    <group receiveShadow castShadow>
      {items.map((item, index) => {
        if (cart.includes(item.name)) return null;

        return (
          <mesh
            key={item.id}
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

export default Model;
