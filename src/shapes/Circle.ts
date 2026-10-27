import { Graphics } from "pixi.js";

interface CircleOptions {
  x: number;
  y: number;
  radius: number;
  color: number;
}

export class Circle extends Graphics {
  private readonly radius: number;
  private color: number;

  // Creates the circle, sets its position, and enables interaction.
  constructor({ x, y, radius, color }: CircleOptions) {
    super();

    this.radius = radius;
    this.color = color;

    this.position.set(x, y);
    this.draw();

    this.eventMode = "static";
    this.cursor = "pointer";

    const colors = [0x7c5cff, 0xff6b6b, 0x4ecdc4, 0xffd166];
    let colorIndex = colors.indexOf(this.color);

    // Cycles to the next palette color and redraws the circle.
    this.on("pointertap", () => {
      colorIndex = (colorIndex + 1) % colors.length;
      this.color = colors[colorIndex];
      this.draw();
    });
  }

  // Redraws the circle using its current color and configured radius.
  private draw(): void {
    this.clear();
    this.circle(0, 0, this.radius);
    this.fill(this.color);
  }
}
