import * as THREE from "three";
import { initPage } from "../../initPage";
import { threeJsJourneyLessons } from "../../../constant/index";
import { gsap } from "gsap";

initPage({
  titlePage: "Animations",
  titleHeader: "05 - Animations",
  originalLesson: "https://threejs-journey.com/lessons/animations",
  lessonsList: threeJsJourneyLessons,
});

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

// Camera
const sizes = {
  width: 800,
  height: 600,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.set(0, 0, 5);
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);

/**
 * Animation loop
 */

const clock = new THREE.Clock();
let previousTime = 0;

const animation = gsap.to(mesh.position, {
  x: 3,
  duration: 2,
  yoyo: true,
  repeat: -1,
  ease: "power1.inOut",
});

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const delta = elapsedTime - previousTime;

  // mesh.rotation.y += Math.PI * 0.25 * delta;

  // mesh.position.x = Math.cos(elapsedTime);
  // mesh.position.y = Math.sin(elapsedTime);

  // period est en secondes
  // const period = 10; // pour un cycle complet en 2 secondes
  // mesh.scale.x = 1 + 0.5 * Math.sin((elapsedTime * 2 * Math.PI) / period);

  requestAnimationFrame(tick);

  previousTime = elapsedTime;

  renderer.render(scene, camera);
};

tick();
