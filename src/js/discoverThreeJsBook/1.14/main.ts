/**
 * Config page
 */

import { initPage } from "../../initPage";
import { discoveryThreeJsLessons } from "../../../constant/index";

initPage({
  titlePage: "The Three.Js animation system",
  titleHeader: "1.14 - The Three.Js animation system",
  originalLesson:
    "https://discoverthreejs.com/book/first-steps/animation-system/",
  lessonsList: discoveryThreeJsLessons,
});

/**
 * Three.js
 */
import { World } from "./world/World";

// Create in
async function startWorld() {
  // Get the container element
  const container = document.getElementById("app") as HTMLDivElement;

  // Create instante of the World app
  const world = new World(container);

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
