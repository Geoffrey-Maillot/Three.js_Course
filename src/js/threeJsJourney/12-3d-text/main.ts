import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Pane } from "tweakpane";
import { initPage } from "../../initPage";
import { threeJsJourneyLessons } from "../../../constant/index";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import gsap from "gsap";

initPage({
  titlePage: "3D Text",
  titleHeader: "12 - 3D Text",
  originalLesson: "https://threejs-journey.com/lessons/3d-text",
  lessonsList: threeJsJourneyLessons,
});

// Initialisation du panneau de debug Tweakpane
const paneContainer = document.getElementById(
  "pane-container",
) as HTMLDivElement;

const pane = new Pane({
  title: "Debug UI",
  container: paneContainer,
});

pane.expanded = false;

// Container
const container = document.getElementById("app") as HTMLDivElement;

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matCapTexture = textureLoader.load("/textures/matcaps/8.png");
matCapTexture.colorSpace = THREE.SRGBColorSpace;

/**
 * Fonts
 */
const fontLoader = new FontLoader();

const tweakPaneDebug = {
  text: {
    visible: true,
  },
  textGeometry: {
    size: 0.5,
    height: 0.2, // A la place de depth
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  },
  animation: {
    positionIndicatorLimit: 0.0015,
    rotationSpeedLimit: 0.03,
  },
};

const textToDisplay = `Hi, my name is\nMaillot Geoffrey\nI'm a Three.js developer !`;
const textSoonToDisplay = `(soon...)`;

const changeTextGeometry = () => {
  text.geometry.dispose();
  text.geometry = new TextGeometry(textToDisplay, {
    font: text.geometry.parameters.options.font,
    ...tweakPaneDebug.textGeometry,
  });
  text.geometry.center();
  console.log(text);
};

// Text
let text;
const matCapMaterial = new THREE.MeshMatcapMaterial();
matCapMaterial.matcap = matCapTexture;
let textGeometry;

let textSoon;
const matCapMaterialTextSoon = new THREE.MeshMatcapMaterial({
  transparent: true,
  opacity: 0,
});
matCapMaterialTextSoon.matcap = matCapTexture;
let textSoonGeometry;

// Matcap

// Camera
const camera = new THREE.PerspectiveCamera(
  45,
  container.clientWidth / container.clientHeight,
  0.1,
  100,
);

camera.position.z = -16;
camera.position.y = 0;
camera.position.x = 4.5;
camera.rotation.y = 0;

// Ajout des contrôles pour la caméra
const cameraFolder = pane.addFolder({ title: "Caméra" });

cameraFolder.addBinding(camera.position, "x", {
  min: -50,
  max: 50,
  step: 0.1,
  label: "Position X",
});

cameraFolder.addBinding(camera.position, "y", {
  min: -50,
  max: 50,
  step: 0.1,
  label: "Position Y",
});

cameraFolder.addBinding(camera.position, "z", {
  min: -50,
  max: 50,
  step: 0.1,
  label: "Position Z",
});

// Animation de la caméra
const animateCamera = () => {
  const timeline = gsap.timeline();

  timeline
    .to(camera.position, {
      z: 0,
      duration: 2,
      ease: "power1.in",
    })
    .to(camera.position, {
      z: 10,
      x: -4,
      duration: 3,
      ease: "power2.out",
    });
};

const animateSoonText = () => {
  const timeline = gsap.timeline();
  timeline
    .to(matCapMaterialTextSoon, {
      opacity: 1,
      delay: 5,
      duration: 0.2,
      ease: "none",
    })
    .to(textSoon.position, {
      y: -0.7,
      duration: 2,
      ease: "bounce.out",
    });
};

fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  textGeometry = new TextGeometry(textToDisplay, {
    font,
    ...tweakPaneDebug.textGeometry,
  });

  textSoonGeometry = new TextGeometry(textSoonToDisplay, {
    font,
    ...tweakPaneDebug.textGeometry,
  });

  text = new THREE.Mesh(textGeometry, matCapMaterial);

  textSoon = new THREE.Mesh(textSoonGeometry, matCapMaterialTextSoon);
  // Center textSoon
  textSoonGeometry.center();

  // position textSoon
  textSoon.position.set(5.2, 0, 0); // Final position
  animateSoonText();

  scene.add(text, textSoon);
  textGeometry.computeBoundingBox();

  // Ajout des contrôles pour la position de textSoon
  const textSoonFolder = pane.addFolder({ title: "Text Soon" });

  textSoonFolder.addBinding(textSoon.position, "x", {
    min: -10,
    max: 10,
    step: 0.1,
    label: "Position X",
  });

  textSoonFolder.addBinding(textSoon.position, "y", {
    min: -10,
    max: 10,
    step: 0.1,
    label: "Position Y",
  });

  textSoonFolder.addBinding(textSoon.position, "z", {
    min: -10,
    max: 10,
    step: 0.1,
    label: "Position Z",
  });

  // Calculer le centre en prenant en compte min et max pour chaque axe
  const centerOffsetX =
    -0.5 * (textGeometry.boundingBox.max.x + textGeometry.boundingBox.min.x);
  const centerOffsetY =
    -0.5 * (textGeometry.boundingBox.max.y + textGeometry.boundingBox.min.y);
  const centerOffsetZ =
    -0.5 * (textGeometry.boundingBox.max.z + textGeometry.boundingBox.min.z);

  textGeometry.translate(centerOffsetX, centerOffsetY, centerOffsetZ);

  // OR
  //textGeometry.center();
  // Afficher les propriétés de la géométrie du texte

  // Lancez l'animation après avoir ajouté le texte
  animateCamera();
});

