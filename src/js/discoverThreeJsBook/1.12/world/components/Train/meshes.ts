import { Mesh } from "three";

import { createGeometries } from "./geometries";
import { createMaterials } from "./materials";
import { degToRad } from "three/src/math/MathUtils.js";

export const createMeshes = () => {
  const geometries = createGeometries();
  const materials = createMaterials();

  // cabin
  const cabinFloor = new Mesh(geometries.cabinFloor, materials.body);
  cabinFloor.position.set(1.5, 0.8, 0);

  const cabinRoof = new Mesh(geometries.cabinRoof, materials.body);
  cabinRoof.position.set(1.5, 2.6, 0);

  const cabinRightWall = new Mesh(geometries.cabinWall, materials.body);
  cabinRightWall.position.set(1.5, 1.7, -0.65);

  const cabinLeftWall = cabinRightWall.clone();
  cabinLeftWall.position.z = 0.65;

  const cabinFontWall = new Mesh(geometries.cabinWallFront, materials.body);
  cabinFontWall.position.set(0.6, 1.7, 0);

  const cabinRightDoor = new Mesh(geometries.cabinDoor, materials.body);
  cabinRightDoor.position.set(2.44, 1.6, 0.29);

  const cabinLeftDoor = cabinRightDoor.clone();
  cabinLeftDoor.position.z = -0.29;

  const handleDoorRight = new Mesh(geometries.handle, materials.detail);
  handleDoorRight.position.set(2.54, 1.6, -0.1);

  const handleDoorLeft = handleDoorRight.clone();
  handleDoorLeft.position.z = 0.1;

  const hingeRightTop = new Mesh(geometries.hinge, materials.detail);
  hingeRightTop.position.set(2.5, 1.75, -0.55);

  const hingeRightBottom = hingeRightTop.clone();
  hingeRightBottom.position.y = 1.45;

  const hingeLeftTop = hingeRightTop.clone();
  hingeLeftTop.position.z = 0.55;

  const hingeLeftBottom = hingeRightTop.clone();
  hingeLeftBottom.position.z = 0.55;
  hingeLeftBottom.position.y = 1.45;

  const pillarRightFront = new Mesh(geometries.cabinPillar, materials.detail);
  pillarRightFront.position.set(0.6, 2.3, -0.65);

  const pillarRightBack = pillarRightFront.clone();
  pillarRightBack.position.x = 2.4;

  const pillarLeftFront = pillarRightFront.clone();
  pillarLeftFront.position.z = 0.65;

  const pillarLeftBack = pillarRightFront.clone();
  pillarLeftBack.position.z = 0.65;
  pillarLeftBack.position.x = 2.4;

  // chimney
  const chimney = new Mesh(geometries.chimney, materials.detail);
  chimney.position.set(-2, 1.9, 0);

  // nose
  const nose = new Mesh(geometries.nose, materials.body);
  nose.position.set(-1, 1, 0);
  nose.rotation.z = degToRad(90); // ou Math.Pi / 2

  // whells
  const smallWheelRear = new Mesh(geometries.wheel, materials.detail);
  smallWheelRear.position.y = 0.5;
  smallWheelRear.rotation.x = degToRad(90); //ou Math.Pi / 2

  const smallWheelCenter = smallWheelRear.clone();
  smallWheelCenter.position.x = -1;

  const smallWheelFront = smallWheelRear.clone();
  smallWheelFront.position.x = -2;

  const bigWheel = smallWheelRear.clone();
  bigWheel.position.set(1.5, 0.7, 0);
  bigWheel.scale.set(1.5, 1.25, 1.5);

  return {
    cabinFloor,
    cabinRoof,
    cabinRightWall,
    cabinLeftWall,
    cabinFontWall,
    cabinRightDoor,
    cabinLeftDoor,
    handleDoorRight,
    handleDoorLeft,
    hingeRightTop,
    hingeLeftBottom,
    hingeLeftTop,
    hingeRightBottom,
    pillarRightFront,
    pillarLeftBack,
    pillarLeftFront,
    pillarRightBack,
    chimney,
    nose,
    smallWheelCenter,
    smallWheelRear,
    smallWheelFront,
    bigWheel,
  };
};
