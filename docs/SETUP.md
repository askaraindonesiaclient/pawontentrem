# Panduan Pengaturan (Setup Guide) — Pawon Tentrem

Dokumen ini menjelaskan cara menyiapkan lingkungan lokal, konfigurasi Supabase, dan Cloudflare Workers untuk pengembangan serta pemeliharaan situs web Pawon Tentrem.

---

## 1. Kebutuhan Sistem

- **Node.js**: Versi 22.x atau yang kompatibel (lihat `.nvmrc`)
- **Package Manager**: `npm`
- **Git**: Versi 2.x
- **Akun Cloudflare**: Akses ke Cloudflare Workers & Cloudflare Images
- **Akun Supabase**: Project reference `yysctpfwpoxgspusdyta`

---

## 2. Langkah Instalasi

1. Clone repositori:
   ```bash
   git clone https://github.com/askaraindonesiaclient/pawontentrem.git
   cd pawontentrem
   ```

2. Instal seluruh dependensi:
   ```bash
   npm ci
   ```

3. Konfigurasi file environment lokal (`.env.local`):
   ```dotenv
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_SUPABASE_URL=https://yysctpfwpoxgspusdyta.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<SUPABASE_ANON_OR_PUBLISHABLE_KEY>
   SUPABASE_URL=https://yysctpfwpoxgspusdyta.supabase.co
   SUPABASE_PUBLISHABLE_KEY=<SUPABASE_ANON_OR_PUBLISHABLE_KEY>
   SUPABASE_SECRET_KEY=<SUPABASE_SERVICE_ROLE_SECRET>
   RESTAURANT_TIMEZONE=Asia/Jakarta
   APP_MODE=production
   ```

---

## 3. Menyiapkan Basis Data Supabase

File migrasi skema lengkap tersedia di:
`supabase/migrations/20261101000001_initial_schema.sql`

Untuk menerapkan skema ke project Supabase:
1. Masuk ke Dashboard Supabase pada project `yysctpfwpoxgspusdyta`.
2. Buka **SQL Editor** -> **New Query**.
3. Buka berkas `supabase/migrations/20261101000001_initial_schema.sql`, salin seluruh isinya, dan klik **Run**.
4. Buka berkas `supabase/seed.sql`, salin isinya, dan klik **Run** untuk mengisi pengaturan identitas awal dan jam buka.
5. Buat dua Storage Bucket di Supabase Storage (keduanya diset **Private**):
   - `menu-originals` (Penyimpanan foto asli hasil jepretan kamera / unggahan)
   - `menu-web` (Penyimpanan turunan gambar WebP beresolusi teroptimasi)

---

## 4. Pengujian dan Verifikasi Kode

Jalankan rangkaian pemeriksaan otomatis:
```bash
# Typecheck TypeScript tanpa kompilasi
npm run typecheck

# Pengujian unit Vitest (waktu WIB, validasi harga, Zod schemas)
npm run test:unit

# Verifikasi gabungan
npm run verify
```

---

## 5. Build Cloudflare Workers

Aplikasi menggunakan OpenNext adapter untuk Cloudflare:
```bash
# Build artefak OpenNext (.open-next/worker.js dan .open-next/assets)
npm run build:cloudflare

# Deploy ke Cloudflare Workers
npm run deploy:cloudflare
```
