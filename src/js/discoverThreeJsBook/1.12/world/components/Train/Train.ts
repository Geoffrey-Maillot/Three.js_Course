import { Group, MathUtils } from "three";
import { createMeshes } from "./meshes";

export class Train extends Group {
  private meshes: ReturnType<typeof createMeshes>;
  private updatables: Array<(data: number) => void>;
  private wheelSpeed = MathUtils.degToRad(48);

  constructor(updatables: Array<(data: number) => void>) {
    super();
    this.updatables = updatables;
    this.meshes = createMeshes();

    this.add(
      this.meshes.cabinFloor,
      this.meshes.cabinRoof,
      this.meshes.nose,
      this.meshes.chimney,
      this.meshes.smallWheelCenter,
      this.meshes.smallWheelFront,
      this.meshes.smallWheelRear,
      this.meshes.bigWheel,
      this.meshes.cabinRightWall,
      this.meshes.cabinLeftWall,
      this.meshes.cabinLeftDoor,
      this.meshes.cabinRightDoor,
      this.meshes.cabinFontWall,
      this.meshes.handleDoorLeft,
      this.meshes.handleDoorRight,
      this.meshes.hingeLeftBottom,
      this.meshes.hingeLeftTop,
      this.meshes.hingeRightBottom,
      this.meshes.hingeRightTop,
      this.meshes.pillarLeftBack,
      this.meshes.pillarLeftFront,
      this.meshes.pillarRightBack,
      this.meshes.pillarRightFront,
    );

    this.animate();
  }

  animationWheels = (delta: number) => {
    this.meshes.bigWheel.rotation.y += this.wheelSpeed * delta;
    this.meshes.smallWheelCenter.rotation.y += this.wheelSpeed * delta;
    this.meshes.smallWheelFront.rotation.y += this.wheelSpeed * delta;
    this.meshes.smallWheelRear.rotation.y += this.wheelSpeed * delta;
  };

  animate = () => {
    this.updatables.push(this.animationWheels);
  };
}