/**
 * Ajout des contrôles pour la géométrie du texte
 */
const textFolder = pane.addFolder({ title: "Text" });

textFolder
  .addBinding(tweakPaneDebug.textGeometry, "size", {
    min: 0.1,
    max: 5,
    step: 0.1,
  })
  .on("change", changeTextGeometry);

textFolder
  .addBinding(tweakPaneDebug.textGeometry, "height", {
    min: 0.1,
    max: 2,
    step: 0.1,
  })
  .on("change", changeTextGeometry);

textFolder
  .addBinding(tweakPaneDebug.textGeometry, "curveSegments", {
    min: 1,
    max: 20,
    step: 1,
  })
  .on("change", changeTextGeometry);

// Ajout d'un sous-folder pour les propriétés du bevel
const bevelFolder = textFolder.addFolder({ title: "Bevel" });

bevelFolder
  .addBinding(tweakPaneDebug.textGeometry, "bevelEnabled")
  .on("change", changeTextGeometry);

bevelFolder
  .addBinding(tweakPaneDebug.textGeometry, "bevelThickness", {
    min: 0.01,
    max: 0.1,
    step: 0.01,
  })
  .on("change", changeTextGeometry);

bevelFolder
  .addBinding(tweakPaneDebug.textGeometry, "bevelSize", {
    min: 0.01,
    max: 0.1,
    step: 0.01,
  })
  .on("change", changeTextGeometry);

bevelFolder
  .addBinding(tweakPaneDebug.textGeometry, "bevelSegments", {
    min: 1,
    max: 10,
    step: 1,
  })
  .on("change", changeTextGeometry);

//Helper
//const helper = new THREE.AxesHelper();
//scene.add(helper);

/**
 * Donuts
 */
const donutGeometry = new THREE.TorusGeometry(0.1, 0.05, 20, 45);

// Donuts array
const donuts = [];

Array.from({ length: 400 }).forEach(() => {
  const donut = new THREE.Mesh(donutGeometry, matCapMaterial);
  donut.position.x = (Math.random() - 0.5) * 20;
  donut.position.y = (Math.random() - 0.5) * 20;
  donut.position.z = (Math.random() - 0.5) * 20;

  const scale = Math.random() * 0.8 + 0.2; // Valeur aléatoire entre 0.2 et 1
  console.log(scale);

  donut.scale.set(scale, scale, scale);

  scene.add(donut);
  donuts.push(donut);
});

/**
 * Sizes
 */
const sizes = {
  width: container.clientWidth,
  height: container.clientHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = container.clientWidth;
  sizes.height = container.clientHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({ antialias: true });
container.append(renderer.domElement);
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

/**
 * Animate
 */
const clock = new THREE.Clock();
let previousTime = 0;

const animationFolder = pane.addFolder({ title: "Animation" });
animationFolder.addBinding(tweakPaneDebug.animation, "positionIndicatorLimit", {
  min: 0.001,
  max: 0.01,
  step: 0.0001,
});
animationFolder.addBinding(tweakPaneDebug.animation, "rotationSpeedLimit", {
  min: 0.001,
  max: 1,
  step: 0.0001,
});

// Calcul de l'offset pour chaque donut
const calculOffset = (index: number) => {
  return (index * Math.PI * 2) / donuts.length;
};

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const delta = elapsedTime - previousTime;

  // Update donuts
  donuts.forEach((donut, index) => {
    // Crée un décalage unique pour chaque donut en divisant le cercle (2π) par le nombre de donuts
    // Cela permet d'espacer uniformément les donuts sur un cercle complet
    // L'index est utilisé pour créer un décalage unique pour chaque donut
    // Comme nous avons plusieurs donuts, chaque donut aura une position différente sur le cercle
    // Par exemple, avec 4 donuts:
    // - Le premier donut (index 0) aura un offset de 0
    // - Le deuxième (index 1) aura un offset de PI/2 (90 degrés)
    // - Le troisième (index 2) aura un offset de PI (180 degrés)
    // - Le quatrième (index 3) aura un offset de 3PI/2 (270 degrés)
    const offset = calculOffset(index);

    // Position
    donut.position.x =
      donut.position.x +
      Math.sin(elapsedTime + offset) *
        tweakPaneDebug.animation.positionIndicatorLimit;
    donut.position.y =
      donut.position.y +
      Math.cos(elapsedTime + offset) *
        tweakPaneDebug.animation.positionIndicatorLimit;
    donut.position.z =
      donut.position.z +
      Math.sin(elapsedTime + offset * 2) *
        tweakPaneDebug.animation.positionIndicatorLimit;

    // Rotation

    const rotation =
      offset * Math.PI * delta * tweakPaneDebug.animation.rotationSpeedLimit;
    donut.rotation.set(rotation, rotation, 0);
  });

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
