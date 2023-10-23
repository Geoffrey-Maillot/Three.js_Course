import { Raycaster, Vector2, PerspectiveCamera, Mesh, Scene } from "three";

export const createRaycaster = (
  camera: PerspectiveCamera,
  scene: Scene,
  setTarget: (target: Mesh) => void,
) => {
  const raycaster = new Raycaster();
  const mouse = new Vector2(0, 0);

  const setRaycaster = () => {
    raycaster.setFromCamera(mouse, camera);
    const mesh = raycaster.intersectObjects(scene.children);

    if (mesh[0]?.object.type === "Mesh") {
      setTarget(mesh[0].object as Mesh);
    }
  };

  const onMouseClick = (event) => {
    setRaycaster();
  };
  const onMouseMove = (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  };

  // add events listeners
  window.addEventListener("click", onMouseClick, false);
  window.addEventListener("mousemove", onMouseMove, false);
};
