const COLORS = [0x7c5cff, 0xff6b6b, 0x4ecdc4, 0xffd166];

// Returns the next palette color, wrapping back to the first.
export function getNextColor(currentColor: number): number {
  const currentIndex = COLORS.indexOf(currentColor);
  const nextIndex = (currentIndex + 1) % COLORS.length;

  return COLORS[nextIndex];
}
