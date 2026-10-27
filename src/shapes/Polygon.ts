import { Shape } from "./Shape";
import type { ShapeOptions } from "./ShapeOptions";

interface PolygonOptions extends ShapeOptions {
  points: number[];
  close?: boolean;
}

export class Polygon extends Shape {
  private readonly points: number[];
  private readonly close: boolean;

  // Stores the vertices and draws the initial polygon.
  constructor({ points, close = true, ...options }: PolygonOptions) {
    super(options);

    this.points = [...points];
    this.close = close;
    this.draw();
  }

  // Redraws the polygon using its local vertex coordinates.
  protected override draw(): void {
    this.clear();
    this.poly(this.points, this.close);
    this.fill(this.color);
  }
}
