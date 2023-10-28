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
  Clock,
} from "three";

// Variable
let scene: Scene;
let renderer: WebGLRenderer;
let camera: Camera;
let ambiantLight: AmbientLight;
let directionnalLight: DirectionalLight;

let material: MeshPhongMaterial;
let geometry: BoxGeometry;
let cube: Mesh;
let clock: Clock;

function init() {
  const bodyElement = document.querySelector("body") as HTMLBodyElement;
  clock = new Clock();
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
    1000,
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
  cube = new Mesh(geometry, material);
  scene.add(cube);

  render();
}

function render() {
  renderer.render(scene, camera);
  //! retourne le tmeps depuis la dernière fois ou il a été utilisé

  //! retoune le tmeps depuis le moment ou il a été instancier
  const delta = clock.getDelta();
  const elapsed = clock.getElapsedTime();

  //! sin et cos retourne une valeur entre -1 et 1 ce qui permet de faire un aller retour sur le cube
  const sin = Math.sin(elapsed) * 100;
  cube.position.y += sin * delta;

  requestAnimationFrame(render);
}

document.addEventListener("DOMContentLoaded", init);
