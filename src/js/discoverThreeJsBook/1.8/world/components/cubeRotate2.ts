import {
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
  MathUtils,
  TextureLoader,
} from "three";
// import image
import textureImage from "../../../assets/textures/uv-test-bw.png";

const createMaterial = () => {
  // create a texture loader.
  const textureLoader = new TextureLoader();
  // load texture
  const texture = textureLoader.load(textureImage);

  // apply texture to the material
  const material = new MeshStandardMaterial({ map: texture, color: 0x7a7a7a });
  return material;
};

export const createCubeRotate2 = (
  updatables: Array<(data: number) => void>,
) => {
  const geometry = new BoxGeometry(2, 2, 2);
  const material = createMaterial();
  const cubeRotate2 = new Mesh(geometry, material);

  cubeRotate2.translateX(-4);
  cubeRotate2.rotation.set(-0.1, -0.4, 0.2);

  const tick = (delta: number) => {
    const rotationPerSecond = MathUtils.degToRad(30) * delta;

    cubeRotate2.rotation.z += rotationPerSecond;
    cubeRotate2.rotation.x += rotationPerSecond;
    cubeRotate2.rotation.y += rotationPerSecond;
  };

  updatables.push(tick);

  return { cubeRotate2 } as const;
};
