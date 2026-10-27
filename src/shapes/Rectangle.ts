import { Shape } from "./Shape";
import type { ShapeOptions } from "./ShapeOptions";

interface RectangleOptions extends ShapeOptions {
  width: number;
  height: number;
}

export class Rectangle extends Shape {
  private readonly shapeWidth: number;
  private readonly shapeHeight: number;

  // Sets the dimensions and draws the initial rectangle.
  constructor({ width, height, ...options }: RectangleOptions) {
    super(options);

    this.shapeWidth = width;
    this.shapeHeight = height;
    this.draw();
  }

  // Redraws the rectangle around its local origin.
  protected override draw(): void {
    this.clear();
    this.rect(
      -this.shapeWidth / 2,
      -this.shapeHeight / 2,
      this.shapeWidth,
      this.shapeHeight,
    );
    this.fill(this.color);
  }
}
