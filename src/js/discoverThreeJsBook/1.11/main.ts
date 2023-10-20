/**
 * Config page
 */
import { initPage } from "../../initPage";
import { discoveryThreeJsLessons } from "../../../constant/index";

initPage({
  titlePage: "Organizing your scenes",
  titleHeader: "1.11 - Organizing your scenes",
  originalLesson:
    "https://discoverthreejs.com/book/first-steps/organizing-with-group/",
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
