import { describe, it, expect } from 'vitest';
import {
  getWibDateString,
  formatIndonesianDate,
  formatWibTime,
  formatRupiahNullable,
} from '@/lib/time/wib';

describe('U08 - WIB Date and Time handling (Asia/Jakarta)', () => {
  it('correctly formats date string in YYYY-MM-DD for WIB', () => {
    // 2026-11-01T00:30:00Z is 07:30 WIB on Nov 1
    const d1 = new Date('2026-11-01T00:30:00Z');
    expect(getWibDateString(d1)).toBe('2026-11-01');

    // 2026-10-31T20:00:00Z is 03:00 WIB on Nov 1 (WIB is UTC+7)
    const d2 = new Date('2026-10-31T20:00:00Z');
    expect(getWibDateString(d2)).toBe('2026-11-01');
  });

  it('correctly handles day boundary transitions at 23:59 to 00:00 WIB', () => {
    // 2026-10-31 23:59:59 WIB is 2026-10-31T16:59:59Z
    const d1 = new Date('2026-10-31T16:59:59Z');
    expect(getWibDateString(d1)).toBe('2026-10-31');

    // 2026-11-01 00:00:01 WIB is 2026-10-31T17:00:01Z
    const d2 = new Date('2026-10-31T17:00:01Z');
    expect(getWibDateString(d2)).toBe('2026-11-01');
  });

  it('formats Indonesian date in human readable format', () => {
    expect(formatIndonesianDate('2026-11-01')).toContain('November 2026');
  });

  it('formats time with Indonesian standard WIB dot notation', () => {
    // 2026-11-01T02:15:00Z is 09:15 WIB
    const d = new Date('2026-11-01T02:15:00Z');
    const formatted = formatWibTime(d);
    expect(formatted).toMatch(/09\.15 WIB/);
  });
});

describe('U01 - Nullable Price Formatting', () => {
  it('returns null when price is null (does NOT return Rp0)', () => {
    expect(formatRupiahNullable(null)).toBeNull();
    expect(formatRupiahNullable(undefined)).toBeNull();
  });

  it('formats positive prices with Indonesian locale and unit', () => {
    expect(formatRupiahNullable(18000, 'fixed', 'potong')).toBe('Rp18.000 / potong');
    expect(formatRupiahNullable(5000, 'from', 'gelas')).toBe('Mulai dari Rp5.000 / gelas');
  });
});

