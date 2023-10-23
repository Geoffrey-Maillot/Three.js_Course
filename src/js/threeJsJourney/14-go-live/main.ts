import * as THREE from "three";
import { initPage } from "../../initPage";
import { threeJsJourneyLessons } from "../../../constant/index";

initPage({
  titlePage: "Basic Scene",
  titleHeader: "03 - Scene Basic",
  originalLesson: "https://threejs-journey.com/lessons/basic-scene",
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

// Get Canvas ELement
const canvas = document.querySelector(".webgl") as HTMLCanvasElement;

// Create Scene
const scene = new THREE.Scene();

// Red cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "red" });
const mesh = new THREE.Mesh(geometry, material);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.aspectRatio());
camera.position.z = 3;
camera.position.x = 1;

// Add mesh in the scene
scene.add(mesh);
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});

renderer.setSize(sizes.with, sizes.height);

// Render
renderer.render(scene, camera);
