/**
 * Config page
 */
import { initPage } from "../../initPage";
import { discoveryThreeJsLessons } from "../../../constant/index";

initPage({
  titlePage: "Extends Three.js with a camera controls plugin",
  titleHeader: "1.9 - Extends Three.js with a camera controls plugin",
  originalLesson:
    "https://discoverthreejs.com/book/first-steps/camera-controls/",
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
