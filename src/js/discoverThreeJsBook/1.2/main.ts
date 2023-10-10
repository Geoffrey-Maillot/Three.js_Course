import { initPage } from "../../initPage";
import { discoveryThreeJsLessons } from "../../../constant/index";

initPage({
  titlePage: "First scene",
  titleHeader: "1.2 - First scene",
  originalLesson: "https://discoverthreejs.com/book/first-steps/first-scene/",
  lessonsList: discoveryThreeJsLessons,
});

import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";

// Get a reference to the container element that will hold our scene
const container = document.querySelector("#app") as HTMLDivElement;
console.dir(container);

// create a Scene
const scene = new Scene();

// Create a camera
const fov = 35; // AKA Field of View
const aspect = container.clientWidth / container.clientHeight;
const near = 0.1; // the near clipping plane
const far = 100; // the far clipping plane

const camera = new PerspectiveCamera(fov, aspect, near, far);

// every object is initially created at ( 0, 0, 0 )
// move the camera back so we can view the scene
camera.position.set(0, 0, 10);

// create geometry
const geometry = new BoxGeometry(2, 2, 2);

//create material
const material = new MeshBasicMaterial({ color: "red" });

// create the mesh
const cube = new Mesh(geometry, material);

// add the mesh to the scene
scene.add(cube);

// create renderer
const rendered = new WebGLRenderer();

// set the size of renderer
rendered.setSize(container.clientWidth, container.clientHeight);

// set aspect ratio of renderer

rendered.setPixelRatio(container.clientWidth / container.clientHeight);

// add the automatically created <canvas> element to the page
container.append(rendered.domElement);

rendered.render(scene, camera);
