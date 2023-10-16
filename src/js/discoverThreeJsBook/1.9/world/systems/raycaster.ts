import { Raycaster, Vector2, PerspectiveCamera, Mesh, Scene } from "three";

export const createRaycaster = (camera: PerspectiveCamera, scene: Scene) => {
  const raycaster = new Raycaster();
  const mouse = new Vector2(0, 0);
  let targetMesh: Mesh;

  const onMouseClick = (event) => {
    raycaster.setFromCamera(mouse, camera);
    const mesh = raycaster.intersectObjects(scene.children);

    console.log(mesh);

    if (mesh[0]?.object.type === "Mesh") {
      targetMesh = mesh[0].object as Mesh;
    }
  };
  const onMouseMove = (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  };
  window.addEventListener("click", onMouseClick, false);
  window.addEventListener("mousemove", onMouseMove, false);

  return targetMesh;
};
