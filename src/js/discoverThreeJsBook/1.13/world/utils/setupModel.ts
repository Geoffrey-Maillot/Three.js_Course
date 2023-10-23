import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

export const setupModel = (data: GLTF) => {
  const model = data.scene.children[0];

  return model;
};
