import { PerspectiveCamera, WebGLRenderer } from "three";

const setSise = (
  container: HTMLDivElement,
  camera: PerspectiveCamera,
  renderer: WebGLRenderer,
) => {
  // set the camera's aspect ratio
  camera.aspect = container.clientWidth / container.clientHeight;

  // we change camera settings so e have to update the camera's frustum
  camera.updateProjectionMatrix();

  // update the size of the renderer AND the canvas
  renderer.setSize(container.clientWidth, container.clientHeight);

  // set the pixel ratio (for mobile devices)
  renderer.setPixelRatio(window.devicePixelRatio);
};

class Resizer {
  public onResize: () => void;
  constructor(
    container: HTMLDivElement,
    camera: PerspectiveCamera,
    renderer: WebGLRenderer,
  ) {
    this.onResize = () => {
      return;
    };
    // Set the size of Camera and Canvas
    setSise(container, camera, renderer);

    // The size must be recalculate and the window size change
    window.addEventListener("resize", () => {
      setSise(container, camera, renderer);
      this.onResize();
    });
  }
}

export { Resizer };
