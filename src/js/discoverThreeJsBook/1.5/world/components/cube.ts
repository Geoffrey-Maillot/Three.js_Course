import {
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
  MeshBasicMaterial,
} from "three";

const spec = {
  color: "purple",
};

function createBasictCube() {
  const geometry = new BoxGeometry(2, 2, 2);

  const material = new MeshBasicMaterial(spec);

  const cube = new Mesh(geometry, material);

  cube.translateX(-2);

  cube.rotation.set(-0.5, -0.1, 0.8);

  return cube;
}

function createStandartCube() {
  const geometry = new BoxGeometry(2, 2, 2);

  // Switch the old "basic" material to
  // a physically correct "standard" material
  const material = new MeshStandardMaterial(spec);

  const cube = new Mesh(geometry, material);

  cube.translateX(2);

  cube.rotation.set(-0.5, -0.1, 0.8);

  return cube;
}

export { createStandartCube, createBasictCube };
