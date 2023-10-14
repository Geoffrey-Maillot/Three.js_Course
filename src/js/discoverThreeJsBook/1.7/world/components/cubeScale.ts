import { BoxGeometry, Mesh, MeshStandardMaterial } from "three";

export const createCubeSCale = (updatables: Array<(data: number) => void>) => {
  const geometry = new BoxGeometry(2, 2, 2);
  const material = new MeshStandardMaterial({ color: "purple" });
  const cubeScale = new Mesh(geometry, material);

  cubeScale.translateX(4);
  cubeScale.rotation.set(-0.5, -0.1, 0.8);
  let timer = null;
  let compteur = 0;

  // Animation

  const tick = (delta: number) => {
    const percentPerSecond = 0.1 * delta;

    let animation = null;

    const scalePlus = () => {
      cubeScale.scale.x += percentPerSecond;
      cubeScale.scale.y += percentPerSecond;
      cubeScale.scale.z += percentPerSecond;
    };

    const scaleMinus = () => {
      cubeScale.scale.x -= percentPerSecond;
      cubeScale.scale.y -= percentPerSecond;
      cubeScale.scale.z -= percentPerSecond;
    };

    if (!timer) {
      timer = setInterval(() => {
        compteur += 1;
      }, 3000);
    }

    if (!animation) {
      animation = scalePlus;
    }

    if (compteur % 2 === 0) {
      animation = scalePlus;
    } else {
      animation = scaleMinus;
    }

    animation();
  };

  updatables.push(tick);

  const inputControl = document.getElementById(
    "animation-scale",
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

  return { cubeScale } as const;
};
