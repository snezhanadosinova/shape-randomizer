import { Application } from "pixi.js";
import { Circle } from "./shapes/Circle";
import { Rectangle } from "./shapes/Rectangle";
import { Ellipse } from "./shapes/Ellipse";
import { Polygon } from "./shapes/Polygon";
import { getRegularPolygonPoints } from "./utils/geometry";

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

  app.stage.addChild(circle);

  const smallCircle = new Circle({
    x: app.screen.width / 2 + 150,
    y: app.screen.height / 2,
    radius: 30,
    color: 0xff6b6b,
  });

  app.stage.addChild(smallCircle);

  const rectangle = new Rectangle({
    x: 0,
    y: 0,
    width: 120,
    height: 80,
    color: 0x4ecdc4,
  });

  app.stage.addChild(rectangle);

  const ellipse = new Ellipse({
    x: 0,
    y: 0,
    radiusX: 80,
    radiusY: 40,
    color: 0xffd166,
  });

  app.stage.addChild(ellipse);

  const triangle = new Polygon({
    x: 0,
    y: 0,
    color: 0xff6b6b,
    points: [0, -60, 60, 30, -60, 30],
    close: true,
  });

  app.stage.addChild(triangle);

  const pentagon = new Polygon({
    x: 0,
    y: 0,
    color: 0x4ecdc4,
    points: getRegularPolygonPoints(5, 60),
  });

  app.stage.addChild(pentagon);

  const hexagon = new Polygon({
    x: 0,
    y: 0,
    color: 0x4ecdc4,
    points: getRegularPolygonPoints(6, 60),
  });

  app.stage.addChild(hexagon);

  // Positions the elements relative to the current stage dimensions.
  // Arranges the shapes in three rows around the stage center.
  function updateLayout(): void {
    const centerX = app.screen.width / 2;
    const centerY = app.screen.height / 2;

    const columnSpacing = 180;
    const rowSpacing = 150;

    rectangle.position.set(centerX - columnSpacing, centerY - rowSpacing);
    circle.position.set(centerX, centerY - rowSpacing);
    smallCircle.position.set(centerX + columnSpacing, centerY - rowSpacing);

    triangle.position.set(centerX - columnSpacing, centerY);
    ellipse.position.set(centerX, centerY);
    pentagon.position.set(centerX + columnSpacing, centerY);

    hexagon.position.set(centerX, centerY + rowSpacing);
  }

  // Updates the layout whenever the canvas is resized.
  app.renderer.on("resize", updateLayout);

  // Applies the initial layout.
  updateLayout();
}

init().catch(console.error);
