/**
 * Config page
 */
import { initPage } from "../../initPage";
import { discoveryThreeJsLessons } from "../../../constant/index";

initPage({
  titlePage: "Load 3D Models in glTF Format",
  titleHeader: "1.13 - Load 3D Models in glTF Format",
  originalLesson: "Load 3D Models in glTF Format",
  lessonsList: discoveryThreeJsLessons,
});

/**
 * Three.js
 */
import { World } from "./world/World";

const getDomElement = () => {
  const container = document.getElementById("app") as HTMLDivElement;
  const btnSwitch = document.getElementById("btn-switch") as HTMLButtonElement;
  const btnCam = document.getElementById("btn-cam") as HTMLButtonElement;
  return { container, btnSwitch, btnCam } as const;
};

// Create in
async function startWorld() {
  // Get Dom Element
  const { container, btnSwitch, btnCam } = getDomElement();

  // Create instante of the World app
  const world = new World(container);

  // add listenners
  btnSwitch.addEventListener("click", world.switchTarget);
  btnCam.addEventListener('click', world.animeCamera)

  // complete async tasks
  await world.init();

  // start the animation loop
  world.start();
}

function init() {
  try {
    startWorld();
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", init);
