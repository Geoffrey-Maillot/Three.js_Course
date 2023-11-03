class Raycast {
  private raycaster: Raycaster;
  private camera: PerspectiveCamera | OrthographicCamera; // Ajouter des types camera selon le besoin
  private pointer = new Vector2();
  private objectList: any = [];
  private _selectedObject: any;
  private event: (_selectedObject) => void;
  constructor(objectList, camera, event?) {
    this.objectList = objectList;
    this.camera = camera;
    this.event = event;

    this.raycaster = new Raycaster();
    // Au choix selon le besoin
    window.addEventListener("mousemove", (e) => this.onMouseMove(e), false);
    // window.addEventListener("click", () => this.onMouseMove, false);
  }

  onMouseMove(e: MouseEvent) {
    this.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.pointer, this.camera);

    const intersects = this.raycaster.intersectObjects(this.objectList);

    if (intersects.length > 0) {
      this._selectedObject = intersects[0];
    } else {
      this._selectedObject = null;
    }

    this.event(this._selectedObject);
  }

  onMouseClick(e: MouseEvent) {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.pointer, this.camera);

    const intersects = this.raycaster.intersectObject(this.objectList);

    if (intersects.length > 0) {
      this._selectedObject = intersects[0];
    } else {
      this._selectedObject = null;
    }
    this.event(this._selectedObject);
  }

  get selectedObject() {
    return this._selectedObject;
  }
}

import {
  AmbientLight,
  AxesHelper,
  BoxGeometry,
  Clock,
  DoubleSide,
  Mesh,
  MeshPhongMaterial,
  MeshPhysicalMaterial,
  Object3D,
  Object3DEventMap,
  OrthographicCamera,
  PerspectiveCamera,
  PlaneGeometry,
  Raycaster,
  RectAreaLight,
  Scene,
  SpotLight,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "../js/examples/jsm/controls/OrbitControls.js";

import { RectAreaLightUniformsLib } from "../js/examples/jsm/lights/RectAreaLightUniformsLib.js";
import { Group } from "@tweenjs/tween.js";

var scene: Scene;
var renderer: WebGLRenderer;
var camera: PerspectiveCamera;

var group: Group;
var clock: Clock;

var controls: OrbitControls;

var MyLight: RectAreaLight;

var pointer = new Vector2();
var objectList = new Array();
var mouse_pointer_mesh: Mesh;

function init() {
  clock = new Clock();
  scene = new Scene();

  renderer = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x2c3e50, 0);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  RectAreaLightUniformsLib.init();

  // ---- CAMERA ----

  camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    40000,
  );
  camera.lookAt(new Vector3(0, 0, 0));
  scene.add(camera);

  controls = new OrbitControls(camera, renderer.domElement);

  controls.minDistance = 400;
  controls.maxDistance = 100000;
  controls.dampingFactor = 0.05;
  controls.enableDamping = true;
  controls.maxPolarAngle = Math.PI / 2 - Math.PI / 10;
  controls.enablePan = true;
  controls.enableRotate = true;
  controls.enableZoom = true;
  controls.panSpeed = 1;
  controls.rotateSpeed = 2;
  controls.zoomSpeed = 1;

  controls.update();

  camera.position.set(0, 2000, 5000);

  // --------------------------------

  const planeGeo = new PlaneGeometry(10000, 10000);
  const planeMat = new MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0,
    roughness: 1,
    clearcoat: 1,
    clearcoatRoughness: 0,
    side: DoubleSide,
  });

  const floor = new Mesh(planeGeo, planeMat);
  floor.rotation.x = Math.PI * -0.5;
  floor.receiveShadow = true;
  scene.add(floor);

  objectList.push(floor);

  var ambientLight = new AmbientLight(0xcccccc, 0.5);
  scene.add(ambientLight);

  MyLight = new RectAreaLight(0xc0392b, 4, 300000, 2000);
  MyLight.position.y = 2000;
  scene.add(MyLight);

  var MyLight2 = new RectAreaLight(0xf1c40f, 4, 300000, 2000);
  MyLight2.position.y = 4000;
  MyLight.add(MyLight2);

  var MyLight3 = new RectAreaLight(0x2980b9, 4, 300000, 2000);
  MyLight3.position.y = 8000;
  MyLight.add(MyLight3);

  var spotlight = new SpotLight(0xc0392b, 1, 20000, Math.PI / 4);
  spotlight.position.z = 2000;
  spotlight.castShadow = true;
  spotlight.shadow.mapSize.height = 2048; // default is 512
  spotlight.shadow.mapSize.width = 2048; // default is 512
  MyLight.add(spotlight);

  // --------------------------------

  var BlockGeo = new BoxGeometry(1000, 2000, 1000);

  var Geo = new BoxGeometry(2000, 2000, 2000);
  const meshMaterial = new MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.25,
    roughness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0,
  });

  var mesh = new Mesh(Geo, meshMaterial);
  mesh.position.y = 1800;
  mesh.castShadow = true;
  scene.add(mesh);

  var block1 = new Mesh(BlockGeo, meshMaterial);
  block1.position.set(4500, 1000, 4500);
  block1.castShadow = true;
  scene.add(block1);

  var block2 = new Mesh(BlockGeo, meshMaterial);
  block2.position.set(-4500, 1000, 4500);
  block2.castShadow = true;
  scene.add(block2);

  var block3 = new Mesh(BlockGeo, meshMaterial);
  block3.position.set(-4500, 1000, -4500);
  block3.castShadow = true;
  scene.add(block3);

  var block4 = new Mesh(BlockGeo, meshMaterial);
  block4.position.set(4500, 1000, -4500);
  block4.castShadow = true;
  scene.add(block4);

  objectList.push(mesh);
  objectList.push(block1);
  objectList.push(block2);
  objectList.push(block3);
  objectList.push(block4);

  const mousepointer_material = new MeshPhongMaterial({
    color: 0xff0000,
  });
  mouse_pointer_mesh = new Mesh(
    new BoxGeometry(100, 100, 100),
    mousepointer_material,
  );

  const axes = new AxesHelper(10000);
  mouse_pointer_mesh.add(axes);

  scene.add(mouse_pointer_mesh);

  const onRaycast = (selectedObject) => {
    if (!selectedObject) {
      mouse_pointer_mesh.position.set(0, 0, 0);
      return;
    }
    console.log(selectedObject);
    const { x, y, z } = selectedObject?.point;
    mouse_pointer_mesh.position.set(x, y, z);
  };
  new Raycast(objectList, camera, onRaycast);

  render();
}

function render() {
  var delta = clock.getDelta();
  var elapsed = clock.elapsedTime;

  controls.update();

  MyLight.position.x = Math.sin(elapsed) * 8000;
  MyLight.position.z = Math.cos(elapsed) * 8000;
  MyLight.position.y = Math.abs(Math.cos(elapsed / 4) * 8000) + 50;

  MyLight.lookAt(new Vector3(0, 0));

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

init();
