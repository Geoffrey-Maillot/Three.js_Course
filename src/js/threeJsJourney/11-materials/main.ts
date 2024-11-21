import * as THREE from "three";
import { initPage } from "../../initPage";
import { threeJsJourneyLessons } from "../../../constant/index";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import { Pane } from "tweakpane";

initPage({
  titlePage: "Materials",
  titleHeader: "11 - Materials",
  originalLesson: "https://threejs-journey.com/lessons/materials",
  lessonsList: threeJsJourneyLessons,
});

// Récupération des conteneurs DOM
const paneContainer = document.getElementById(
  "pane-container",
) as HTMLDivElement;

// Initialisation du panneau de debug Tweakpane
const pane = new Pane({
  title: "Debug UI",
  container: paneContainer,
});

/**
 * Base
 */

// Container
const container = document.getElementById("app") as HTMLDivElement;

// Scene
const scene = new THREE.Scene();

const rgbeLoader = new RGBELoader();
rgbeLoader
  .loadAsync("/textures/environmentMap/2k.hdr")
  .then((environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = environmentMap;
    scene.environment = environmentMap;
  });

//Texture Loader
const textureManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(textureManager);

// Textures
const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg",
);
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorGradientTexture = textureLoader.load("/textures/gradients/3.jpg");

// Matcap
const doorMatcapTexture = textureLoader.load("/textures/matcaps/1.png");
const doorGradientMatcapTexture = textureLoader.load("/textures/matcaps/2.png");
const doorBlueMatcapTexture = textureLoader.load("/textures/matcaps/3.png");
const doorGreenMatcapTexture = textureLoader.load("/textures/matcaps/4.png");
const doorRedMatcapTexture = textureLoader.load("/textures/matcaps/5.png");
const doorYellowMatcapTexture = textureLoader.load("/textures/matcaps/6.png");
const doorPurpleMatcapTexture = textureLoader.load("/textures/matcaps/7.png");
const doorTestMatcapTexture = textureLoader.load("/textures/matcaps/8.png");

// Color space
doorColorTexture.colorSpace = THREE.SRGBColorSpace;
doorMatcapTexture.colorSpace = THREE.SRGBColorSpace;

/**
 * Object
 */
// Basic material
//const material = new THREE.MeshBasicMaterial({ map: doorColorTexture });
// or
//const material = new THREE.MeshBasicMaterial();
//material.map = doorColorTexture;
// material.color = new THREE.Color(0xff0000);
// material.wireframe = true
// material.transparent = true
// material.opacity = 0.5 // marche avec material.transpaant
// material.alphaMap = doorAlphaTexture
// material.side = THREE.DoubleSide

// Normal material
// normal material ne prend pas de texture ni de color
// il est utilisé pour les normal mapping
// Il permet de voir les normales
//const material = new THREE.MeshNormalMaterial();

// Matcap material
// matcap material prend des textures matcap
// Il n'a pas besoin de lumière
// il permet de simuler les reflets de la lumière (pas de shadows)
// La lumière est toujours derrière la caméra
//const material = new THREE.MeshMatcapMaterial({
//  matcap: doorRedMatcapTexture,
//});

//const material = new THREE.MeshStandardMaterial({
//  map: doorColorTexture,
//  aoMap: doorAmbientOcclusionTexture,
//  roughnessMap: doorRoughnessTexture,
//  normalMap: doorNormalTexture,
//  metalnessMap: doorMetalnessTexture,
//  displacementMap: doorHeightTexture,
//  displacementScale: 0.02,
//  transparent: true,
//  alphaMap: doorAlphaTexture,
//});

const material = new THREE.MeshPhysicalMaterial({
  //map: doorColorTexture,
  //aoMap: doorAmbientOcclusionTexture,
  //roughnessMap: doorRoughnessTexture,
  //normalMap: doorNormalTexture,
  //metalnessMap: doorMetalnessTexture,
  //displacementMap: doorHeightTexture,
  //displacementScale: 0.02,
  //alphaMap: doorAlphaTexture,
  //transparent: true,
  // Properties PhysicalMaterial
  transmission: 1,
  ior: 1.666,
  thickness: 1,
});

material.roughness = 0;
material.metalness = 0;
//material.aoMapIntensity = 1;
//material.normalScale.set(0.5, 0.5);

// Tweaks material
pane.addBinding(material, "metalness", { min: 0, max: 1, step: 0.001 });
pane.addBinding(material, "roughness", { min: 0, max: 1, step: 0.001 });
pane.addBinding(material, "aoMapIntensity", { min: 0, max: 3, step: 0.001 });
pane.addBinding(material, "transmission", { min: 0, max: 1, step: 0.001 });
pane.addBinding(material, "ior", { min: 0, max: 10, step: 0.001 });
pane.addBinding(material, "thickness", { min: 0, max: 1, step: 0.001 });
pane.addBinding(material, "attenuationDistance", {
  min: 0,
  max: 10,
  step: 0.001,
});
// Sphere
const sphereGeometry = new THREE.SphereGeometry(1, 64, 64);
const sphere = new THREE.Mesh(sphereGeometry, material);
sphere.position.x = -2;

// Plane
const planeGeometry = new THREE.PlaneGeometry(1, 1, 100, 100);
const plane = new THREE.Mesh(planeGeometry, material);

// Torus
const torusGeometry = new THREE.TorusGeometry(1, 0.4, 32, 100);
const torus = new THREE.Mesh(torusGeometry, material);
torus.position.x = 2.5;
scene.add(sphere, plane, torus);

/**
 * Lights
 */
//const light = new THREE.DirectionalLight("#ffffff", 3);
//light.position.set(10, 10, 10);
//scene.add(light);

//const ambientLight = new THREE.AmbientLight("#ffffff", 0.5);
//scene.add(ambientLight);
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
camera.position.z = 2;
camera.position.x = 0.8;
camera.position.y = 0.8;
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

  // animate object
  sphere.rotation.y = THREE.MathUtils.degToRad(8) * elapsedTime;
  torus.rotation.y = THREE.MathUtils.degToRad(8) * elapsedTime;
  plane.rotation.y = THREE.MathUtils.degToRad(8) * elapsedTime;

  sphere.rotation.x = THREE.MathUtils.degToRad(-8) * elapsedTime;
  torus.rotation.x = THREE.MathUtils.degToRad(-8) * elapsedTime;
  plane.rotation.x = THREE.MathUtils.degToRad(-8) * elapsedTime;

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
