import * as THREE from "three";
import { OrbitControls } from "../js/examples/jsm/controls/OrbitControls.js";

// Basic Threejs variables
var scene;
var camera;
var renderer;
var clock;

var particle;

function init() {
  clock = new THREE.Clock();
  scene = new THREE.Scene();

  // ---------------- RENDERER ----------------

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x353b48);
  THREE.ColorManagement.enabled = false;
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
  document.body.appendChild(renderer.domElement); // we add the HTML element to the HTML page

  // ---------------- CAMERA ----------------

  camera = new THREE.OrthographicCamera(
    window.innerWidth / -400,
    window.innerWidth / 400,
    window.innerHeight / 400,
    window.innerHeight / -400,
    -300,
    500,
  );
  camera.position.set(5, 3, 5);
  camera.lookAt(new THREE.Vector3(0, 1, 0));
  scene.add(camera);

  // ---------------- CAMERA CONTROLS ----------------

  const controls = new OrbitControls(camera, renderer.domElement);

  // ---------------- WHITE GRID HELPER ----------------

  var helper = new THREE.GridHelper(10, 2, 0xffffff, 0xffffff);
  scene.add(helper);

  // ---------------- LIGHTS ----------------

  var ambientLight = new THREE.AmbientLight(0xcccccc, 0.8);
  scene.add(ambientLight);
  // ---------------- CALLING LOADING AND INIT FUNCTIONS ----------------

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
  // ---------------- 3D WORLD OBJECTS ----------------
  //FLOOR
  const planeSize = 2;
  const loader = new THREE.TextureLoader();
  const texture = loader.load("Assets/ground1.png");
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.magFilter = THREE.NearestFilter;
  const repeats = 2;
  texture.repeat.set(repeats, repeats);

  const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
  const planeMat = new THREE.MeshPhongMaterial({
    map: texture,
    side: THREE.DoubleSide,
  });

  const mesh = new THREE.Mesh(planeGeo, planeMat);
  mesh.rotation.x = Math.PI * -0.5;
  scene.add(mesh);

  var girltexture = loader.load("Assets/girl_right.png");
  girltexture.magFilter = THREE.NearestFilter;
  var girlMaterial = new THREE.SpriteMaterial({
    map: girltexture,
  });

  var girlSprite = new THREE.Sprite(girlMaterial);
  girlSprite.position.set(0, 0.5, 0);
  girlSprite.scale.set(1, 1.25, 1);
  scene.add(girlSprite);
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
