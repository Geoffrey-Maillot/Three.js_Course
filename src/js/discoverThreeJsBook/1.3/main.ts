/**
 * Config page
 */
import { initPage } from "../../initPage";
import { discoveryThreeJsLessons } from "../../../constant/index";

initPage({
  titlePage: "Introducing the world app",
  titleHeader: "1.3 - Introducing the world app",
  originalLesson: "https://discoverthreejs.com/book/first-steps/world-app//",
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
