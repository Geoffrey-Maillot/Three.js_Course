import { setupModel } from "../utils/setupModel";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export async function loadBirds() {
  const loader = new GLTFLoader();

  const [parrotData, flamingoData, storkData] = await Promise.all([
    loader.loadAsync("/src/assets/models/Parrot.glb"),
    loader.loadAsync("/src/assets/models/Flamingo.glb"),
    loader.loadAsync("/src/assets/models/Stork.glb"),
  ]);

  const parrot = setupModel(parrotData);

  const flaming = setupModel(flamingoData);
  flaming.position.set(4, 0, -4);

  const stork = setupModel(storkData);
  stork.position.set(-3, 0, -4);

  return { parrot, flaming, stork };
}
