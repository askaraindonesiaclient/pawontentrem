import { describe, it, expect } from 'vitest';
import { menuEntryFormSchema } from '@/lib/validation/schemas';

describe('Menu Entry Form Validation', () => {
  it('accepts valid menu item with required name', () => {
    const res = menuEntryFormSchema.safeParse({
      name: 'Ayam Goreng Lengkuas',
      category: 'lauk',
      priceRupiah: 16000,
    });
    expect(res.success).toBe(true);
  });

  it('accepts valid menu item with null price', () => {
    const res = menuEntryFormSchema.safeParse({
      name: 'Sayur Lodeh',
      category: 'sayur',
      priceRupiah: null,
    });
    expect(res.success).toBe(true);
    if (res.success) {
      expect(res.data.priceRupiah).toBeNull();
    }
  });

  it('rejects empty or whitespace-only name', () => {
    const res = menuEntryFormSchema.safeParse({
      name: '   ',
    });
    expect(res.success).toBe(false);
  });

  it('rejects negative or zero price', () => {
    const resNegative = menuEntryFormSchema.safeParse({
      name: 'Tempe Bacem',
      priceRupiah: -1000,
    });
    expect(resNegative.success).toBe(false);

    const resZero = menuEntryFormSchema.safeParse({
      name: 'Tempe Bacem',
      priceRupiah: 0,
    });
    expect(resZero.success).toBe(false);
  });

  it('rejects invalid category', () => {
    const res = menuEntryFormSchema.safeParse({
      name: 'Menu Rahasia',
      category: 'snack_tidak_terdaftar',
    });
    expect(res.success).toBe(false);
  });
});
