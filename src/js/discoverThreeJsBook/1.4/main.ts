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
  titlePage: "Physically based rendering and lighting",
  titleHeader: "1.4 - Physically based rendering and lighting",
  originalLesson:
    "https://discoverthreejs.com/book/first-steps/physically-based-rendering/",
  lessonsList: discoveryThreeJsLessons,
});

// Get a reference to the container element that will hold our scene
const container = document.querySelector("#app") as HTMLDivElement;
