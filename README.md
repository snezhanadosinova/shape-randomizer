# Shape Randomizer

Interactive falling shapes built with **TypeScript, PixiJS, Vite, and Docker**.

## Requirements and Progress

| Requirement                                  | Status                       | Implementation                                        |
| -------------------------------------------- | ---------------------------- | ----------------------------------------------------- |
| Rectangular canvas area                      | Done                         | `init()`                                              |
| Random shape types and colors                | Done                         | `createRandomShape()`                                 |
| Start above the scene at a random X position | Done                         | `createShape()`                                       |
| Fall under gravity                           | Done                         | Ticker updates velocity and position using delta time |
| Generate one shape per second by default     | Done                         | `shapesPerSecond = 1`                                 |
| Mask shapes outside the area                 | Done                         | `updateMask()` and `shapesContainer.mask`             |
| Remove shapes below the scene                | Done                         | Ticker calls `removeShape()`                          |
| Create a shape at the pointer position       | Done                         | Stage `pointerdown` calls `createShape(position)`     |
| Remove a pressed shape                       | Done                         | Shape `pointerdown` calls `removeShape()`             |
| Display visible shape count using HTML       | Done                         | `updateShapeStats()`                                  |
| Display total area of visible shapes         | Done, with limitations below | `updateShapeStats()` sums each shape’s `getArea()`    |
| HTML controls for gravity                    | Done                         | Button handlers and `updateGravityControls()`         |
| HTML controls for generation frequency       | Done                         | Button handlers and `updateShapeControls()`           |
| Generate random irregular shapes             | Not implemented              | —                                                     |
| Object-oriented design                       | Done                         | Abstract `Shape` class and concrete subclasses        |
| Mobile support                               | Manually tested on one phone | Touch interaction, resizing, layout, and animation    |

Available shapes: **circle, rectangle, ellipse, triangle, pentagon, hexagon, and star**.

## Run with Docker

Requires Docker with Docker Compose. Local Node.js/npm is not required.

```bash
docker compose up --build
```

Open [localhost:5173](http://localhost:5173).

Check TypeScript types:

```bash
docker compose exec app npm run typecheck
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

## Controls and Configuration

Settings and control handlers are defined in `src/main.ts`.

- **Gravity:** 0–720 px/s², adjusted in steps of 30. Default: 180.
- **Generation frequency:** 1–10 shapes per second. Default: 1.
- The creation interval is calculated as `1 / shapesPerSecond`.
- Changing the generation frequency resets the creation timer.
- At zero gravity, automatic generation pauses. Moving shapes retain their current velocity, while manually created shapes start at rest.
- Increasing gravity above zero resumes automatic generation and accelerates existing shapes.
- Clicking or tapping an empty area creates a shape; pressing a shape removes it.

## Known Limitations

- Visibility is determined using bounding-box intersection.
- The area statistic sums the full geometric areas of shapes considered visible, including portions outside the mask.
- Overlapping areas are counted separately for each shape.
- Random irregular shape generation is not implemented.
- Mobile behavior was manually tested on one phone; broader device and performance testing is pending.
