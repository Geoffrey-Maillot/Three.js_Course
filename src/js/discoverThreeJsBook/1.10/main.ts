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
  titlePage: "Ambient lighting : Illumination from every direction",
  titleHeader: "1.10 - Ambient lighting : Illumination from every direction",
  originalLesson: "https://discoverthreejs.com/book/first-steps/ambient-lighting/",
  lessonsList: discoveryThreeJsLessons,
});

// Get a reference to the container element that will hold our scene
const container = document.querySelector("#app") as HTMLDivElement;
