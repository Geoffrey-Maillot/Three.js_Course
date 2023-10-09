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
  titlePage: "Making our scenes responsive (and also dealing with jaggies)",
  titleHeader:
    "1.6 - Making our scenes responsive (and also dealing with jaggies)",
  originalLesson: "https://discoverthreejs.com/book/first-steps/responsive-design/",
  lessonsList: discoveryThreeJsLessons,
});

// Get a reference to the container element that will hold our scene
const container = document.querySelector("#app") as HTMLDivElement;
