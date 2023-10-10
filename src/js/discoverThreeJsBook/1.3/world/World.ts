import { createCamera } from "./components/camera.js";
import { createCube } from "./components/cube.js";
import { createScene } from "./components/scene.js";

import { createRenderer } from "./systems/renderer.js";
import { Resizer } from "./systems/Resizer.js";

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

    const cube = createCube();

    this.scene.add(cube);

    new Resizer(container, this.camera, this.renderer);
  }

  // Render the scene
  render() {
    this.renderer.render(this.scene, this.camera);
  }
}

export { World };
