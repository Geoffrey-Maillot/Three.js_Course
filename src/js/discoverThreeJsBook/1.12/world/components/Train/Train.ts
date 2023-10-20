import { Group } from "three";
import { createMeshes } from "./meshes";

export class Train extends Group {
  private meshes: ReturnType<typeof createMeshes>;
  constructor() {
    super();

    this.meshes = createMeshes();

    this.add(this.meshes.cabin, this.meshes.nose, this.meshes.chimney);
  }
}
