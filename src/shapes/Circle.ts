import { Shape } from "./Shape";
import type { ShapeOptions } from "./ShapeOptions";

interface CircleOptions extends ShapeOptions {
  radius: number;
}

export class Circle extends Shape {
  private readonly radius: number;

  // Sets the radius and draws the initial circle.
  constructor({ radius, ...options }: CircleOptions) {
    super(options);

    this.radius = radius;
    this.draw();
  }

  // Redraws the circle around its local origin.
  protected override draw(): void {
    this.clear();
    this.circle(0, 0, this.radius);
    this.fill(this.color);
  }
}
