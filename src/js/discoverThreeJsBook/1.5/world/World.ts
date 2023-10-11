import { createCamera } from "./components/camera";
import { createBasictCube, createStandartCube } from "./components/cube";
import { createScene } from "./components/scene";
import { createLights } from "./components/light";

import { createRenderer } from "./systems/renderer";
import { Resizer } from "./systems/Resizer";

class World {
  private camera;
  private renderer;
  private scene;
  // 1. Create instance of the world app
  constructor(container: HTMLDivElement) {
    this.camera = createCamera();
    this.renderer = createRenderer();
    this.scene = createScene();

    container.append(this.renderer.domElement);

    const basicCube = createBasictCube();
    const standartCube = createStandartCube();
    const light = createLights();

    this.scene.add(basicCube, standartCube, light);

    new Resizer(container, this.camera, this.renderer);
  }

  // Render the scene
  render() {
    this.renderer.render(this.scene, this.camera);
  }
}

export { World };
