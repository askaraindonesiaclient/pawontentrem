/**
 * Time and date helpers for Pawon Tentrem (Asia/Jakarta / WIB)
 */

export const RESTAURANT_TIMEZONE = 'Asia/Jakarta';

/**
 * Returns current date string in YYYY-MM-DD for Asia/Jakarta
 */
export function getWibDateString(date = new Date()): string {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: RESTAURANT_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return formatter.format(date);
}

/**
 * Format date in full Indonesian: "Minggu, 1 November 2026"
 */
export function formatIndonesianDate(dateOrIso: string | Date): string {
  const d = typeof dateOrIso === 'string' ? new Date(dateOrIso.includes('T') ? dateOrIso : `${dateOrIso}T12:00:00+07:00`) : dateOrIso;
  return new Intl.DateTimeFormat('id-ID', {
    timeZone: RESTAURANT_TIMEZONE,
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d);
}

/**
 * Format time in WIB: "09.15 WIB"
 */
export function formatWibTime(dateOrIso: string | Date): string {
  const d = typeof dateOrIso === 'string' ? new Date(dateOrIso) : dateOrIso;
  const timeStr = new Intl.DateTimeFormat('id-ID', {
    timeZone: RESTAURANT_TIMEZONE,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(d);

  // Replace : with . for Indonesian standard format "09.15 WIB"
  return `${timeStr.replace(':', '.')} WIB`;
}

/**
 * Get current day of week in WIB (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
 */
export function getWibDayOfWeek(date = new Date()): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: RESTAURANT_TIMEZONE,
    weekday: 'short',
  }).formatToParts(date);
  const weekdayStr = parts.find((p) => p.type === 'weekday')?.value;
  const days: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  return weekdayStr && days[weekdayStr] !== undefined ? days[weekdayStr] : 0;
}

/**
 * Format rupiah currency nullable
 * If null, returns null (do not return Rp0)
 */
export function formatRupiahNullable(
  amount: number | null | undefined,
  mode: 'fixed' | 'from' = 'fixed',
  unit?: string | null
): string | null {
  if (amount === null || amount === undefined) {
    return null;
  }
  const formatted = `Rp${amount.toLocaleString('id-ID')}`;
  const prefix = mode === 'from' ? 'Mulai dari ' : '';
  const suffix = unit ? ` / ${unit}` : '';
  return `${prefix}${formatted}${suffix}`;
}

