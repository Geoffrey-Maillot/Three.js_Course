import * as THREE from "three";
import { initPage } from "../../initPage";
import { threeJsJourneyLessons } from "../../../constant/index";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";
import gsap from "gsap";

/**
 * Configuration de la page et initialisation
 */
initPage({
  titlePage: "Debug UI",
  titleHeader: "09 - Debug UI",
  originalLesson: "https://threejs-journey.com/lessons/debug-ui",
  lessonsList: threeJsJourneyLessons,
});

/**
 * Base
 */

// Récupération des conteneurs DOM
const container = document.getElementById("app") as HTMLDivElement;
const paneContainer = document.getElementById(
  "pane-container",
) as HTMLDivElement;

// Initialisation du panneau de debug Tweakpane
const pane = new Pane({
  title: "Debug UI",
  container: paneContainer,
});

// Création de la scène Three.js
const scene = new THREE.Scene();

/**
 * Configuration de l'objet
 */

// Paramètres de debug pour le cube
const tweakPaneDebug = {
  cube: {
    parameters: {
      // cube parameters
      width: 1,
      height: 1,
      depth: 1,
      widthSegments: 1,
      heightSegments: 1,
      depthSegments: 1,
    },
    color: "#686acf",
    isAnimation: false,
    rotation: () => {
      // Empêche le spam de l'animation
      if (tweakPaneDebug.cube.isAnimation) return;
      tweakPaneDebug.cube.isAnimation = true;
      // Animation de rotation sur 360 degrés
      gsap.to(mesh.rotation, {
        y: mesh.rotation.y + Math.PI * 2,
        duration: 1,
        ease: "none",
        onComplete: () => {
          // Réinitialise le flag une fois l'animation terminée
          tweakPaneDebug.cube.isAnimation = false;
        },
      });
    },
  },
};

// Création du cube
const geometry = new THREE.BoxGeometry(
  tweakPaneDebug.cube.parameters.width,
  tweakPaneDebug.cube.parameters.height,
  tweakPaneDebug.cube.parameters.depth,
  tweakPaneDebug.cube.parameters.widthSegments,
  tweakPaneDebug.cube.parameters.heightSegments,
  tweakPaneDebug.cube.parameters.depthSegments,
);
const material = new THREE.MeshBasicMaterial({
  color: tweakPaneDebug.cube.color,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
console.log(mesh);

// Configuration des contrôles Tweakpane pour le cube
const cubeFolder = pane.addFolder({ title: "Cube" });

// Contrôle de la position verticale
cubeFolder.addBinding(mesh.position, "y", {
  view: "range",
  min: -3,
  max: 3,
  step: 0.01,
  label: "Elevation",
});

// Toggle de visibilité
cubeFolder.addBinding(mesh, "visible", {
  view: "boolean",
  label: "Visible",
});

// Toggle du mode wireframe
cubeFolder.addBinding(mesh.material, "wireframe", {
  view: "boolean",
  label: "Wireframe",
});

// Contrôle de la couleur
cubeFolder
  .addBinding(tweakPaneDebug.cube, "color", {
    view: "color",
    label: "Color",
  })
  .on("change", ({ value }) => {
    material.color.set(value);
  });

const changeGeometry = () => {
  // Cette fonctionnalité permet de modifier la géométrie du cube en fonction des paramètres ajustés dans l'interface utilisateur.
  // Le mesh.geometry.dispose() est utilisé pour libérer les ressources de la géométrie précédente avant de créer une nouvelle géométrie.
  mesh.geometry.dispose();
  // Si les paramètres sont modifiés, une nouvelle géométrie est créée avec les nouvelles valeurs.
  mesh.geometry = new THREE.BoxGeometry(
    tweakPaneDebug.cube.parameters.width,
    tweakPaneDebug.cube.parameters.height,
    tweakPaneDebug.cube.parameters.depth,
    tweakPaneDebug.cube.parameters.widthSegments,
    tweakPaneDebug.cube.parameters.heightSegments,
    tweakPaneDebug.cube.parameters.depthSegments,
  );
};

const segmentFolder = cubeFolder.addFolder({ title: "Segments" });
segmentFolder
  .addBinding(tweakPaneDebug.cube.parameters, "widthSegments", {
    view: "number",
    label: "Width",
    min: 1,
    max: 10,
    step: 1,
  })
  .on("change", () => {
    changeGeometry();
  });

// Bouton pour déclencher l'animation
cubeFolder.addButton({ title: "Animation" }).on("click", () => {
  tweakPaneDebug.cube.rotation();
});

/**
 * Configuration des dimensions
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

/**
 * Panel de debug
 */

// Pour cacher le panneau
pane.hidden = true;

// Pour afficher le panneau
pane.hidden = false;

// Toggle avec une touche du clavier
window.addEventListener("keydown", (e) => {
  if (e.key === "h") {
    // 'h' pour hide/show
    pane.hidden = !pane.hidden;
  }
});
