// Generates regular polygon vertices around the local origin.
export function getRegularPolygonPoints(
  sides: number,
  radius: number,
): number[] {
  if (!Number.isInteger(sides) || sides < 3) {
    throw new Error("A polygon must have at least 3 sides.");
  }

  const points: number[] = [];
  const angleStep = (Math.PI * 2) / sides;

  for (let i = 0; i < sides; i++) {
    const angle = i * angleStep - Math.PI / 2;

    points.push(Math.cos(angle) * radius, Math.sin(angle) * radius);
  }

  return points;
}

// Returns the area of a simple polygon from ordered vertex coordinates.
export function getPolygonArea(points: readonly number[]): number {
  if (points.length < 6 || points.length % 2 !== 0) {
    throw new Error("A polygon requires at least three coordinate pairs.");
  }

  let sum = 0;

  for (let i = 0; i < points.length; i += 2) {
    const next = (i + 2) % points.length;

    sum += points[i] * points[next + 1] - points[next] * points[i + 1];
  }

  return Math.abs(sum) / 2;
}
