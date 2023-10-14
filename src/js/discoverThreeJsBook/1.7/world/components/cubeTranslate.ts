import { BoxGeometry, Mesh, MeshStandardMaterial } from "three";

export const createCubeTranslate = (
  updatables: Array<(data: number) => void>,
) => {
  const geometry = new BoxGeometry(2, 2, 2);
  const material = new MeshStandardMaterial({ color: "purple" });
  const cubeTranslate = new Mesh(geometry, material);

  cubeTranslate.translateX(-4);

  let compteur = 0;
  let timer = null;

  // Animation
  const tick = (delta: number) => {
    const distancePerSecond = 0.5 * delta;

    if (!timer) {
      timer = setInterval(() => {
        compteur += 1;
      }, 2000);
    }
    if (compteur % 2 === 0) {
      cubeTranslate.translateY(distancePerSecond);
    } else {
      cubeTranslate.translateY(-distancePerSecond);
    }
  };

  updatables.push(tick);

  const inputControl = document.getElementById(
    "animation-translate",
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

  return { cubeTranslate } as const;
};
