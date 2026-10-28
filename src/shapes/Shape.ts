import { Graphics } from "pixi.js";
import type { ShapeOptions } from "./ShapeOptions";

export abstract class Shape extends Graphics {
  protected color: number;

  // Sets the position and configures shared shape interaction.
  constructor({ x, y, color }: ShapeOptions) {
    super();

    this.color = color;
    this.position.set(x, y);

    this.eventMode = "static";
    this.cursor = "pointer";
  }

  // Each shape defines its own drawing implementation.
  protected abstract draw(): void;
}