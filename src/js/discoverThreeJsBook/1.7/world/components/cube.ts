import { BoxGeometry, Mesh, MeshStandardMaterial } from "three";

export const createPowerUp = () => {
  const geometry = new BoxGeometry(2, 2, 2);
  const material = new MeshStandardMaterial({ color: "purple" });
  const powerUp = new Mesh(geometry, material);

  powerUp.rotation.set(-0.5, -0.1, 0.8);

  const tick = () => {
    powerUp.rotation.z += 0.01;
    powerUp.rotation.x += 0.01;
    powerUp.rotation.y += 0.01;
  };

  return { powerUp, tick } as const;
};
