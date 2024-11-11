import * as THREE from "three";
import { initPage } from "../../initPage";
import { threeJsJourneyLessons } from "../../../constant/index";
//import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

initPage({
  titlePage: "Cameras",
  titleHeader: "06 - Cameras",
  originalLesson: "https://threejs-journey.com/lessons/cameras",
  lessonsList: threeJsJourneyLessons,
});

// Sizes
const sizes = {
  with: 800,
  height: 600,
  aspectRatio: function () {
    return this.with / this.height;
  },
};

/**
 * Cursor
 */
const cursor = new THREE.Vector2();

document.addEventListener("mousemove", (event) => {
  cursor.x = (event.clientX / window.innerWidth) * 2 - 1;
  cursor.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Get Canvas ELement
const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;

// Create Scene
const scene = new THREE.Scene();

// Red cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "red" });
const cube = new THREE.Mesh(geometry, material);

/**
 * Camera
 */
// Perspective camera
const camera = new THREE.PerspectiveCamera(75, sizes.aspectRatio(), 0.1, 100);

// Orthographic camera

//const camera = new THREE.OrthographicCamera(
//  -1 * sizes.aspectRatio(),
//  1 * sizes.aspectRatio(),
//  1,
//  -1,
//  0.1,
//  100,
//);

camera.position.z = 3;
camera.lookAt(cube.position);

// Contrôle de la caméra
const controls = new OrbitControls(camera, canvas);
//controls.target.set(cube.position.x, cube.position.y, cube.position.z);
controls.target.y = 1;
controls.enableDamping = true;

// Ajourt de limite
controls.minDistance = 2;
controls.maxDistance = 10;
controls.maxPolarAngle = Math.PI / 2;
controls.dampingFactor = 0.09;

// Ajout du maillage dans la scène
scene.add(cube);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});

renderer.setSize(sizes.with, sizes.height);

/**
 * Animate
 */
const clock = new THREE.Clock();
let previousTime = 0;

renderer.setAnimationLoop(() => {
  const elapsedTime = clock.getElapsedTime();
  const delta = elapsedTime - previousTime;

  //cube.rotation.y += Math.PI * 0.125 * delta;

  // camera
  //camera.position.x = Math.sin((cursor.x / 2) * Math.PI * 2) * 3;
  //camera.position.z = Math.cos((cursor.x / 2) * Math.PI * 2) * 3;
  //camera.position.y = cursor.y * 5;
  //camera.lookAt(cube.position);

  // Update Controls
  controls.update();

  previousTime = elapsedTime;
  renderer.render(scene, camera);
});
