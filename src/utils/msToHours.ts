export default function msToHours(ms: number): number {
  return Math.floor((ms / (1000 * 60 * 60)) % 24);
}
