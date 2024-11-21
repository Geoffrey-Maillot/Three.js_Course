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
let camera: PerspectiveCamera;
let ambiantLight: AmbientLight;
let directionnalLight: DirectionalLight;

let material: MeshPhongMaterial;
let geometry: BoxGeometry;
let cube: Mesh;
let clock: Clock;
let timer;
let compteur = 0;

let ticks: Array<(delta: number) => void> = [];

// Calcule du nombre de cube à affiche en fonction de la taille de l'écran
// 1 cube de largeur x et hauteur y d'une unité  et d'une distance de caméra sur z de -6 donne un cube de 136px;
// Divisé par la  largeur et la hauteur de l'écran cela donne le nombre de cube à afficher

let nbrCubeX = window.innerWidth / 136;
let nbrCubeY = window.innerHeight / 136;

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
    100,
  );
  camera.position.set(0, 0, 6);
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
  material = new MeshPhongMaterial({ color: 0xc92a08 });
  geometry = new BoxGeometry(1, 1, 0);
  cube = new Mesh(geometry, material);
  // On place le premier cube à gacuhe

  // Je place le premier cube en haut à gauche du screen
  cube.position.x = -nbrCubeX / 2 + 0.5;
  cube.position.y = nbrCubeY / 2 + -0.5;

  // Départ de l'animation
  cube.scale.set(0, 0, 0);

  // je push l'animation du cube
  const tick = (delta) => {
    animationCube(cube, delta);
  };

  ticks.push(tick);
  scene.add(cube);
  cube.name = "cube_0-0";

  /**
   * Je crée tous mes cubes avec deux boucles imbriqué. Une pour l'axe X et la boucle imbriqué pour l'axe Y
   * Je push à chaque fois l'animation
   */
  for (let i = 0; i < nbrCubeX; i++) {
    const clone = cube.clone();
    clone.position.x += i;
    clone.name = `cube_${i + 1}-0`;

    const animateCube = (delta: number) => {
      animationCube(clone, delta);
    };

    ticks.push(animateCube);
    scene.add(clone);

    for (let y = 0; y < nbrCubeY; y++) {
      const clone = cube.clone();
      clone.position.x += i;
      clone.position.y -= y;
      clone.name = `cube_${i + 1}-${y + 1}`;

      const animateCube = (delta: number) => {
        animationCube(clone, delta);
      };

      ticks.push(animateCube);
      scene.add(clone);
      scene.add(clone);
    }
  }

  // L'animation du cube
  // Il faudra à chaque fois englober cette fonction d'une autre que l'on passera au tableaux ticks et qui prendra en paramètre le delta
  const animationCube = (cube: Mesh, delta: number) => {
    if (!timer) {
      timer = setInterval(() => {
        compteur += 1;
      }, 1000);
    }

    if (compteur % 2 === 0) {
      cube.scale.x += 1 * delta;
      cube.scale.y += 1 * delta;
    } else {
      cube.scale.x -= 1 * delta;
      cube.scale.y -= 1 * delta;
      cube.rotation.z -= degToRad(-180 * delta);
    }
  };

  render();
  console.log(camera);
}

function render() {
  renderer.render(scene, camera);

  const delta = clock.getDelta();

  ticks.forEach((tick) => tick(delta));

  //responsive
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  requestAnimationFrame(render);
}

document.addEventListener("DOMContentLoaded", init);
