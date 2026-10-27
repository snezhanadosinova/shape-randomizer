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

    points.push(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
    );
  }

  return points;
}