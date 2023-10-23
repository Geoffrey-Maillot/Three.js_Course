import { setupModel } from "../utils/setupModel";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export async function loadBirds(updatables: Array<(delta: number) => void>) {
  const loader = new GLTFLoader();

  const [parrotData, flamingoData, storkData] = await Promise.all([
    loader.loadAsync("/src/js/discoverThreeJsBook/assets/models/Parrot.glb"),
    loader.loadAsync("/src/js/discoverThreeJsBook/assets/models/Flamingo.glb"),
    loader.loadAsync("/src/js/discoverThreeJsBook/assets/models/Stork.glb"),
  ]);

  const parrot = setupModel(parrotData, updatables);

  const flaming = setupModel(flamingoData, updatables);
  flaming.position.set(4, 0, -4);

  const stork = setupModel(storkData, updatables);
  stork.position.set(-3, 0, -4);

  return { parrot, flaming, stork };
}
