import { Graphics } from "pixi.js";
import { getNextColor } from "../utils/colors";
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

    // Cycles the color and redraws the shape on click.
    this.on("pointertap", () => {
      this.color = getNextColor(this.color);
      this.draw();
    });
  }

  // Each shape defines its own drawing implementation.
  protected abstract draw(): void;
}