import * as THREE from "three";

export function fixMaterials(model: THREE.Object3D) {
  model.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      if (mesh.material) {
        const material = mesh.material as THREE.MeshStandardMaterial;
        material.needsUpdate = true;
        material.lightMapIntensity = 1;
      }
    }
  });
}
