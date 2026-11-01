# Panduan Deployment Cloudflare & Supabase — Pawon Tentrem

Dokumen ini mencatat konfigurasi deployment pada Cloudflare Workers dan integrasi ke Supabase.

---

## 1. Lingkungan Produksi Aktif

- **Worker Name**: `pawontentrem`
- **Cloudflare Account ID**: `953726b9d6c55b335756869db92de91a`
- **Cloudflare Account Email**: `askaraindonesiacompany@gmail.com`
- **Live URL**: `https://pawontentrem.askaraindonesiacompany.workers.dev`
- **Compatibility Date**: `2026-11-01`
- **Compatibility Flags**: `["nodejs_compat"]`
- **Framework Adapter**: `@opennextjs/cloudflare`
- **Supabase Project URL**: `https://yysctpfwpoxgspusdyta.supabase.co`
- **Supabase Project Reference**: `yysctpfwpoxgspusdyta`
- **GitHub Repository**: `https://github.com/askaraindonesiaclient/pawontentrem.git`
- **Branch**: `main`

---

## 2. Binding Worker & Lingkungan

Konfigurasi `wrangler.jsonc`:
```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "pawontentrem",
  "main": ".open-next/worker.js",
  "compatibility_date": "2026-11-01",
  "compatibility_flags": ["nodejs_compat"],
  "workers_dev": true,
  "assets": {
    "directory": ".open-next/assets",
    "binding": "ASSETS"
  },
  "images": {
    "binding": "IMAGES"
  },
  "vars": {
    "SUPABASE_URL": "https://yysctpfwpoxgspusdyta.supabase.co",
    "RESTAURANT_TIMEZONE": "Asia/Jakarta",
    "APP_MODE": "production"
  },
  "observability": {
    "enabled": true
  }
}
```

---

## 3. Matriks Variabel Lingkungan

| Variabel | Lingkungan | Keterangan |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Build Next.js | `https://yysctpfwpoxgspusdyta.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Build Next.js | Publishable/Anon key Supabase |
| `SUPABASE_URL` | Runtime Worker | `https://yysctpfwpoxgspusdyta.supabase.co` |
| `SUPABASE_PUBLISHABLE_KEY` | Runtime Worker | Secret/variable runtime Worker |
| `SUPABASE_SECRET_KEY` | Runtime Worker | Secret server (service role) untuk penandatanganan media privat |
| `RESTAURANT_TIMEZONE` | Runtime Worker | `Asia/Jakarta` |
| `APP_MODE` | Runtime Worker | `production` |

---

## 4. Perintah Deployment

Setiap kali melakukan pembaruan kode:
```bash
# 1. Jalankan pengujian dan verifikasi
npm run verify

# 2. Build untuk OpenNext
npm run build:cloudflare

# 3. Deploy langsung ke Cloudflare Workers
npm run deploy:cloudflare
```
