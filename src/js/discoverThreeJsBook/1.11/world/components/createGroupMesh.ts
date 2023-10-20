import { SphereGeometry, Mesh, MeshStandardMaterial, Group } from "three";
import { degToRad } from "three/src/math/MathUtils.js";

export const createGroupMesh = (updatables: Array<(delta: number) => void>) => {
  // create the group
  const group = new Group();
  // create geometry,
  const geometry = new SphereGeometry(0.25, 20, 20);
  // create material
  const material = new MeshStandardMaterial({ color: "indigo" });

  // create one prototype sphere
  const protoSpere = new Mesh(geometry, material);

  // add protoSphere in the group
  group.add(protoSpere);

  // create twenty clones of the protoSphere
  // and add each to the group
  for (let i = 0; i < 1; i += 0.001) {
    const clone = protoSpere.clone();

    // position the spheres on around a circle
    clone.position.x = Math.cos(2 * Math.PI * i);
    clone.position.y = Math.sin(2 * Math.PI * i);

    clone.position.z = -i * 10;

    clone.scale.multiplyScalar(1 * i);

    group.add(clone);
  }
  group.scale.multiplyScalar(2);

  const tick = (delta: number) => {
    group.rotation.z -= delta * degToRad(30);
  };

  updatables.push(tick);

  return { group } as const;
};
