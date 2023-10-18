/**
 * Config page
 */

import { initPage } from "../../initPage";
import { discoveryThreeJsLessons } from "../../../constant/index";

initPage({
  titlePage: "Ambient lighting : Illumination from every direction",
  titleHeader: "1.10 - Ambient lighting : Illumination from every direction",
  originalLesson:
    "https://discoverthreejs.com/book/first-steps/ambient-lighting/",
  lessonsList: discoveryThreeJsLessons,
});

/**
 * Three.js
 */
import { World } from "./world/World";

// Create in
function init() {
  // Get the container element
  const container = document.getElementById("app") as HTMLDivElement;

  // Create instante of the World app
  const world = new World(container);

  // start the animation loop
  world.start();

  // Render the scene
  world.render();
}

document.addEventListener("DOMContentLoaded", init);
