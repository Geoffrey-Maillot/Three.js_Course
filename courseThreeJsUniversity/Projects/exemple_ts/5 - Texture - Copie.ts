import * as THREE from "three";
import { OrbitControls } from "../js/examples/jsm/controls/OrbitControls.js";
import { Sky } from "../js/examples/jsm/objects/Sky.js";

/*
 * 	--------------------------------------------------------------------------------
 *
 *	-------------------------------- GLOBAL VARIABLES --------------------------------
 *
 *	--------------------------------------------------------------------------------
 */

// Basic Threejs variables
var scene;
var camera;
var renderer;
var clock;

// Game objs
var cube; // ThreeJS Mesh	- Sword

//SKY - variables used with Sky Shader
var sky, sun;

function initSky() {
  // Add Sky
  sky = new Sky();
  sky.scale.setScalar(450000);
  scene.add(sky);

  sun = new THREE.Vector3();
  // SKY OPTIONS
  const effectController = {
    turbidity: 10,
    rayleigh: 3,
    mieCoefficient: 0.005,
    mieDirectionalG: 0.7,
    elevation: 2,
    azimuth: 45,
    exposure: renderer.toneMappingExposure,
  };

  const uniforms = sky.material.uniforms;
  uniforms["turbidity"].value = effectController.turbidity;
  uniforms["rayleigh"].value = effectController.rayleigh;
  uniforms["mieCoefficient"].value = effectController.mieCoefficient;
  uniforms["mieDirectionalG"].value = effectController.mieDirectionalG;

  const phi = THREE.MathUtils.degToRad(90 - effectController.elevation);
  const theta = THREE.MathUtils.degToRad(effectController.azimuth);

  sun.setFromSphericalCoords(1, phi, theta);

  uniforms["sunPosition"].value.copy(sun);

  renderer.toneMappingExposure = effectController.exposure;
  renderer.render(scene, camera);
}

function init() {
  clock = new THREE.Clock();
  scene = new THREE.Scene();

  // ---------------- RENDERER ----------------

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
  const bodyElement = document.querySelector("body") as HTMLBodyElement;
  bodyElement.appendChild(renderer.domElement); // we add the HTML element to the HTML page

  // ---------------- CAMERA ----------------

  camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    1,
    10000,
  );
  camera.position.set(-5, 2, -5);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  scene.add(camera);

  // ---------------- CAMERA CONTROLS ----------------

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.update();

  // ---------------- WHITE GRID HELPER ----------------

  var helper = new THREE.GridHelper(10, 2, 0xffffff, 0xffffff);
  helper.position.y = -2;
  scene.add(helper);

  // ---------------- LIGHTS ----------------

  var ambientLight = new THREE.AmbientLight(0xcccccc, 2);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
  directionalLight.position.set(-1, 1, 1);
  scene.add(directionalLight);

  // ---------------- CALLING LOADING AND INIT FUNCTIONS ----------------

  initSky();
  InitMap();

  // ---------------- EVENTS ----------------

  window.addEventListener("resize", onWindowResize, false);

  // ---------------- STARTING THE GAME MAIN LOOP ----------------

  render();
}

function render() {
  var delta = clock.getDelta(); //get delta time between two frames
  var elapsed = clock.elapsedTime; //get elapsed time

  renderer.render(scene, camera); // We are rendering the 3D world
  requestAnimationFrame(render); // we are calling render() again,  to loop
}

function InitMap() {
  var loader = new THREE.TextureLoader();

  loader.load("Assets/pixel_art_border.png", (loaded_texture) => {
    loaded_texture.magFilter = THREE.NearestFilter;

    const material = new THREE.MeshLambertMaterial({
      map: loaded_texture,
    });

    loaded_texture.wrapS = THREE.RepeatWrapping;
    loaded_texture.wrapT = THREE.RepeatWrapping;

    loaded_texture.repeat.set(2, 2);

    const geometry = new THREE.BoxGeometry(2, 2, 2);
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
  });
}

/*
 * 	##################
 *
 *	 	FUNCTION ONWINDOWRESIZE()
 *		This function is called when the window is resized, update the camera projection to fit the new size
 *
 *	##################
 */
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
