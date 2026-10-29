# Reevo Shapes

Interactive falling shapes built with **TypeScript, PixiJS, Vite, and Docker**.

## Task Requirements and Implementation

| Requirement                                        | Status                     | Implementation                                                 |
| -------------------------------------------------- | -------------------------- | -------------------------------------------------------------- |
| Rectangular canvas area                            | Done                       | `init()` initializes PixiJS inside `#scene`                    |
| Random shape types and colors                      | Done                       | `createRandomShape()`                                          |
| Start above the area at a random X position        | Done                       | `createShape()` calculates the position using local bounds     |
| Fall under gravity                                 | Done                       | Ticker callback updates velocity and position using delta time |
| Generate shapes at regular intervals               | Done                       | Ticker callback uses `creationInterval`                        |
| Mask shapes outside the area                       | Done                       | `updateMask()` and `shapesContainer.mask`                      |
| Remove shapes below the scene                      | Done                       | Ticker checks the top edge and calls `removeShape()`           |
| Create a shape at the pointer position             | Done                       | Stage `pointerdown` handler calls `createShape(position)`      |
| Remove a pressed shape                             | Done                       | Shape `pointerdown` handler calls `removeShape()`              |
| Display the visible shape count using HTML         | Done                       | `updateShapeCount()`                                           |
| Generate random irregular shapes on interaction    | Not implemented            | —                                                              |
| Display occupied surface area                      | Not implemented            | —                                                              |
| HTML controls for gravity and generation frequency | Not implemented            | —                                                              |
| Object-oriented design                             | Done                       | Abstract `Shape` class and concrete shape classes              |
| Mobile support                                     | Manually tested on a phone | Touch interaction, resizing, layout, and animation             |

Available shapes: circle, rectangle, ellipse, triangle, pentagon, hexagon, star, and randomly generated irregular polygons.

Random types/colors, irregular shapes, HTML statistics, and HTML controls are bonus requirements.

## Run

Requires Docker with Docker Compose. Local Node.js/npm is not needed.

```bash
docker compose up --build
```

Open [localhost:5173](http://localhost:5173).

Type checking:

```bash
docker compose exec reevo-app npm run typecheck
```

Stop:

```bash
docker compose down
```

## Test on a Phone

Connect the phone and computer to the same local network. With the application running, open:

```text
http://<computer-local-ip>:5173
```

The host firewall must allow inbound TCP traffic on port `5173` from the local network.

## Configuration

In `src/main.ts`:

- `gravity` — acceleration in px/s².
- `creationInterval` — seconds between generated shapes; `1` means one shape per second.

## Implementation Notes

- Each shape implements its geometry in `draw()`.
- `getRegularPolygonPoints()` generates regular polygon vertices.
- `getIrregularPolygonPoints()` generates an irregular contour with ordered vertices.
- `removeShape()` removes the tracking entry, detaches the object, and destroys it.
- The visible counter includes partially visible shapes using bounding-box intersection.
- Mobile behavior was manually checked on one phone; broader device and performance testing remains pending.
- Surface area calculation is not implemented.
