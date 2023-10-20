import { PerspectiveCamera, Scene, WebGLRenderer } from "three";

import { createAxesHelper, createGridHelper } from "./components/helpers";

import { createCamera } from "./components/camera";
import { createScene } from "./components/scene";
import { createLights } from "./components/light";

import { Train } from "./components/Train/Train";

import { createRenderer } from "./systems/renderer";
import { Resizer } from "./systems/Resizer";
import { Loop } from "./systems/Loop";
import { createControls } from "./systems/controls";
import { createRaycaster } from "./systems/raycaster";

class World {
  private camera: PerspectiveCamera;
  private renderer: WebGLRenderer;
  private scene: Scene;
  private loop: Loop;

  // 1. Create instance of the world app
  constructor(container: HTMLDivElement) {
    this.camera = createCamera();
    this.renderer = createRenderer();
    this.scene = createScene();
    this.loop = new Loop(this.camera, this.scene, this.renderer);

    container.append(this.renderer.domElement);

    const train = new Train();

    // create helpers
    const axeHelper = createAxesHelper();
    const gridHelper = createGridHelper();

    // Light
    const { mainLight, ambientLight } = createLights();

    // En instanciant le Control la camera est maintenant géré par celui ci
    const { setTarget } = createControls(
      this.camera,
      this.renderer.domElement,
      this.loop.updatables,
    );

    this.scene.add(axeHelper, gridHelper, mainLight, ambientLight, train);

    new Resizer(container, this.camera, this.renderer);

    //create raycaster
    createRaycaster(this.camera, this.scene, setTarget);
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
}

export { World };
