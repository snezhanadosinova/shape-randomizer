import { Shape } from "./Shape";
import type { ShapeOptions } from "./ShapeOptions";

interface EllipseOptions extends ShapeOptions {
  radiusX: number;
  radiusY: number;
}

export class Ellipse extends Shape {
  private readonly radiusX: number;
  private readonly radiusY: number;

  // Sets the radiusX and radiusY and draws the initial ellipse.
  constructor({ radiusX, radiusY, ...options }: EllipseOptions) {
    super(options);

    this.radiusX = radiusX;
    this.radiusY = radiusY;
    this.draw();
  }

  // Redraws the circle around its local origin.
  protected override draw(): void {
    this.clear();
    this.ellipse(0, 0, this.radiusX, this.radiusY);
    this.fill(this.color);
  }
}
