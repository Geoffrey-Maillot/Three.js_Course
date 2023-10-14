/**
 * Config page
 */
import { initPage } from "../../initPage";
import { discoveryThreeJsLessons } from "../../../constant/index";

initPage({
  titlePage: "The animation loop",
  titleHeader: "1.7 - The animation loop",
  originalLesson:
    "https://discoverthreejs.com/book/first-steps/animation-loop/",
  lessonsList: discoveryThreeJsLessons,
});

/**
 * Three.js
 */
import { World } from "./world/World";

const startStopWorld = (start: boolean, world: World) => {
  start ? world.start() : world.stop();
};

// Create in
function init() {
  // Get the container element
  const container = document.getElementById("app") as HTMLDivElement;
  const inputElement = document.getElementById(
    "animation-all",
  ) as HTMLInputElement;

  inputElement.addEventListener("change", (e) => {
    const checked = (e.target as HTMLInputElement).checked;
    startStopWorld(checked, world);
  });

  // Create instante of the World app
  const world = new World(container);

  // start the animation loop
  world.start();

  // Render the scene
  world.render();
}

document.addEventListener("DOMContentLoaded", init);
