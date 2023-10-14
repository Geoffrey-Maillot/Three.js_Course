import { BoxGeometry, Mesh, MeshStandardMaterial, MathUtils } from "three";

export const createPowerUp = () => {
  const geometry = new BoxGeometry(2, 2, 2);
  const material = new MeshStandardMaterial({ color: "purple" });
  const powerUp = new Mesh(geometry, material);

  powerUp.rotation.set(-0.5, -0.1, 0.8);

  const tick = (delta: number) => {
    const radiansPerSecond = MathUtils.degToRad(30);
    const rotationPerFrame = radiansPerSecond * delta;

    powerUp.rotation.z += rotationPerFrame;
    powerUp.rotation.x += rotationPerFrame;
    powerUp.rotation.y += rotationPerFrame;
  };

  return { powerUp, tick } as const;
};
