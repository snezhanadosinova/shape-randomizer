import { Shape } from "./Shape";
import type { ShapeOptions } from "./ShapeOptions";
import { getPolygonArea } from "../utils/geometry";

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

  // Returns the polygon area in square pixels.
  // Uses the shoelace formula:
  // Area = ½ × |Σ(xᵢ × yᵢ₊₁ − xᵢ₊₁ × yᵢ)|.
  // Vertices must follow the polygon boundary without self-intersections.
  // The last vertex is connected back to the first.
  public override getArea(): number {
    return getPolygonArea(this.points);
  }

  // Redraws the polygon using its local vertex coordinates.
  protected override draw(): void {
    this.clear();
    this.poly(this.points, this.close);
    this.fill(this.color);
  }
}
