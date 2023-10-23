import { PerspectiveCamera } from "three";

const settings = {
  fov: 35,
  aspectRatio: 1, // dummy value
  nearClipping: 0.1,
  farClipping: 100,
};

function createCamera() {
  const camera = new PerspectiveCamera(
    settings.fov,
    settings.aspectRatio,
    settings.nearClipping,
    settings.farClipping,
  );

  // Move camera back to see the scene
  camera.position.set(-6, 6, 12);

  return camera;
}

export { createCamera };
