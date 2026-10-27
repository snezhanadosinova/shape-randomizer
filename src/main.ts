import { Application, Graphics } from "pixi.js";
import "./style.css";

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

  const circle = new Graphics().circle(0, 0, 60).fill("#7c5cff");

  circle.position.set(app.screen.width / 2, app.screen.height / 2);

  app.stage.addChild(circle);
  circle.eventMode = "static";
  circle.cursor = "pointer";

  const colors = ["#7c5cff", "#ff6b6b", "#4ecdc4", "#ffd166"];
  let colorIndex = 0;

  circle.on("pointertap", () => {
    colorIndex = (colorIndex + 1) % colors.length;

    circle.clear().circle(0, 0, 60).fill(colors[colorIndex]);
  });
}

init().catch(console.error);
