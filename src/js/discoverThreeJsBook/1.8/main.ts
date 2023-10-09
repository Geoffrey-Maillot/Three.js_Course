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
  titlePage: "A brief introduction to texture mapping",
  titleHeader: "1.8 - A brief introduction to texture mapping",
  originalLesson:
    "https://discoverthreejs.com/book/first-steps/textures-intro/",
  lessonsList: discoveryThreeJsLessons,
});

// Get a reference to the container element that will hold our scene
const container = document.querySelector("#app") as HTMLDivElement;
