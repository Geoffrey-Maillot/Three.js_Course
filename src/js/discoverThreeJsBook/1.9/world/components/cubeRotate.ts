import {
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
  MathUtils,
  TextureLoader,
  Vector2,
} from "three";
// import image
import textureImage from "../../../../../assets/textures/uv-test-bw.png";
import textureImage2 from "../../../../../assets/textures/uv-test-col.png";

const createMaterial = () => {
  // create a texture loader.
  const textureLoader = new TextureLoader();
  // load texture
  const texture = textureLoader.load(textureImage);
  console.log(
    "🚀 ~ file: cubeRotate.ts:18 ~ createMaterial ~ texture:",
    texture,
  );
  const texture2 = textureLoader.load(textureImage2);

  // apply texture to the material
  const material = new MeshStandardMaterial({
    map: texture,
    bumpMap: texture2,
  });
  return material;
};

export const createCubeRotate = (updatables: Array<(data: number) => void>) => {
  const geometry = new BoxGeometry(2, 2, 2);
  const material = createMaterial();
  const cubeRotate = new Mesh(geometry, material);

  cubeRotate.rotation.set(-0.5, -0.1, 0.8);

  const tick = (delta: number) => {
    const rotationPerSecond = MathUtils.degToRad(30) * delta;

    cubeRotate.rotation.z += rotationPerSecond;
    cubeRotate.rotation.x += rotationPerSecond;
    cubeRotate.rotation.y += rotationPerSecond;
  };

  updatables.push(tick);

  return { cubeRotate } as const;
};
