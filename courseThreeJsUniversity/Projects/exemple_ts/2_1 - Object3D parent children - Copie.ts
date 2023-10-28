import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Vector3,
  Camera,
  AmbientLight,
  DirectionalLight,
  MeshPhongMaterial,
  BoxGeometry,
  Mesh,
  Object3D,
} from "three";

// Variable
let scene: Scene;
let renderer: WebGLRenderer;
let camera: Camera;
let ambiantLight: AmbientLight;
let directionnalLight: DirectionalLight;

let material: MeshPhongMaterial;
let materialYellow: MeshPhongMaterial;
let geometry: BoxGeometry;
let cubeParent: Mesh;
let cubeEnfant: Mesh;

function init() {
  const bodyElement = document.querySelector("body") as HTMLBodyElement;
  /**
   * Init scene
   */
  scene = new Scene();

  /**
   * Init Rendered
   */
  renderer = new WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  bodyElement.appendChild(renderer.domElement);

  /**
   * Init Camera
   */
  camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    10000,
  );
  camera.position.set(-500, 400, -500);
  camera.lookAt(new Vector3(0, 0, 0));
  scene.add(camera);

  /**
   * Lights
   */

  // ambiant light
  ambiantLight = new AmbientLight(0xcccccc, 0.5);
  scene.add(ambiantLight);

  // directionnalLight
  directionnalLight = new DirectionalLight(0xffffff, 0.8);
  scene.add(directionnalLight);

  // Cube
  material = new MeshPhongMaterial({ color: 0x34495e });
  geometry = new BoxGeometry(300, 300, 300);
  cubeParent = new Mesh(geometry, material);

//! cube enfant
  materialYellow = new MeshPhongMaterial({ color: 0xfff000 });
  cubeEnfant = new Mesh(geometry, materialYellow);
  cubeEnfant.scale.set(-0.5, -0.5, -0.5);
  cubeEnfant.translateZ(400);

  cubeParent.add(cubeEnfant);
  scene.add(cubeParent);

  render();
}

function render() {
  renderer.render(scene, camera);

  cubeParent.rotation.x += 0.001;
  cubeParent.rotation.y += 0.005;

  requestAnimationFrame(render);
}

document.addEventListener("DOMContentLoaded", init);
