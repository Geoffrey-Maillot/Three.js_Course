import {
  ConeGeometry,
  Mesh,
  MeshStandardMaterial,
  MathUtils,
  TextureLoader,
} from "three";
// import image
import textureImage from "../../../assets/textures/uv-test-col.png";

const createMaterial = () => {
  // create a texture loader.
  const textureLoader = new TextureLoader();
  // load texture
  const texture = textureLoader.load(textureImage);

  // apply texture to the material
  const material = new MeshStandardMaterial({ map: texture });
  return material;
};

export const createCone = (updatables: Array<(data: number) => void>) => {
  const geometry = new ConeGeometry(1, 2, 30);
  const material = createMaterial();
  const cone = new Mesh(geometry, material);

  cone.translateY(4);
  cone.translateX(-4);

  const tick = (delta: number) => {
    const rotationPerSecond = MathUtils.degToRad(30) * delta;

    cone.rotateY(rotationPerSecond);
    cone.rotateY(rotationPerSecond);
  };

  updatables.push(tick);

  return { cone } as const;
};
