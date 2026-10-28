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

  app.stage.addChild(shape);

  // Centers the shape within the current stage dimensions.
  function updateLayout(): void {
    shape.position.set(
      app.screen.width / 2,
      app.screen.height / 2,
    );
  }

  app.renderer.on("resize", updateLayout);

  updateLayout();
}

init().catch(console.error);