import { AnimationMixer } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

export const setupModel = (
  data: GLTF,
  updatables: Array<(delta: number) => void>,
) => {
  // on récupère le model
  const model = data.scene.children[0];

  // on récupère l'animatioClip
  const clip = data.animations[0];

  // on instancie un mixer avec on l'associe au model
  const mixer = new AnimationMixer(model);

  // on crée les controls de l'animation
  const action = mixer.clipAction(clip);

  // On lance directement l'animation
  action.fadeIn(3).startAt(1).play();

  // Pour fonctionner, chaque mixer associé à un objet doit être placer dans la boucle de rendu
  updatables.push((delta) => mixer.update(delta));

  return model;
};
