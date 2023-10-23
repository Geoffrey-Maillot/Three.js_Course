import { PerspectiveCamera, Scene, WebGLRenderer } from "three";

import { createCamera } from "./components/camera";
import { createScene } from "./components/scene";
import { createLights } from "./components/light";
import { loadBirds } from "./components/loadBirds";

import { createRenderer } from "./systems/renderer";
import { Resizer } from "./systems/Resizer";
import { Loop } from "./systems/Loop";
import { createControls } from "./systems/controls";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

class World {
  private camera: PerspectiveCamera;
  private renderer: WebGLRenderer;
  private scene: Scene;
  private loop: Loop;
  private controls: OrbitControls;

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

    new Resizer(container, this.camera, this.renderer);
  }

  async init() {
    const { parrot, flaming, stork } = await loadBirds();

    this.scene.add(parrot, flaming, stork);

    // move the target to the center of the front bird
    this.controls.target.copy(parrot.position);
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
