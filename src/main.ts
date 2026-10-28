import { Application } from "pixi.js";
import { createRandomShape } from "./shapes/createRandomShape";
import "./style.css";

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

  const shape = createRandomShape();

  const bounds = shape.getLocalBounds();

  const minX = -bounds.x;
  const maxX = app.screen.width - bounds.x - bounds.width;

  // Selects a random horizontal position where the shape fits.
  const x =
    maxX >= minX ? minX + Math.random() * (maxX - minX) : app.screen.width / 2;

  // Places the entire shape just above the scene.
  const y = -(bounds.y + bounds.height) - 1;

  shape.position.set(x, y);

  app.stage.addChild(shape);

  const gravity = 180;
  let velocityY = 0;

  // Accelerates the shape downward and updates its position.
  app.ticker.add((ticker) => {
    const deltaSeconds = ticker.deltaMS / 1000;

    velocityY += gravity * deltaSeconds;
    shape.y += velocityY * deltaSeconds;
  });
}

init().catch(console.error);
