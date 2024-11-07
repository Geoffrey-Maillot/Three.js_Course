import * as THREE from "three";
import { initPage } from "../../initPage";
import { threeJsJourneyLessons } from "../../../constant/index";

initPage({
  titlePage: "Transform Object",
  titleHeader: "04 - Transform Object",
  originalLesson: "https://threejs-journey.com/lessons/transform-objects",
  lessonsList: threeJsJourneyLessons,
});

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cube1 = new THREE.Mesh(geometry, material);

// Position
cube1.position.set(0, 0, 0);

// Helpers
const axesHelper = new THREE.AxesHelper(2);
cube1.add(axesHelper);

// Scale
// cube1.scale.x = 2;
// cube1.scale.y = 1;
// cube1.scale.z = 0.5;
//cube1.scale.set(2, 1, 0.5);

// Rotation
cube1.rotation.reorder("YXZ");
// cube1.rotation.x = Math.PI * 0.25;
// cube1.rotation.y = Math.PI * 0.25;
// cube1.rotation.z = Math.PI * 0.25;
//cube1.rotation.set(Math.PI * 0.25, Math.PI * 0.25, Math.PI * 0.25);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
);
cube2.position.set(-1.5, 0, 0);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x0000ff }),
);
cube3.position.set(1.5, 0, 0);

//Group
const group = new THREE.Group();
scene.add(group);

group.add(cube1);
group.add(cube2);
group.add(cube3);

group.position.y = 1.5;

// Camera
const sizes = {
  width: 800,
  height: 600,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.set(0, 0, 5);
scene.add(camera);

// LookAt
//camera.lookAt(group.position);

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);
