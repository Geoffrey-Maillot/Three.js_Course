import { PerspectiveCamera } from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export function createControls(
  camera: PerspectiveCamera,
  canvas: HTMLCanvasElement,
  updatables: Array<(delta: number) => void>,
) {
  const controls = new OrbitControls(camera, canvas);
  // damping and auto rotation require
  // the controls to be updated each frame

  //controls.autoRotate = true;
  //controls.enableDamping = true;

  const tick = () => {
    controls.update();
  };

  updatables.push(tick);

  return controls;
}
