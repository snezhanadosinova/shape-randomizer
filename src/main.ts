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

  const currentNumber =
    document.querySelector<HTMLSpanElement>("#currentNumber");

  if (!currentNumber) {
    throw new Error('Missing element "#currentNumber"');
  }

  // Keeps the validated element reference for use in callbacks.
  const currentNumberElement = currentNumber;

  const fallingShapes: FallingShape[] = [];

  // Displays the number of shapes intersecting the visible scene.
  function updateShapeCount(): void {
    let visibleCount = 0;

    for (const { shape } of fallingShapes) {
      const bounds = shape.getLocalBounds();

      const left = shape.x + bounds.x;
      const right = left + bounds.width;
      const top = shape.y + bounds.y;
      const bottom = top + bounds.height;

      const isVisible =
        right > 0 &&
        left < app.screen.width &&
        bottom > 0 &&
        top < app.screen.height;

      if (isVisible) {
        visibleCount++;
      }
    }

    const text = String(visibleCount);

    if (currentNumberElement.textContent !== text) {
      currentNumberElement.textContent = text;
    }
  }

  const gravity = 180;
  const creationInterval = 0.5;
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

    // Updates movement and removes shapes below the scene.
    for (let i = fallingShapes.length - 1; i >= 0; i--) {
      const item = fallingShapes[i];

      item.velocityY += gravity * deltaSeconds;
      item.shape.y += item.velocityY * deltaSeconds;

      const bounds = item.shape.getLocalBounds();
      const topY = item.shape.y + bounds.y;

      if (topY > app.screen.height) {
        fallingShapes.splice(i, 1);
        item.shape.removeFromParent();
        item.shape.destroy();
      }
    }

    updateShapeCount();
  });

  createShape();
}

init().catch(console.error);
