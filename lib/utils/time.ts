/**
 * Tehran-time helpers. Use `useTehranTime` for live updates;
 * the pure functions are SSR-safe and used to render the initial string.
 */
export function formatTehranTime(date = new Date(), locale: 'fa-IR' | 'en-GB' = 'fa-IR'): string {
  try {
    return new Intl.DateTimeFormat(locale, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Tehran',
    }).format(date);
  } catch {
    return '--:--';
  }
}

export function tehranHour(date = new Date()): number {
  try {
    return Number(
      new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        hour12: false,
        timeZone: 'Asia/Tehran',
      })
        .format(date)
        .slice(0, 2),
    );
  } catch {
    return 12;
  }
}

export function greetingFa(hour = tehranHour()): string {
  if (hour < 5) return 'شب بخیر';
  if (hour < 12) return 'صبح بخیر';
  if (hour < 17) return 'ظهر بخیر';
  return 'غروب بخیر';
}

export function daypartFa(hour = tehranHour()): string {
  if (hour < 5) return 'شب';
  if (hour < 12) return 'صبح';
  if (hour < 17) return 'روز';
  return 'غروب طلایی';
}
