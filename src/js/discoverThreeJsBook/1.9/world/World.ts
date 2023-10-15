import { createCamera } from "./components/camera";
import { createScene } from "./components/scene";
import { createLights } from "./components/light";

import { createCubeRotate2 } from "./components/cubeRotate2";
import { createCubeRotate3 } from "./components/cubeRotate3";
import { createCubeRotate } from "./components/cubeRotate";
import { createSphere } from "./components/sphere";
import { createCone } from "./components/cone";

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
    const { cubeRotate2 } = createCubeRotate2(this.loop.updatables);
    const { cubeRotate3 } = createCubeRotate3(this.loop.updatables);
    const { sphere } = createSphere(this.loop.updatables);
    const { cone } = createCone(this.loop.updatables);

    const light = createLights();

    this.scene.add(cubeRotate, cubeRotate2, cubeRotate3, sphere, cone, light);

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
