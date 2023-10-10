import { PerspectiveCamera, WebGLRenderer } from "three";

class Resizer {
  constructor(
    container: HTMLDivElement,
    camera: PerspectiveCamera,
    renderer: WebGLRenderer,
  ) {
    // set the camera's aspect ratio
    camera.aspect = container.clientWidth / container.clientHeight;

    // we change camera settings so e have to update the camera's frustum
    camera.updateProjectionMatrix();

    // update the size of the renderer AND the canvas
    renderer.setSize(container.clientWidth, container.clientHeight);

    // set the pixel ratio (for mobile devices)
    renderer.setPixelRatio(window.devicePixelRatio);
  }
}

export { Resizer };
