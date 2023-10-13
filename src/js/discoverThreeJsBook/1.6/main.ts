/**
 * Config page
 */

import { initPage } from "../../initPage";
import { discoveryThreeJsLessons } from "../../../constant/index";

initPage({
  titlePage: "Making our scenes responsive (and also dealing with jaggies)",
  titleHeader:
    "1.6 - Making our scenes responsive (and also dealing with jaggies)",
  originalLesson:
    "https://discoverthreejs.com/book/first-steps/responsive-design/",
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

  // Render the scene
  world.render();
}

document.addEventListener("DOMContentLoaded", init);
