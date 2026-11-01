# Pawon Tentrem — Rumah Makan Prasmanan Jawa

Website resmi dan sistem manajemen menu harian untuk rumah makan prasmanan **Pawon Tentrem**, dibangun menggunakan **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS**, **Supabase (PostgreSQL & Auth & Storage)**, dan di-deploy pada **Cloudflare Workers** menggunakan adapter `@opennextjs/cloudflare`.

🌐 **URL Produksi Cloudflare:** [https://pawontentrem.askaraindonesiacompany.workers.dev](https://pawontentrem.askaraindonesiacompany.workers.dev)

---

## 🍽️ Fitur Utama

1. **Menu Hari Ini (Pusat Pengalaman Publik):**
   - Waktu lokal **Asia/Jakarta (WIB)**: Pergantian hari otomatis tengah malam WIB.
   - Slideshow foto sajian berasio 4:3 dengan tombol Jeda/Putar, kontrol berikutnya/sebelumnya, serta indikator slide.
   - Filter kategori masakan: *Semua*, *Lauk*, *Sayur*, *Pelengkap*, *Sambal*, dan *Minuman*.
   - Format harga opsional (nullable): Jika harga kosong, sistem tidak menampilkan `Rp0` atau kolom kosong.
   - Indikator ketersediaan real-time (*Tersedia* dan *Habis hari ini*).
   - Polling pembaruan berkala setiap 60 detik dan saat pengunjung kembali membuka tab peramban.

2. **Sistem Desain Tradisional Jawa (Batik Patterns):**
   - Visual hangat dengan token warna: *Beras* (`#F7F1E5`), *Kertas* (`#FFFDF8`), *Daun* (`#274B3A`), *Kayu* (`#6B4A32`), *Kunyit* (`#C59A48`), dan *Tinta* (`#262B25`).
   - Tipografi editorial **Lora** untuk heading dan **Plus Jakarta Sans** untuk antarmuka serta dashboard.
   - Enam aset motif Jawa berlisensi: `kawung-brown`, `kawung-cream`, `parang-brown`, `truntum-gold`, `lurik-green`, dan `sulur-divider-brown`.
   - Dukungan aksesibilitas penuh (WCAG 2.2 AA) dan preferensi `prefers-reduced-motion`.

3. **Ruang Kerja Pengelola (Dashboard Admin):**
   - Tombol utama **+ Tambah Menu Hari Ini** dan **Salin dari Tanggal Lain**.
   - Alur cepat input foto: pilihan **Ambil Foto** (kamera langsung) atau **Pilih dari Galeri**.
   - Input nama menu wajib, dengan detail tambahan opsional (harga, satuan porsi, status ketersediaan, titik fokus foto).
   - Transaksi **Publikasi Atomik**: Perubahan draf tidak langsung memengaruhi tampilan publik hingga admin menekan **Terbitkan Menu Hari Ini**.
   - Riwayat menu masa lalu, pengelolaan media & foto, konten website, galeri publik, pengaturan kontak/lokasi/WhatsApp, manajemen peran pengguna (*Owner* & *Editor*), serta audit log jejak aktivitas.

---

## 📂 Struktur Proyek

```text
├── src/
│   ├── app/
│   │   ├── (public)/              # Rute publik (Beranda, Menu, Cerita, Galeri, Lokasi, Privasi, Kredit)
│   │   ├── admin/                 # Rute pengelola (Login, Lupa Sandi, Reset Sandi, Dashboard, dsb.)
│   │   ├── api/                   # Route Handlers (Public Today API, Media Signer, Uploads)
│   │   └── auth/callback/         # Supabase Auth callback handler
│   ├── components/                # Komponen antarmuka publik dan admin
│   ├── lib/                       # Modul Supabase, Cloudflare, waktu WIB, validasi Zod
│   ├── styles/                    # Tailwind CSS, motif Jawa & animasi
│   └── types/                     # Definisi tipe TypeScript
├── public/assets/
│   ├── patterns/                  # 6 ornamen Jawa PNG (Kawung, Parang, Truntum, Lurik, Sulur)
│   └── photos/                    # Foto ilustrasi terbuka bersumber Wikimedia Commons
├── supabase/
│   ├── migrations/                # Migration SQL PostgreSQL + RLS + RPC publikasi atomik
│   └── seed.sql                   # Data awal pengaturan usaha dan jam buka reguler
├── tests/
│   └── unit/                      # Pengujian Vitest (WIB time boundaries, harga nullable, validasi)
├── docs/                          # Dokumentasi SETUP, ADMIN_GUIDE, DEPLOYMENT, VALIDATION
├── wrangler.jsonc                 # Konfigurasi Cloudflare Workers
└── open-next.config.ts            # Konfigurasi OpenNext Cloudflare adapter
```

---

## 🚀 Menjalankan Secara Lokal

1. **Instal dependensi:**
   ```bash
   npm install
   ```

2. **Siapkan variabel lingkungan:**
   ```bash
   cp .env.example .env.local
   ```

3. **Jalankan tes & verifikasi:**
   ```bash
   npm run verify
   ```

4. **Jalankan server pengembangan:**
   ```bash
   npm run dev
   ```

5. **Build dan preview Cloudflare Workers:**
   ```bash
   npm run build:cloudflare
   npm run preview:cloudflare
   ```

---

## 🛡️ Hak Cipta & Lisensi

Foto ilustrasi masakan pada mode prototipe berlisensi Creative Commons (CC BY-SA). Lihat rincian pembuat dan atribusi pada `/kredit-foto` atau file `assets/PHOTO_CREDITS.md`.
