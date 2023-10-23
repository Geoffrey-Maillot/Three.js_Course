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
  const material = new MeshStandardMaterial({
    map: texture,
  });
  return material;
};

export const createCube2 = (updatables: Array<(delta: number) => void>) => {
  const geometry = new BoxGeometry(2, 2, 2);
  const material = createMaterial();
  const cube2 = new Mesh(geometry, material);

  cube2.translateX(-4);
  cube2.rotation.set(-0.5, -0.1, 0.8);

  const tick = (delta: number) => {
    const rotationPerSecond = MathUtils.degToRad(30) * delta;

    cube2.rotation.z += rotationPerSecond;
    cube2.rotation.x += rotationPerSecond;
    cube2.rotation.y += rotationPerSecond;
  };

  // updatables.push(tick);

  return { cube2 } as const;
};
