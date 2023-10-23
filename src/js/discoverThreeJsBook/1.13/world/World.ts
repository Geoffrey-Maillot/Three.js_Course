import { TWEEN } from "@tweenjs/tween.js";
import {
  Object3D,
  Object3DEventMap,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from "three";

import { createCamera } from "./components/camera";
import { createScene } from "./components/scene";
import { createLights } from "./components/light";
import { loadBirds } from "./components/loadBirds";

import { createRenderer } from "./systems/renderer";
import { Resizer } from "./systems/Resizer";
import { Loop } from "./systems/Loop";
import { createControls } from "./systems/controls";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { Tween } from "three/examples/jsm/libs/tween.module.js";

class World {
  private camera: PerspectiveCamera;
  private renderer: WebGLRenderer;
  private scene: Scene;
  private loop: Loop;
  private controls: OrbitControls;

  private birds: Array<Object3D<Object3DEventMap>> = [];
  private currentBirds: number = 0;
  private tweenSwitchTarget: TWEEN;
  private positionCamera: Vector3 = new Vector3(-6, 6, 20);
  private tweenInitCam: TWEEN;

  // 1. Create instance of the world app
  constructor(container: HTMLDivElement) {
    this.camera = createCamera();
    this.renderer = createRenderer();
    this.scene = createScene();
    this.loop = new Loop(this.camera, this.scene, this.renderer);

    container.append(this.renderer.domElement);

    // Light
    const { mainLight, ambientLight } = createLights();

    // En instanciant le Control la camera est maintenant géré par celui ci
    this.controls = createControls(
      this.camera,
      this.renderer.domElement,
      this.loop.updatables,
    );

    this.scene.add(mainLight, ambientLight);

    this.loop.updatables.push(() => this.tweenSwitchTarget?.update());
    this.loop.updatables.push(() => this.tweenInitCam?.update());

    new Resizer(container, this.camera, this.renderer);
  }

  async init() {
    const { parrot, flaming, stork } = await loadBirds();

    this.birds.push(...[parrot, flaming, stork]);

    this.scene.add(parrot, flaming, stork);

    // move the target to the center of the front bird
    this.controls.target.copy(this.birds[this.currentBirds].position);
  }

  // Render the scene
  render() {
    this.renderer.render(this.scene, this.camera);
  }

  start() {
    this.loop.start();
  }

  stop() {
    this.loop.stop();
  }

  switchTarget = () => {
    this.currentBirds = (this.currentBirds + 1) % this.birds.length; // loop in the array of birds

    this.tweenSwitchTarget = new Tween(this.controls.target, false)
      .to(this.birds[this.currentBirds].position, 500)
      .start();
  };

  animeCamera = () => {
    this.controls.enabled = false;
    this.tweenInitCam = new Tween(this.camera.position, false)
      .to(this.positionCamera, 1 * 1000)
      .start()
      .onComplete(() => {
        this.controls.enabled = true;
      });
  };
}

export { World };
