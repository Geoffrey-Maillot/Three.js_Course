import {
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
  MathUtils,
  TextureLoader,
} from "three";
// import image
import textureImage from "../../../../../assets/textures/uv-test-col.png";

const createMaterial = () => {
  // create a texture loader.
  const textureLoader = new TextureLoader();
  // load texture
  const texture = textureLoader.load(textureImage);

  // apply texture to the material
  const material = new MeshStandardMaterial({ map: texture });
  return material;
};

export const createCubeRotate3 = (
  updatables: Array<(data: number) => void>,
) => {
  const geometry = new BoxGeometry(2, 2, 2);
  const material = createMaterial();
  const cubeRotate3 = new Mesh(geometry, material);

  cubeRotate3.translateX(4);
  cubeRotate3.rotation.set(-0.1, -0.3, 0.9);

  const tick = (delta: number) => {
    const rotationPerSecond = MathUtils.degToRad(30) * delta;

    cubeRotate3.rotation.z += rotationPerSecond;
    cubeRotate3.rotation.x += rotationPerSecond;
    cubeRotate3.rotation.y += rotationPerSecond;
  };

  updatables.push(tick);

  return { cubeRotate3 } as const;
};
