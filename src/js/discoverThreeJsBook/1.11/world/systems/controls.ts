import { Mesh, PerspectiveCamera, Vector3 } from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export function createControls(
  camera: PerspectiveCamera,
  canvas: HTMLCanvasElement,
  updatables: Array<(delta: number) => void>,
) {
  const controls = new OrbitControls(camera, canvas);
  let target: Vector3;
  // damping and auto rotation require
  // the controls to be updated each frame

  //controls.autoRotate = true;
  //controls.enableDamping = true;

  const tick = () => {
    controls.update();
  };

  const setTarget = (targetMesh: Mesh) => {
    const newPosition = new Vector3(
      targetMesh.position.x,
      targetMesh.position.y,
      20,
    );
    target = newPosition;
  };

  updatables.push(tick);

  return { controls, setTarget };
}
