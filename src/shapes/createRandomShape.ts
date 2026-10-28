import { Circle } from "./Circle";
import { Rectangle } from "./Rectangle";
import { Ellipse } from "./Ellipse";
import { Polygon } from "./Polygon";
import { Star } from "./Star";
import type { Shape } from "./Shape";
import { getRegularPolygonPoints } from "../utils/geometry";

// Creates one of seven shape types with a random color.
export function createRandomShape(): Shape {
  const options = {
    x: 0,
    y: 0,
    color: Math.floor(Math.random() * 0x1000000),
  };

  const type = Math.floor(Math.random() * 7);

  switch (type) {
    case 0:
      return new Circle({
        ...options,
        radius: 40,
      });

    case 1:
      return new Rectangle({
        ...options,
        width: 80,
        height: 60,
      });

    case 2:
      return new Ellipse({
        ...options,
        radiusX: 50,
        radiusY: 30,
      });

    case 3:
      return new Polygon({
        ...options,
        points: getRegularPolygonPoints(3, 45),
      });

    case 4:
      return new Polygon({
        ...options,
        points: getRegularPolygonPoints(5, 45),
      });

    case 5:
      return new Polygon({
        ...options,
        points: getRegularPolygonPoints(6, 45),
      });

    default:
      return new Star({
        ...options,
        points: 5,
        radius: 45,
        innerRadius: 22,
      });
  }
}
