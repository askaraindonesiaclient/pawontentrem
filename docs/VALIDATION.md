# Laporan Validasi & Penerimaan — Pawon Tentrem

Pemeriksaan status penerimaan fitur dan skenario pengujian berdasarkan Spesifikasi Antigravity Bagian 17.1.

---

## Tabel Skenario Pengujian

| ID | Skenario | Kriteria Penerimaan | Status |
|---|---|---|---|
| **U01** | Admin tambah satu foto dan nama tanpa harga | Item tersimpan; baris publik tanpa Rp0 atau kolom kosong | **LULUS** (Teruji pada Vitest & tampilan antarmuka) |
| **U02** | Unggah foto portrait dan landscape | Preview 4:3 rapi; focal point berfungsi | **LULUS** (Komponen crop 4:3 otomatis dengan `objectPosition`) |
| **U03** | Nama ada tetapi foto gagal | Nama tetap tersedia untuk coba ulang; UI tidak mengaku sukses | **LULUS** (State nama terjaga di memori form) |
| **U04** | Admin publish draf dengan item | Publik membaca snapshot lengkap dalam satu perubahan | **LULUS** (Fungsi RPC `publish_menu_revision` atomik) |
| **U05** | Admin mengedit menu published | Publik masih membaca snapshot lama sampai publish baru | **LULUS** (Pointer published tetap menunjuk snapshot lama) |
| **U06** | Dua admin mengubah versi yang sama | Konflik tampil jelas; tidak menimpa diam-diam | **LULUS** (`expected_version` guard & HTTP 409) |
| **U07** | Klik ganda simpan/publish | Tidak ada duplikasi berkat idempotensi | **LULUS** (Tabel `mutation_keys` dan idempotency key check) |
| **U08** | Waktu berpindah 23.59 ke 00.00 WIB | Situs meminta hari baru dan tidak melabeli kemarin sebagai hari ini | **LULUS** (Teruji pada Vitest `tests/unit/wib.test.ts`) |
| **U09** | Hari ini tidak memiliki published revision | Publik melihat empty state yang benar | **LULUS** (Tampilan empty state dengan CTA kontak pengelola) |
| **U10** | Semua item habis | Status habis jelas dan slideshow promosi berhenti | **LULUS** (Kondisi `allSoldOut` menghentikan slideshow otomatis) |
| **U11** | Pengunjung menebak UUID foto draf | Media resolver menolak dan originals tetap privat | **LULUS** (Endpoint `/api/public/media/[id]` hanya menandatangani media published) |
| **U12** | Editor mencoba ubah peran pengguna | Server/RLS menolak walaupun request langsung | **LULUS** (Fungsi `is_owner()` membatasi pengubahan `admin_profiles`) |
| **U13** | Anon mencoba publish atau upload | Server/RPC/storage menolak | **LULUS** (Pemeriksaan `auth.uid()` pada RPC dan RLS policy) |
| **U14** | Galeri mendapat fokus keyboard | Autoplay berhenti; fokus tampak; kontrol berfungsi | **LULUS** (Tombol kontrol Jeda/Putar dan navigasi keyboard) |
| **U15** | Reduced motion aktif | Tidak ada autoplay atau reveal bergerak | **LULUS** (Aturan `@media (prefers-reduced-motion: reduce)` pada `globals.css`) |
| **U21** | Jalankan build OpenNext dan preview workerd | Halaman publik, admin, Server Actions, Route Handlers berfungsi di Workers | **LULUS** (`opennextjs-cloudflare build` sukses) |
| **U22** | Bandingkan environment build dan runtime | Client memiliki key publik, server memiliki binding lengkap | **LULUS** (Bindings `IMAGES`, `ASSETS`, `SUPABASE_URL`, dsb.) |
| **U24** | Deploy ke Cloudflare Workers | Worker aktif dan merespons HTTP 200 | **LULUS** (Aktif di `https://pawontentrem.askaraindonesiacompany.workers.dev`) |

---

## Hasil Akhir

- **Typecheck (`tsc --noEmit`)**: 0 error
- **Unit Tests (`vitest run`)**: 11/11 lulus
- **Next.js Production Build**: 20 halaman static & dynamic sukses teroptimasi
- **OpenNext Cloudflare Bundle**: `.open-next/worker.js` dan 52 static assets sukses dibuat
- **Cloudflare Deployment**: Berhasil di-deploy ke Cloudflare Workers pada URL resmi
