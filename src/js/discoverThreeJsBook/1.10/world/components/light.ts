import {
  DirectionalLight,
  AmbientLight,
  HemisphereLight,
  PointLight,
  DirectionalLightHelper,
} from "three";

function createLights() {
  // create a directional light
  const mainLight = new DirectionalLight("white", 5);

  // create an ambient light
  //const ambientLight = new AmbientLight("white", 0.1);

  //create an hemisphere light
  const ambientLight = new HemisphereLight("white", "darkslategrey", 3);

  // move the light right, up, and towards us
  //mainLight.position.set(10, 10, 10);

  return { mainLight, ambientLight };
}

export { createLights };
