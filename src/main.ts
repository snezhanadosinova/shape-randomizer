import { Application } from "pixi.js";
import { createRandomShape } from "./shapes/createRandomShape";
import type { Shape } from "./shapes/Shape";
import "./style.css";

interface FallingShape {
  shape: Shape;
  velocityY: number;
}

// Initializes the application and displays a random shape.
async function init(): Promise<void> {
  const app = new Application();

  const scene = document.querySelector<HTMLElement>("#scene");

  if (!scene) {
    throw new Error('Missing element "#scene"');
  }

  await app.init({
    background: "#182234",
    resizeTo: scene,
    antialias: true,
  });

  scene.appendChild(app.canvas);

  const fallingShapes: FallingShape[] = [];

  const gravity = 180;
  const creationInterval = 1;
  let timeSinceLastCreation = 0;

  // Creates a shape above the scene at a random horizontal position.
  function createShape(): void {
    const shape = createRandomShape();
    const bounds = shape.getLocalBounds();

    const minX = -bounds.x;
    const maxX = app.screen.width - bounds.x - bounds.width;

    const x =
      maxX >= minX
        ? minX + Math.random() * (maxX - minX)
        : app.screen.width / 2;

    const y = -(bounds.y + bounds.height) - 1;

    shape.position.set(x, y);
    app.stage.addChild(shape);

    fallingShapes.push({
      shape,
      velocityY: 0,
    });
  }

  // Generates shapes at regular intervals and updates their movement.
  app.ticker.add((ticker) => {
    const deltaSeconds = ticker.deltaMS / 1000;

    timeSinceLastCreation += deltaSeconds;

    while (timeSinceLastCreation >= creationInterval) {
      createShape();
      timeSinceLastCreation -= creationInterval;
    }

    for (const item of fallingShapes) {
      item.velocityY += gravity * deltaSeconds;
      item.shape.y += item.velocityY * deltaSeconds;
    }
  });

  createShape();
}

init().catch(console.error);
