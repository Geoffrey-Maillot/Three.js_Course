import {
  SphereGeometry,
  Mesh,
  MeshStandardMaterial,
  MathUtils,
  TextureLoader,
} from "three";
// import image
import textureImage from "../../../../../assets/textures/uv-test-bw.png";

const createMaterial = () => {
  // create a texture loader.
  const textureLoader = new TextureLoader();
  // load texture
  const texture = textureLoader.load(textureImage);

  // apply texture to the material
  const material = new MeshStandardMaterial({ map: texture });
  return material;
};

export const createSphere = (updatables: Array<(data: number) => void>) => {
  const geometry = new SphereGeometry(1.4, 30, 30);
  const material = createMaterial();
  const sphere = new Mesh(geometry, material);

  sphere.translateY(4);

  const tick = (delta: number) => {
    const rotationPerSecond = MathUtils.degToRad(30) * delta;

    sphere.rotateY(rotationPerSecond);
    sphere.rotateY(rotationPerSecond);
  };

  updatables.push(tick);

  return { sphere } as const;
};
