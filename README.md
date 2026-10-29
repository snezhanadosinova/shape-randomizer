# REEVO Shape Lab

Interactive falling shapes built with **TypeScript, PixiJS, Vite, and Docker**.

## Requirements and Progress

| Requirement                                        | Status                       | Implementation                                        |
| -------------------------------------------------- | ---------------------------- | ----------------------------------------------------- |
| Rectangular canvas area                            | Done                         | `init()`                                              |
| Random shape types and colors                      | Done                         | `createRandomShape()`                                 |
| Start above the scene at a random X position       | Done                         | `createShape()`                                       |
| Fall under gravity                                 | Done                         | Ticker updates velocity and position using delta time |
| Generate one shape per second                      | Done                         | `creationInterval = 1`                                |
| Mask shapes outside the area                       | Done                         | `updateMask()` and `shapesContainer.mask`             |
| Remove shapes below the scene                      | Done                         | Ticker calls `removeShape()`                          |
| Create a shape at the pointer position             | Done                         | Stage `pointerdown` calls `createShape(position)`     |
| Remove a pressed shape                             | Done                         | Shape `pointerdown` calls `removeShape()`             |
| Display visible shape count using HTML             | Done                         | `updateShapeCount()`                                  |
| Display occupied surface area                      | Not implemented              | —                                                     |
| Generate random irregular shapes                   | Not implemented              | —                                                     |
| HTML controls for gravity and generation frequency | Not implemented              | —                                                     |
| Object-oriented design                             | Done                         | Abstract `Shape` class and concrete subclasses        |
| Mobile support                                     | Manually tested on one phone | Touch interaction, resizing, layout, and animation    |

Available shapes: **circle, rectangle, ellipse, triangle, pentagon, hexagon, and star**.

## Run with Docker

Requires Docker with Docker Compose. Local Node.js/npm is not required.

```bash
docker compose up --build
```

Open [localhost:5173](http://localhost:5173).

Check TypeScript types:

```bash
docker compose exec reevo-app npm run typecheck
```

Stop:

```bash
docker compose down
```

## Run Without Docker

Requires Node.js 22 and npm.

Install dependencies:

```bash
npm ci
```

Start the development server:

```bash
npm run dev -- --host 0.0.0.0
```

Open [localhost:5173](http://localhost:5173).

Check TypeScript types:

```bash
npm run typecheck
```

Stop the server with `Ctrl+C`.

## Configuration

Settings are defined in `src/main.ts`:

- `gravity` — vertical acceleration in px/s².
- `creationInterval` — seconds between generated shapes.

The values displayed below the canvas are currently static HTML, not interactive controls.

## Known Limitations

- Surface area calculation is not implemented.
- Random irregular shape generation is not implemented.
- Gravity and generation frequency controls are not implemented.
- Visible shape counting uses bounding-box intersection.
- Mobile behavior was manually tested on one phone; broader testing is pending.
