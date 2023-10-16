import { Mesh, PerspectiveCamera, Vector3 } from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import TWEEN from "@tweenjs/tween.js";

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
    console.log({ target, camera: camera.position });
    if (target === camera.position) {
      removeTickUpdatePosition();
    }
    controls.update();
  };

  const updatePosition = () => {
    camera.position.lerp(target, 0.01);
    controls.target.copy(camera.position);
  };

  const removeTickUpdatePosition = () => {
    const i = updatables.findIndex((t) => t === updatePosition);
    const _updatables = updatables.splice(i, 1);
    updatables = _updatables;
  };

  const setTarget = (targetMesh: Mesh) => {
    const newPosition = new Vector3(
      targetMesh.position.x,
      targetMesh.position.y,
      20,
    );
    target = newPosition;
    updatables.push(updatePosition);
  };

  updatables.push(tick);

  return { controls, setTarget };
}
