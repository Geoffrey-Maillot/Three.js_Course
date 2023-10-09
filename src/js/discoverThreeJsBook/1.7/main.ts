import {
  BoxGeometry,
  Color,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";

import { initPage } from "../../initPage";
import { discoveryThreeJsLessons } from "../../../constant/index";

initPage({
  titlePage: "The animation loop",
  titleHeader: "1.7 - The animation loop",
  originalLesson:
    "https://discoverthreejs.com/book/first-steps/animation-loop/",
  lessonsList: discoveryThreeJsLessons,
});

// Get a reference to the container element that will hold our scene
const container = document.querySelector("#app") as HTMLDivElement;
