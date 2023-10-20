import { Mesh } from "three";

import { createGeometries } from "./geometries";
import { createMaterials } from "./materials";
import { degToRad } from "three/src/math/MathUtils.js";

export const createMeshes = () => {
  const geometries = createGeometries();
  const materials = createMaterials();

  const cabin = new Mesh(geometries.cabin, materials.body);
  cabin.position.set(1.5, 1.4, 0);

  const chimney = new Mesh(geometries.chimney, materials.detail);
  chimney.position.set(-2, 1.9, 0);

  const nose = new Mesh(geometries.nose, materials.body);
  nose.position.set(-1, 1, 0);
  nose.rotation.z = degToRad(90); // ou Math.Pi / 2

  return {
    cabin,
    chimney,
    nose,
  };
};
