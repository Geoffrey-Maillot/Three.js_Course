import { Clock, PerspectiveCamera, Scene, WebGLRenderer } from "three";

class Loop {
  private camera;
  private scene;
  private renderer;
  public updatables: Array<() => void> = [];

  constructor(
    camera: PerspectiveCamera,
    scene: Scene,
    renderer: WebGLRenderer,
  ) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
  }

  start() {
    // tell every animated object to tick forward one frame
    this.renderer.setAnimationLoop(() => {
      this.tick();
      this.renderer.render(this.scene, this.camera);
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  tick() {
    this.updatables.forEach((tick) => tick());
  }
}

export { Loop };
