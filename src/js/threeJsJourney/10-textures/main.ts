import * as THREE from "three";
import { initPage } from "../../initPage";
import { threeJsJourneyLessons } from "../../../constant/index";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";

initPage({
  titlePage: "Textures",
  titleHeader: "10 - Textures",
  originalLesson: "https://threejs-journey.com/lessons/textures",
  lessonsList: threeJsJourneyLessons,
});

//pane container
const paneContainer = document.getElementById(
  "pane-container",
) as HTMLDivElement;

//pane
const pane = new Pane({
  title: "Debug UI",
  container: paneContainer,
});

// Container
const container = document.getElementById("app") as HTMLDivElement;

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */

//? LoadingManager est un gestionnaire de chargement de textures qui permet de gérer les événements de chargement, d'erreur et de progression.
const textureManager = new THREE.LoadingManager();

//? TextureLoader est un chargeur de textures qui utilise le LoadingManager pour gérer les événements de chargement, d'erreur et de progression.
const textureLoader = new THREE.TextureLoader(textureManager);

// textures
const colorTexture = textureLoader.load("/textures/door/color.jpg");
const checkerboardTexture = textureLoader.load(
  "/textures/checkerboard-1024x1024.png",
);
const minecraftTexture = textureLoader.load("/textures/minecraft.png");
const ambientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg",
);
const roughness = textureLoader.load("/textures/door/roughness.jpg");
const normalTexture = textureLoader.load("/textures/door/normal.jpg");
const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const heightTexture = textureLoader.load("/textures/door/height.jpg");
const alphaTexture = textureLoader.load("/textures/door/alpha.jpg");

textureManager.onLoad = () => {
  console.log(" 🎆texture loaded");
};

textureManager.onError = () => {
  console.log("error loading texture");
};

textureManager.onProgress = (url, loaded, total) => {
  console.log("texture loading", url, loaded, total);
};

// Set color space to sRGB
// ⚠️ Important pour que la texture soit affichée correctement
colorTexture.colorSpace = THREE.SRGBColorSpace;

/**
 * Transform texture
 */
// === Repeat texture
//colorTexture.repeat.set(2, 2);
//colorTexture.wrapS = THREE.RepeatWrapping;
//colorTexture.wrapT = THREE.RepeatWrapping;

// === transform texture
//colorTexture.rotation = Math.PI * 0.25;
//colorTexture.center.set(0.5, 0.5);

// === offset texture
//colorTexture.offset.set(0.5, 0.5);

// === Mipmap
// colorTexture.minFilter = THREE.LinearMipmapLinearFilter; // Default

// ⚠️ Si on utilise un filtre de type Nearest, il faut désactiver les mipmaps
minecraftTexture.generateMipmaps = false;

// Définit le filtre de minification (réduction) de la texture
// NearestFilter utilise le pixel le plus proche sans interpolation
minecraftTexture.minFilter = THREE.NearestFilter;
minecraftTexture.magFilter = THREE.NearestFilter;

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ map: minecraftTexture });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/**
 * Sizes
 */
const sizes = {
  width: container.clientWidth,
  height: container.clientHeight,
};

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
);
camera.position.z = 3;
scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({ antialias: true });
container.append(renderer.domElement);

renderer.setSize(sizes.width, sizes.height);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

// Resizer
window.addEventListener("resize", () => {
  // Update Sizes
  sizes.width = container.clientWidth;
  sizes.height = container.clientHeight;

  // Update Camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update Renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
