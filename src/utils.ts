/** Format decimal hours to "XhYY" display string */
export function formatTime(decimalHours: number): string {
  if (!decimalHours) return '';
  const h = Math.floor(decimalHours);
  const m = Math.round((decimalHours - h) * 60);
  return `${h}h${m.toString().padStart(2, '0')}`;
}

/** Parse "XhYY" string to decimal hours. Returns 0 on invalid input. */
export function parseTime(input: string): number {
  const trimmed = input.trim();
  if (!trimmed) return 0;

  // Format "XhYY" or "Xh"
  const match = trimmed.match(/^(\d+)\s*h\s*(\d{0,2})$/i);
  if (match) {
    const hours = parseInt(match[1], 10);
    const minutes = match[2] ? parseInt(match[2], 10) : 0;
    return hours + minutes / 60;
  }

  // Plain number = hours
  const num = parseFloat(trimmed);
  return isNaN(num) ? 0 : num;
}
