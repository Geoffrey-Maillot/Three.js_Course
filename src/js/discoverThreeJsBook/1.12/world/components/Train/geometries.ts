import { BoxGeometry, CylinderGeometry, SphereGeometry } from "three";

export const createGeometries = () => {
  //const cabin = new BoxGeometry(2, 2.25, 1.5);

  const cabinFloor = new BoxGeometry(2, 1.1, 1.5);
  const cabinRoof = new BoxGeometry(2, 0.2, 1.5);
  const cabinWall = new BoxGeometry(2, 0.8, 0.2);
  const cabinWallFront = new BoxGeometry(0.2, 0.8, 1.2);
  const cabinDoor = new BoxGeometry(0.1, 0.5, 0.55);
  const cabinPillar = new BoxGeometry(0.2, 0.4, 0.2);
  const handle = new SphereGeometry(0.05);
  const hinge = new CylinderGeometry(0.01, 0.01, 0.12);

  const nose = new CylinderGeometry(0.75, 0.75, 3, 12);

  // we can reuse a single cylinder geometry for all 4 wheels
  const wheel = new CylinderGeometry(0.4, 0.4, 1.75, 16);

  // different values for the top and bottom radius creates a cone shape
  // radialSegments default value = 8
  const chimney = new CylinderGeometry(0.3, 0.1, 0.5);

  return {
    cabinFloor,
    cabinRoof,
    cabinWall,
    cabinWallFront,
    cabinDoor,
    cabinPillar,
    handle,
    hinge,
    nose,
    wheel,
    chimney,
  };
};
