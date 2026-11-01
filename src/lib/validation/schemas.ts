import { z } from 'zod';

export const menuCategorySchema = z.enum([
  'lauk',
  'sayur',
  'pelengkap',
  'sambal',
  'minuman',
]);

export const priceModeSchema = z.enum(['fixed', 'from']);

export const menuAvailabilitySchema = z.enum(['available', 'sold_out']);

export const menuEntryFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Nama menu minimal 2 karakter')
    .max(80, 'Nama menu maksimal 80 karakter'),
  category: menuCategorySchema.default('lauk'),
  priceRupiah: z
    .number()
    .int('Harga harus bilangan bulat')
    .positive('Harga harus lebih dari 0')
    .nullable()
    .optional(),
  priceMode: priceModeSchema.default('fixed'),
  priceUnit: z
    .string()
    .max(20, 'Satuan harga maksimal 20 karakter')
    .nullable()
    .optional(),
  availability: menuAvailabilitySchema.default('available'),
  sortOrder: z.number().int().min(0).default(0),
  focalX: z.number().min(0).max(1).default(0.5),
  focalY: z.number().min(0).max(1).default(0.5),
  altText: z.string().max(120).optional(),
});

export const loginFormSchema = z.object({
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(6, 'Kata sandi minimal 6 karakter'),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Format email tidak valid'),
});

export const resetPasswordSchema = z.object({
  password: z.string().min(6, 'Kata sandi minimal 6 karakter'),
  confirmPassword: z.string().min(6, 'Konfirmasi kata sandi minimal 6 karakter'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Konfirmasi kata sandi tidak cocok',
  path: ['confirmPassword'],
});

export const siteSettingsSchema = z.object({
  brandName: z.string().min(2).max(50),
  tagline: z.string().max(100),
  address: z.string().max(250).nullable().optional(),
  whatsapp: z.string().max(20).nullable().optional(),
  mapsUrl: z.string().url('URL Google Maps harus valid').nullable().optional().or(z.literal('')),
});
