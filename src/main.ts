import { Application } from "pixi.js";
import { Circle } from "./shapes/Circle";
import { Rectangle } from "./shapes/Rectangle";
import "./style.css";

// Initializes the PixiJS application and adds shapes to the stage.
async function init() {
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

  const circle = new Circle({
    x: app.screen.width / 2,
    y: app.screen.height / 2,
    radius: 60,
    color: 0x7c5cff,
  });

  const smallCircle = new Circle({
    x: app.screen.width / 2 + 150,
    y: app.screen.height / 2,
    radius: 30,
    color: 0xff6b6b,
  });

  app.stage.addChild(circle);

  app.stage.addChild(smallCircle);

  const rectangle = new Rectangle({
    x: 0,
    y: 0,
    width: 120,
    height: 80,
    color: 0x4ecdc4,
  });

  app.stage.addChild(rectangle);

  // Positions the elements relative to the current stage dimensions.
  function updateLayout(): void {
    const centerX = app.screen.width / 2;
    const centerY = app.screen.height / 2;

    circle.position.set(centerX, centerY);
    smallCircle.position.set(centerX + 150, centerY);
    rectangle.position.set(centerX - 180, centerY);
  }

  // Updates the layout whenever the canvas is resized.
  app.renderer.on("resize", updateLayout);

  // Applies the initial layout.
  updateLayout();
}

init().catch(console.error);
