import { Clock, PerspectiveCamera, Scene, WebGLRenderer } from "three";

const clock = new Clock();

class Loop {
  private camera;
  private scene;
  private renderer;
  public updatables: Array<(delta: number) => void> = [];

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
    const delta = clock.getDelta();

    this.updatables.forEach((tick) => tick(delta));
  }
}

export { Loop };
