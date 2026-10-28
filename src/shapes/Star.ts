import { Shape } from "./Shape";
import type { ShapeOptions } from "./ShapeOptions";

interface StarOptions extends ShapeOptions {
  points: number;
  radius: number;
  innerRadius?: number;
  rotation?: number;
}

export class Star extends Shape {
  private readonly points: number;
  private readonly radius: number;
  private readonly innerRadius: number;
  private readonly starRotation: number;

  constructor({
    points,
    radius,
    innerRadius = radius / 2,
    rotation = 0,
    ...options
  }: StarOptions) {
    super(options);

    this.points = points;
    this.radius = radius;
    this.innerRadius = innerRadius;
    this.starRotation = rotation;

    this.draw();
  }

  protected override draw(): void {
    this.clear();
    this.star(
      0,
      0,
      this.points,
      this.radius,
      this.innerRadius,
      this.starRotation,
    );
    this.fill(this.color);
  }
}
