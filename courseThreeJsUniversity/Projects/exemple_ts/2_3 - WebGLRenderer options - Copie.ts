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
const width = 300;
const height = 300;

function init() {
  // Html Canva
  const canva = document.getElementById("canvas") as HTMLCanvasElement;
  /**
   * Init scene
   */
  scene = new Scene();

  /**
   * Init Rendered
   */
  //! La scene sera rendu dans le canva "canva"
  renderer = new WebGLRenderer({ antialias: true, canvas: canva, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);

  //! On peu set la couleur du background à partir du renderer et régler l'opacité
  renderer.setClearColor(0xcccccc, 0);

  //! On set la size du canva
  renderer.setSize(width, height);

  /**
   * Init Camera
   */

  //! Le ratio est définis à partir de la width et du la height du canva
  camera = new PerspectiveCamera(75, width / height, 1, 1000);
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

  cube.rotation.x += 0.001;
  cube.rotation.y += 0.005;

  requestAnimationFrame(render);
}

document.addEventListener("DOMContentLoaded", init);
