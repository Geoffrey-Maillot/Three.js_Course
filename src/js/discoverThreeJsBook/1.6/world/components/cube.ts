import THREE, {
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
  MeshBasicMaterial,
  MathUtils,
  Color,
  BufferAttribute,
} from "three";

const { degToRad } = MathUtils;

const spec = {
  color: "purple",
};

export function createStandartCube() {
  const geometry = new BoxGeometry(0.5, 0.5, 0.5);

  // Switch the old "basic" material to
  // a physically correct "standard" material
  const material = new MeshStandardMaterial(spec);

  const cube = new Mesh(geometry, material);

  cube.translateX(-2);
  cube.rotation.set(-0.5, -0.1, 0.8);

  return cube;
}

export function createBasictCube() {
  const geometry = new BoxGeometry(2, 2, 2);

  const material = new MeshBasicMaterial({ ...spec, wireframe: true });

  const standartCube = createStandartCube();

  const cube = new Mesh(geometry, material);

  cube.add(standartCube);

  cube.translateX(2);
  cube.rotation.set(-0.5, -0.1, 0.8);

  return cube;
}

export function createStandartCubeScale() {
  const geometry = new BoxGeometry(0.5, 0.5, 0.5);

  // Switch the old "basic" material to
  // a physically correct "standard" material
  const material = new MeshStandardMaterial(spec);

  const cube = new Mesh(geometry, material);

  cube.position.set(-1, 0, 6);
  cube.scale.set(-1, -1, -1);

  return cube;
}

export function createStandartCubeScaleRotation() {
  const geometry = new BoxGeometry(0.5, 0.5, 0.5);

  // Switch the old "basic" material to
  // a physically correct "standard" material
  const material = new MeshStandardMaterial({ vertexColors: true });

  const positionAttribute = geometry.getAttribute("position");
  console.log(positionAttribute);

  const colors = [];
  const color = new Color();

  for (let i = 0; i < positionAttribute.count; i += 3) {
    color.set(Math.random() * 0xffffff);

    // define the same color for each vertex of a triangle

    colors.push(color.r, color.g, color.b);
    colors.push(color.r, color.g, color.b);
    colors.push(color.r, color.g, color.b);
  }

  // define the new attribute
  geometry.setAttribute(
    "color",
    new BufferAttribute(new Float32Array(colors), 3),
  );

  const cube = new Mesh(geometry, material);

  cube.rotation.set(degToRad(45), degToRad(45), degToRad(45));

  return cube;
}
