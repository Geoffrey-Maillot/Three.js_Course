import { BoxGeometry, Mesh, MeshStandardMaterial, MathUtils } from "three";

export const createCubeRotate = (updatables: Array<(data: number) => void>) => {
  const geometry = new BoxGeometry(2, 2, 2);
  const material = new MeshStandardMaterial({ color: "purple" });
  const cubeRotate = new Mesh(geometry, material);

  cubeRotate.rotation.set(-0.5, -0.1, 0.8);

  const tick = (delta: number) => {
    const rotationPerSecond = MathUtils.degToRad(30) * delta;

    cubeRotate.rotation.z += rotationPerSecond;
    cubeRotate.rotation.x += rotationPerSecond;
    cubeRotate.rotation.y += rotationPerSecond;
  };

  updatables.push(tick);

  const inputControl = document.getElementById(
    "animation-rotate",
  ) as HTMLInputElement;

  inputControl.addEventListener("change", (e) => {
    const checked = (e.target as HTMLInputElement).checked;
    startStopAnimation(checked);
  });

  const startStopAnimation = (start: boolean) => {
    const tickIndex = updatables.findIndex((t) => t === tick);
    if (start) {
      updatables.push(tick);
    } else {
      const _updatables = updatables;
      _updatables.splice(tickIndex, 1);
      updatables = _updatables;
    }
  };

  return { cubeRotate } as const;
};
