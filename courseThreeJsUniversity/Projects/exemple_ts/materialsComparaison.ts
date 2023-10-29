import * as THREE from "three";

import { OrbitControls } from "../js/examples/jsm/controls/OrbitControls.js";

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

var light, lightHelp;

var controls;

var textureEquirec;

// Performance stats
var stats;

var is_Loaded = false;

/*
 * 	##################
 *
 *	 	FUNCTION INIT()
 *		This function is the entry point of our javascript application.
 *		This function in creating all the basic settings like scene, camera, renderer.
 *		This function is calling all the loading functions, and defining the main game render loop.
 *
 *	##################
 */
function init() {
  /*
   *
   *	We are defining the main engine variables.
   *	clock - to track elapsed time
   *	scene - where 3D objects are diplayed
   *	renderer - the threejs 3D display engine
   *	lights - to light up our scene
   *
   *	Calling the 3D models loading functions, events, and starting the render loop.
   *
   */

  clock = new THREE.Clock();
  scene = new THREE.Scene();

  // ---------------- RENDERER ----------------

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement); // we add the HTML element to the HTML page

  // ---------------- CAMERA ----------------

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1000,
    500000,
  );

  scene.add(camera);

  controls = new OrbitControls(camera, renderer.domElement);

  controls.minDistance = 2000;
  controls.maxDistance = 20000;
  controls.dampingFactor = 0.1;
  controls.enableDamping = true;
  //controls.maxPolarAngle = Math.PI / 2 - Math.PI / 16;
  controls.panSpeed = 1;
  controls.rotateSpeed = 2;
  controls.zoomSpeed = 1;
  //controls.autoRotate = true;

  controls.update();

  camera.position.set(0, 2000, 10000);

  controls.target.set(0, 2000, 0);

  // ---------------- LIGHTS ----------------

  var ambientLight = new THREE.AmbientLight(0xcccccc, 1);
  scene.add(ambientLight);

  light = new THREE.PointLight(0xcccccc, 20, 20000, 0);
  scene.add(light);

  lightHelp = new THREE.PointLightHelper(light, 800);
  scene.add(lightHelp);

  // ---------------- PERFORMANCE STATS PLUGIN ----------------

  //stats = new Stats();
  //stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
  //document.body.appendChild( stats.dom );

  // ---------------- EVENTS ----------------

  window.addEventListener("resize", onWindowResize, false);

  // ---------------- STARTING THE GAME MAIN LOOP ----------------

  render();
}

/*
 * 	##################
 *
 *	 	FUNCTION RENDER()
 *		This function is the main loop of our ThreeJS application.
 *		This function is used for all the works needed to be done every game tick.
 *
 *	##################
 */
function render() {
  var delta = clock.getDelta(); //get delta time between two frames
  var elapsed = clock.elapsedTime; //get elapsed time

  if (is_Loaded == false) {
    InitMap();
  } else {
    // Game tick tasks are there
    controls.update();

    light.position.x = Math.sin(elapsed) * 10000;
    light.position.y = Math.cos(elapsed) * 10000;
    light.position.z = 4000;

    lightHelp.update();
  }

  renderer.render(scene, camera); // We are rendering the 3D world
  requestAnimationFrame(render); // we are calling render() again,  to loop
}

/*
 * 	##################
 *
 *	 	FUNCTION INITMAP()
 *		InitMap contains all the tasks to execute only once - when the 3D models are loaded
 *
 *	##################
 */
function InitMap() {
  // Textures

  const loader = new THREE.TextureLoader();

  textureEquirec = loader.load("../Assets/warehouse360.jpg");
  textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
  textureEquirec.encoding = THREE.sRGBEncoding;

  scene.background = textureEquirec;

  var Geo = new THREE.TorusKnotGeometry(1250, 450, 128, 128);

  const meshBasic = new THREE.MeshBasicMaterial({
    color: 0xc0392b,
  });

  const meshLamb = new THREE.MeshLambertMaterial({
    color: 0x34495e,
    //emissive: 0xc0392b,
  });

  const meshPhong = new THREE.MeshPhongMaterial({
    color: 0x34495e,
    emissive: 0xc0392b,
    shininess: 100,
  });

  const meshToon = new THREE.MeshToonMaterial({
    color: 0x34495e,
    emissive: 0xc0392b,
  });

  const meshStandard = new THREE.MeshStandardMaterial({
    color: 0x34495e,
    emissive: 0xc0392b,
    metalness: 0.25,
    roughness: 0.25,
  });

  const meshPhysical = new THREE.MeshPhysicalMaterial({
    color: 0x34495e,
    emissive: 0xc0392b,
    metalness: 0.25,
    roughness: 0.25,
    clearcoat: 1,
  });

  var mesh = new THREE.Mesh(Geo, meshBasic);
  mesh.position.x = -5000;
  mesh.position.y = 5000;
  scene.add(mesh);

  var mesh2 = new THREE.Mesh(Geo, meshLamb);
  mesh2.position.x = 0;
  mesh2.position.y = 5000;
  scene.add(mesh2);

  var mesh3 = new THREE.Mesh(Geo, meshPhong);
  mesh3.position.x = 5000;
  mesh3.position.y = 5000;
  scene.add(mesh3);

  var mesh4 = new THREE.Mesh(Geo, meshToon);
  mesh4.position.x = -5000;
  scene.add(mesh4);

  var mesh5 = new THREE.Mesh(Geo, meshStandard);
  mesh5.position.x = 0;
  scene.add(mesh5);

  var mesh6 = new THREE.Mesh(Geo, meshPhysical);
  mesh6.position.x = 5000;
  scene.add(mesh6);

  var graphGeo = new THREE.PlaneGeometry(14000, 14000);
  const graphMat = new THREE.MeshBasicMaterial({
    map: loader.load("mats.png"),
    transparent: true,
  });

  var meshGraph = new THREE.Mesh(graphGeo, graphMat);
  meshGraph.position.y = 2250;
  meshGraph.position.x = 250;
  scene.add(meshGraph);

  is_Loaded = true;
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
