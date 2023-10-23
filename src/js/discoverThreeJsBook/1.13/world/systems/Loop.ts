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

  animation() {
    this.tick();

    this.renderer.render(this.scene, this.camera);
  }

  start() {
    // tell every animated object to tick forward one frame

    // On démare / redémare le compteur
    clock.start();

    this.renderer.setAnimationLoop(() => this.animation());
  }

  stop() {
    this.renderer.setAnimationLoop(null);

    // Il faut aussi stoper le compteur
    clock.stop();
  }

  tick() {
    // getDelta retourne le temps depuis la dernière fois ou il a été appellé
    // Si on est sur un écran 60hz; environ tous les 16 centième. Sur un 240hz environ tous les 4 centième (60 hz en 1s / 240hz en 1s)
    // On multiplie ce temps par la distance / angle / pourcentage que l'on veut parcourir en 60 seconde

    const delta = clock.getDelta();

    this.updatables.forEach((tick) => tick(delta));
  }
}

export { Loop };
