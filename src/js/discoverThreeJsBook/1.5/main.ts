/**
 * Config page
 */
import { initPage } from "../../initPage";
import { discoveryThreeJsLessons } from "../../../constant/index";

initPage({
  titlePage: "Transformation and coordinate systems",
  titleHeader: "1.5 - Transformation and coordinate systems",
  originalLesson:
    "https://discoverthreejs.com/book/first-steps/transformations/",
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
