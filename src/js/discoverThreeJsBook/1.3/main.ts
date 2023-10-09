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
  titlePage: "Introducing the world app",
  titleHeader: "1.3 - Introducing the world app",
  originalLesson: "https://discoverthreejs.com/book/first-steps/world-app//",
  lessonsList: discoveryThreeJsLessons,
});

// Get a reference to the container element that will hold our scene
const container = document.querySelector("#app") as HTMLDivElement;
