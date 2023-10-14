import { createCamera } from "./components/camera";
import { createScene } from "./components/scene";
import { createLights } from "./components/light";

import { createCubeRotate } from "./components/cubeRotate";

import { createRenderer } from "./systems/renderer";
import { Resizer } from "./systems/Resizer";
import { Loop } from "./systems/Loop";

class World {
  private camera;
  private renderer;
  private scene;
  private loop;
  // 1. Create instance of the world app
  constructor(container: HTMLDivElement) {
    this.camera = createCamera();
    this.renderer = createRenderer();
    this.scene = createScene();
    this.loop = new Loop(this.camera, this.scene, this.renderer);

    container.append(this.renderer.domElement);

    const { cubeRotate } = createCubeRotate(this.loop.updatables);

    const light = createLights();

    this.scene.add(cubeRotate, light);

    new Resizer(container, this.camera, this.renderer);
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
