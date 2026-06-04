/**
 * Convert a number/string to Persian (Eastern Arabic-Indic) numerals.
 * Falls back to original digits if Intl fails (SSR safety).
 */
export function toFa(value: number | string): string {
  const s = String(value);
  try {
    return new Intl.NumberFormat('fa-IR', { useGrouping: false }).format(Number(s)) || s;
  } catch {
    const map: Record<string, string> = {
      '0': '۰', '1': '۱', '2': '۲', '3': '۳', '4': '۴',
      '5': '۵', '6': '۶', '7': '۷', '8': '۸', '9': '۹',
    };
    return s.replace(/[0-9]/g, (d) => map[d] || d);
  }
}

export function padFa(n: number, width = 2): string {
  return toFa(String(n).padStart(width, '0'));
}
