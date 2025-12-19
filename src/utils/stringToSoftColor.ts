export default function stringToSoftColor(
  str: string,
  options?: {
    saturation?: number;
    lightness?: number;
  }
) {
  if (!str) return '#000';

  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = Math.abs(hash) % 360;

  const saturation = options?.saturation ?? 45; // keep muted
  const lightness = options?.lightness ?? 70;   // keep light

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
