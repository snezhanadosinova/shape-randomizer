import { Application, Container, Graphics } from "pixi.js";
import { createRandomShape } from "./shapes/createRandomShape";
import type { Shape } from "./shapes/Shape";
import "./style.css";

interface FallingShape {
  shape: Shape;
  velocityY: number;
}

// Initializes the application and sets up the scene, shapes, and interactions.
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

  // Creates a container for the shapes and a mask to limit their visibility.
  const shapesContainer = new Container();
  const sceneMask = new Graphics();

  app.stage.addChild(shapesContainer);
  app.stage.addChild(sceneMask);

  shapesContainer.mask = sceneMask;

  // Matches the visible area to the current scene dimensions.
  function updateMask(): void {
    sceneMask.clear();
    sceneMask.rect(0, 0, app.screen.width, app.screen.height);
    sceneMask.fill(0xffffff);
  }

  app.renderer.on("resize", updateMask);

  updateMask();

  app.stage.eventMode = "static";
  app.stage.hitArea = app.screen;

  // Creates a falling shape where the scene is pressed.
  app.stage.on("pointerdown", (event) => {
    const position = event.getLocalPosition(shapesContainer);

    createShape({
      x: position.x,
      y: position.y,
    });
  });

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

  // Removes a tracked shape and releases its resources.
  function removeShape(shape: Shape): void {
    const index = fallingShapes.findIndex((item) => item.shape === shape);

    if (index === -1) {
      return;
    }

    fallingShapes.splice(index, 1);
    shape.removeFromParent();
    shape.destroy();

    updateShapeCount();
  }

  const gravity = 180;
  const creationInterval = 1;
  let timeSinceLastCreation = 0;

  // Creates a shape at the given position or randomly above the scene.
  function createShape(position?: { x: number; y: number }): void {
    const shape = createRandomShape();
    const bounds = shape.getLocalBounds();

    const minX = -bounds.x;
    const maxX = app.screen.width - bounds.x - bounds.width;

    const x =
      position?.x ??
      (maxX >= minX
        ? minX + Math.random() * (maxX - minX)
        : app.screen.width / 2);

    const y = position?.y ?? -(bounds.y + bounds.height) - 1;

    shape.position.set(x, y);
    shapesContainer.addChild(shape);

    fallingShapes.push({
      shape,
      velocityY: 0,
    });

    // Removes the pressed shape and prevents scene creation.
    shape.on("pointerdown", (event) => {
      event.stopPropagation();
      removeShape(shape);
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
        removeShape(item.shape);
      }
    }

    updateShapeCount();
  });

  createShape();
}

init().catch(console.error);
