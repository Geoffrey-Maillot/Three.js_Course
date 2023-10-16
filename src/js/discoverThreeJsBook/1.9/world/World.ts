import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Mesh,
  Raycaster,
} from "three";

import { createCamera } from "./components/camera";
import { createScene } from "./components/scene";
import { createLights } from "./components/light";

import { createCube } from "./components/cube";
import { createCube2 } from "./components/cube2";

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

    // Meshs
    const { cube } = createCube(this.loop.updatables);
    const { cube2 } = createCube2(this.loop.updatables);

    // Light
    const light = createLights();

    // En instanciant le Control la camera est maintenant géré par celui ci
    const { setTarget } = createControls(
      this.camera,
      this.renderer.domElement,
      this.loop.updatables,
    );

    this.scene.add(cube, cube2, light);

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
