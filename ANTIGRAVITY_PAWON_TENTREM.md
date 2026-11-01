# Pawon Tentrem | Spesifikasi Implementasi Antigravity

Versi 1.1 | Revisi Cloudflare, GitHub, dan Supabase | 1 November 2026 | Bahasa antarmuka: Indonesia | Zona waktu: Asia/Jakarta

## 0. Instruksi awal untuk Antigravity

Bangun website rumah makan prasmanan bernama **Pawon Tentrem** menggunakan Next.js App Router, React, dan TypeScript. Baca seluruh dokumen ini, PDF `PAWON_TENTREM_DESIGN_PLAN.pdf`, serta `assets/ASSET_GUIDE.md` sebelum menulis implementasi. Gunakan rancangan visual PDF sebagai arah komposisi dan dokumen ini sebagai sumber aturan perilaku. Utamakan fitur Menu Hari Ini yang nyata, pengelolaan foto yang mudah, serta tampilan mobile yang rapi. Jangan berhenti pada landing page atau dashboard dengan data palsu.

Kerjakan desain, koneksi basis data, autentikasi, unggah foto, pengolahan gambar, publikasi, pengujian, push kode, deployment, dan dokumentasi penggunaan sampai alur utama berfungsi. Gunakan hanya target yang bagian 0.3 tetapkan. Ketika kredensial belum tersedia, siapkan integrasi produksi dan jelaskan konfigurasi yang masih kurang; mode demo harus memakai label yang jelas. Jangan menyatakan bahwa penyimpanan atau publikasi produksi berhasil ketika aplikasi hanya mengubah state lokal. Jangan membeli layanan atau mengirim pesan kepada pihak lain tanpa instruksi pemilik.

Dokumen ini menjadi sumber teknis utama versi 1.1. PDF tetap memberi arah visual; ketentuan Cloudflare, runtime, pengolahan foto, environment, dan deployment dalam MD ini menggantikan penjelasan hosting generik pada versi awal PDF. Pertahankan seluruh fitur, tema Jawa, halaman, dan alur admin yang dokumen ini uraikan.

### 0.1 Sasaran penerimaan utama

1. Pengunjung melihat Menu Hari Ini pada beranda, tepat setelah hero yang ringkas.
2. Admin yang baru masuk langsung melihat tombol besar **Tambah Menu Hari Ini**.
3. Admin mengambil foto melalui ponsel atau memilih berkas, mengisi nama, dan menerbitkan menu tanpa menyusun kartu secara manual.
4. Sistem menyusun foto, urutan, kategori, potongan gambar, dan daftar tulisan secara konsisten.
5. Pengunjung membaca nama menu dan harga opsional tanpa menunggu slideshow.
6. Sistem menampilkan menu sesuai tanggal lokal Asia/Jakarta dan menolak menu kedaluwarsa sebagai menu hari ini.
7. Admin mengelola seluruh halaman konten melalui antarmuka berbahasa Indonesia.
8. Pengguna mengoperasikan situs pada mobile dan desktop, termasuk keyboard dan pengaturan reduced motion.

### 0.2 Batas fakta dan konten

Pemilik belum memberikan logo resmi, alamat terverifikasi, nomor WhatsApp, jam buka, daftar harga, fasilitas, kisah pendirian, maupun foto usaha. Gunakan konfigurasi kosong dan tampilan bantuan untuk seluruh data tersebut. Jangan mengambil data usaha bernama serupa dari hasil pencarian. Jangan mengarang rating Google, testimoni, jumlah pelanggan, sertifikat halal, harga, diskon, tanggal berdiri, atau fasilitas. Contoh nama makanan dalam dokumen hanya berfungsi sebagai data demonstrasi. Hapus seluruh data demonstrasi dari produksi.

Referensi pengguna: https://share.google/uYJiHjvfyUAn0SwJx. Pemeriksaan tautan mengarah ke pencarian Google “Pawon Tentrem” dengan identifier `/g/11yphzz2xz`, tetapi pemeriksaan belum memastikan profil, alamat, atau hak penggunaan fotonya. Dua tangkapan layar pengguna memberi arah komposisi restoran: foto makanan dominan, ruang kosong, blok cerita berselang, dan katalog yang tertib. Ambil prinsip komposisinya, lalu bangun identitas baru sesuai rumah makan Jawa.

### 0.3 Target proyek yang pemilik tetapkan

| Komponen | Nilai yang harus implementasi gunakan |
|---|---|
| Repository | `https://github.com/askaraindonesiaclient/pawontentrem.git` |
| Pemilik repository | `askaraindonesiaclient` |
| Repository slug | `pawontentrem` |
| Branch utama | `main` |
| Hosting aplikasi | Cloudflare Workers, aplikasi Next.js melalui adapter `@opennextjs/cloudflare` |
| Nama Worker | `pawontentrem` |
| Project URL Supabase | `https://yysctpfwpoxgspusdyta.supabase.co` |
| Project reference Supabase | `yysctpfwpoxgspusdyta` |
| Basis data | Supabase Postgres, melalui Data API HTTPS dan RPC |
| Autentikasi admin | Supabase Auth |
| Penyimpanan foto | Supabase Storage privat, bucket `menu-originals` dan `menu-web` |
| Pemrosesan foto | Cloudflare Images binding `IMAGES`, hasil tetap masuk Supabase Storage |
| Domain produksi | Isi dari URL deployment Cloudflare yang benar-benar berhasil; pemilik belum menetapkan custom domain |

Pemeriksaan awal GitHub pada 1 November 2026 menunjukkan repository kosong dan default branch `main`. Revisi MD ini menambahkan spesifikasi; pengembang masih perlu membangun source website. Jangan menyimpulkan bahwa website, tabel Supabase, akun admin, atau Worker sudah ada hanya karena URL target tersedia.

Pemilik baru memberikan URL Supabase. URL tersebut tidak memuat publishable key, server secret, kredensial CLI, ataupun kata sandi basis data. Sediakan tempat konfigurasi dan gunakan secret manager lokal/Cloudflare untuk nilainya. Jangan menebak key, mengekstrak token dari tangkapan layar, atau meminta pemilik menaruh server secret dalam repository publik.

### 0.4 Keputusan deployment dan kompatibilitas

Gunakan **Cloudflare Workers + OpenNext** untuk mempertahankan build resmi `next build` dan fitur server pada kontrak proyek ini. Tangkapan layar pengguna memperlihatkan halaman pembuatan Pages; arahkan langkah implementasi ke pembuatan Worker. Jangan memakai `output: 'export'`, direktori `out`, atau drag-and-drop aset statis untuk aplikasi yang masih membutuhkan Server Actions, Route Handlers, autentikasi, serta penanda tangan foto privat.

Dokumentasi Cloudflare saat pemeriksaan merekomendasikan vinext untuk proyek baru dan tetap mendokumentasikan konfigurasi OpenNext manual [T7, T8]. Proyek ini memilih OpenNext secara sengaja karena pemilik meminta Next.js dan dokumen mempertahankan toolchain build Next.js. Jangan menyebut OpenNext sebagai rekomendasi default Cloudflare saat ini. Jangan menjalankan konfigurasi otomatis Wrangler yang mengganti toolchain menjadi vinext tanpa menilai dan menjelaskan perubahan kontrak. Periksa matriks dukungan adapter sebelum mengunci versi Next.js dan React [T9].

## 1. Konsep dan prioritas produk

Pawon Tentrem menghadirkan suasana makan rumahan dengan bahasa visual Jawa yang hangat. Gunakan pesan utama “Rasa rumahan, suasana yang menentramkan.” sebagai usulan copy, bukan sebagai klaim faktual usaha. Bangun suasana melalui krem beras, hijau daun, cokelat kayu, foto makanan yang jujur, dan ornamen halus. Tempatkan motif pada area jeda dan batas bagian agar informasi menu tetap menonjol.

Produk versi pertama mencakup katalog menu harian, informasi usaha, galeri, kontak, serta dashboard internal. Arahkan pertanyaan pengunjung ke WhatsApp setelah pemilik mengisi nomor. Jangan membuat keranjang, pembayaran, checkout, akun pelanggan, atau konfirmasi reservasi otomatis pada versi pertama. Tombol “Tanya via WhatsApp” membuka aplikasi percakapan dengan pesan awal dan tidak menjanjikan bahwa dapur sudah menerima pesanan.

Prioritas P0 meliputi beranda, menu harian, autentikasi admin, unggah foto, publikasi atomik, dan pergantian tanggal. Prioritas P1 meliputi seluruh halaman profil, galeri, lokasi, pengelolaan informasi usaha, riwayat, serta pencatatan aktivitas. Prioritas P2 meliputi analitik agregat dan penyempurnaan editorial. Selesaikan P0 dan P1 sebelum menyebut versi pertama selesai.

## 2. Sistem desain

### 2.1 Token warna

| Token | Nilai | Pemakaian |
|---|---|---|
| `--rice` | `#F7F1E5` | Latar utama hangat |
| `--paper` | `#FFFDF8` | Kartu, formulir, bidang menu |
| `--leaf` | `#274B3A` | CTA utama, heading kecil, footer |
| `--wood` | `#6B4A32` | Garis ornamen, aksen editorial |
| `--turmeric` | `#C59A48` | Ornamen dan aksen dekoratif |
| `--ink` | `#262B25` | Teks utama |
| `--muted` | `#62665C` | Teks pendukung |
| `--line` | `#DCD6C8` | Pembatas dan outline |
| `--danger` | `#9B3232` | Galat dan tindakan hapus |
| `--success-bg` | `#E8F0E7` | Latar status tersedia |

Gunakan putih hangat pada tombol hijau. Jangan memakai kuning kunyit sebagai warna teks kecil di atas krem. Uji kontras pasangan aktual dengan alat aksesibilitas, termasuk hover, disabled, focus, dan status. Tampilkan ikon atau tulisan bersama warna status.

### 2.2 Tipografi dan ritme

Gunakan **Lora** untuk heading editorial publik dan **Plus Jakarta Sans** untuk body, navigasi, angka harga, serta seluruh dashboard. Muat melalui `next/font` atau berkas lokal resmi yang menyertakan lisensi SIL OFL. Gunakan fallback Georgia untuk serif dan system-ui untuk sans. Jangan memakai aksara Jawa sebagai label navigasi atau teks penting karena pemilik belum memberikan transliterasi yang terverifikasi.

| Elemen | Desktop | Mobile | Tinggi baris |
|---|---|---|---|
| Hero H1 | 60-68 px | 36-40 px | 1,08-1,15 |
| Judul bagian H2 | 38-44 px | 28-32 px | 1,2 |
| H3 | 24-28 px | 22-24 px | 1,3 |
| Isi | 16-18 px | 16 px | 1,6 |
| Label/formulir | 14-16 px | 16 px input | 1,4 |
| Keterangan | 13-14 px | 13-14 px | 1,5 |

Pakai skala jarak 4, 8, 12, 16, 24, 32, 48, 64, 96, dan 120 px. Batasi konten publik pada 1200 px dengan gutter 24-32 px desktop dan 20 px mobile. Gunakan radius 16 px pada kartu, 12 px pada input, dan 999 px pada filter. Batasi bayangan pada permukaan yang benar-benar mengambang. Gunakan garis tipis sebagai pemisah utama.

### 2.3 Komponen inti

Bangun `SiteHeader`, `MobileNavigation`, `SiteFooter`, `PageHeading`, `SectionHeading`, `PrimaryButton`, `SecondaryButton`, `DailyMenuSection`, `DailyMenuGallery`, `DailyMenuTextList`, `CategoryFilters`, `AvailabilityBadge`, `MenuItemRow`, `FoodPhotoCard`, `GalleryGrid`, `ContactPanel`, dan `EmptyState`. Buat state loading, kosong, galat, disabled, focus, serta aktif untuk komponen interaktif. Pisahkan komponen administratif agar dashboard tetap bersih dan fungsional.

Bangun komponen admin `AdminShell`, `TodaySummary`, `QuickAddButton`, `PhotoUploader`, `PhotoCropPreview`, `SimpleMenuForm`, `AdvancedFields`, `DraftIndicator`, `PublishBar`, `PublicationPreview`, `MenuEditorList`, `MoveItemControls`, `ConfirmDialog`, dan `Toast`. Gunakan komponen aksesibel yang telah teruji sebagai fondasi, lalu sesuaikan warna dan spasinya. Jangan menampilkan statistik penjualan karena versi pertama belum mengelola transaksi.

## 3. Arsitektur informasi dan seluruh rute

### 3.1 Halaman publik

| Rute | Judul | Blok utama | CTA utama |
|---|---|---|---|
| `/` | Beranda | Hero, Menu Hari Ini, cara prasmanan, cerita singkat, galeri, lokasi ringkas | Lihat Menu Hari Ini |
| `/menu-hari-ini` | Menu Hari Ini | Tanggal lokal, status pembaruan, slideshow, filter, daftar lengkap, informasi ketersediaan | Tanya Menu |
| `/tentang` | Cerita Pawon | Pembuka, cerita pemilik, nilai pelayanan, foto dapur/usaha, CTA kunjungan | Lihat Lokasi |
| `/galeri` | Suasana Pawon | Filter makanan/suasana/kegiatan, grid, lightbox, kredit foto | Tanya via WhatsApp |
| `/lokasi-kontak` | Mampir ke Pawon | Alamat, jam buka, pengecualian hari libur, WhatsApp, tautan arah, fasilitas terverifikasi | Petunjuk Arah |
| `/privasi` | Kebijakan Privasi | Data yang aplikasi proses, penyedia layanan, retensi, kontak pemilik | Hubungi Pengelola |
| `/kredit-foto` | Kredit Foto | Nama pembuat, sumber, lisensi, perubahan setiap foto pihak ketiga | Buka sumber |
| `not-found.tsx` | Halaman Belum Tersedia | Pesan singkat, navigasi kembali | Kembali ke Beranda |
| `error.tsx` | Ada Kendala | Pesan aman dan tombol mencoba ulang | Coba Lagi |

Gunakan navigasi utama “Beranda”, “Menu Hari Ini”, “Cerita Pawon”, “Galeri”, dan “Lokasi”. Jangan menaruh login admin pada menu utama. Tampilkan tautan kebijakan privasi dan kredit foto di footer. Buat konten halaman menjadi koleksi bertipe atau field terstruktur, bukan editor HTML bebas.

### 3.2 Halaman admin

| Rute | Tujuan dan isi |
|---|---|
| `/admin/login` | Email, kata sandi, tampil/sembunyikan kata sandi, lupa kata sandi, pesan galat umum |
| `/admin/lupa-kata-sandi` | Permintaan tautan pemulihan dengan respons umum |
| `/admin/reset-kata-sandi` | Formulir kata sandi baru setelah token valid |
| `/admin` | Tanggal, tombol Tambah Menu Hari Ini, status publikasi, daftar ringkas, bantuan singkat |
| `/admin/menu-harian` | Pemilih tanggal, draf, pratinjau, menu, ketersediaan, urutan, publikasi |
| `/admin/menu-harian/tambah` | Alur foto, nama, opsi tambahan, simpan/tambah lagi |
| `/admin/menu-harian/[date]/[entryId]` | Ubah item pada revisi draf, crop, nama, kategori, harga, status |
| `/admin/riwayat` | Kalender/daftar tanggal, lihat revisi, salin sebagai draf tanggal baru |
| `/admin/media` | Foto milik usaha, status pemrosesan, penggunaan foto, kredit dan hak pemakaian |
| `/admin/konten` | Hero, cerita, langkah prasmanan, CTA, pengaturan tampil/sembunyi bagian |
| `/admin/galeri` | Album, foto, caption, alt, kategori, urutan, publikasi |
| `/admin/pengaturan` | Identitas, kontak, lokasi, jam, pengecualian hari, sosial, SEO, zona waktu tetap |
| `/admin/pengguna` | Khusus pemilik: undang editor, aktif/nonaktif, peran, reset akses |
| `/admin/aktivitas` | Khusus pemilik: siapa mengubah apa, kapan, dan hasil publikasi |
| `/admin/panduan` | Tutorial pendek bergambar dan checklist membuka hari |

Semua rute admin membutuhkan sesi valid kecuali login dan alur pemulihan. Akun pemilik pertama harus melalui prosedur bootstrap sisi server. Jangan membuka registrasi publik. Pemilik dapat mengundang editor; editor dapat mengelola menu, konten, galeri, dan media, tetapi tidak dapat mengubah peran atau pengaturan keamanan. Peran bukan field yang pengguna boleh ubah melalui formulir profil.

## 4. Rancangan rinci halaman publik

### 4.1 Beranda

1. **Header**: wordmark Pawon Tentrem di kiri, lima tautan di kanan, CTA lokasi. Tinggi 80 px desktop dan 64 px mobile. Sticky dengan latar solid setelah scroll. Jangan menutupi fokus keyboard atau anchor tujuan.
2. **Hero ringkas**: desktop memakai dua kolom 46:54, teks di kiri dan foto makanan 4:3 di kanan. Eyebrow “Rumah makan prasmanan”; H1 “Rasa rumahan, suasana yang menentramkan.”; body “Pilih lauk dan sayur sesuai selera. Lihat sajian hari ini sebelum mampir.”; CTA primer ke `#menu-hari-ini`; CTA sekunder ke lokasi. Mobile menaruh teks lebih dulu, foto berikutnya dengan tinggi maksimum 220 px. Hindari hero setinggi satu layar yang menunda akses menu.
3. **Menu Hari Ini**: judul, tanggal lengkap, waktu pembaruan, indikator status, link daftar lengkap. Desktop memakai foto 48% dan daftar 52%. Mobile memakai foto 4:3, kontrol galeri, filter, lalu daftar tulisan. Muat bagian ini pada respons awal server.
4. **Cara menikmati prasmanan**: tiga langkah ringkas “Ambil piring”, “Pilih lauk dan sayur”, “Tanyakan perhitungan ke kasir”. Tandai langkah sebagai usulan sampai pemilik memastikan prosedur sebenarnya. Tampilkan hanya langkah yang pemilik setujui.
5. **Cerita singkat**: foto asli di satu sisi, 60-90 kata cerita pemilik di sisi lain. Jika pemilik belum mengisi cerita, sembunyikan blok daripada membuat sejarah usaha.
6. **Galeri**: maksimum empat foto terkurasi pada desktop dan dua kolom mobile, tautan lihat semua. Sertakan alt yang bermakna.
7. **Mampir ke Pawon**: alamat, jam hari ini, kontak, tombol arah. Tampilkan “Informasi lokasi segera hadir” jika alamat belum lengkap. Jangan menampilkan tombol arah dengan tujuan palsu.
8. **Footer**: wordmark, kalimat pendek, kontak nyata, tautan privasi/kredit. Motif kawung krem pada hijau hanya berfungsi sebagai dekorasi.

### 4.2 Menu Hari Ini

Gunakan tanggal restoran dari server sebagai sumber kebenaran. Tampilkan contoh format “Minggu, 1 November 2026” dan “Diperbarui pukul 09.15 WIB” dari data aktual. Pengunjung dapat memfilter Semua, Lauk, Sayur, Pelengkap, Sambal, dan Minuman. Urutkan kategori melalui konfigurasi dan item melalui `sort_order`; tempatkan item habis setelah item tersedia dalam kategori yang sama tanpa menghilangkan informasinya.

Pisahkan galeri foto dari daftar tulisan. Daftar harus memuat seluruh nama menu meskipun admin belum menambahkan foto. Harga `null` menghilangkan bidang harga sepenuhnya; jangan menggantinya dengan Rp0. Tampilkan keterangan umum “Harga mengikuti pilihan dan porsi. Tanyakan kepada kasir.” hanya jika pemilik mengaktifkan kebijakan tersebut. Jika admin mengisi harga, tampilkan format `Rp12.000 / potong` atau unit sebenarnya. Hindari label “mulai dari” kecuali admin memilih tipe harga tersebut secara eksplisit.

Galeri memakai foto item tersedia yang sudah selesai diproses. Tampilkan caption sesuai item aktif; tampilkan kontrol sebelumnya/berikutnya, indikator posisi, dan tombol jeda. Jika hanya ada satu foto, tampilkan gambar statis. Jika tidak ada foto, hilangkan galeri dan perluas daftar tulisan. Jangan memasangkan foto makanan lain sebagai pengganti foto item tertentu.

### 4.3 Cerita Pawon

Gunakan hero judul, narasi pemilik 3-5 paragraf pendek, satu atau dua foto usaha, nilai pelayanan yang pemilik setujui, dan ajakan berkunjung. Dashboard memberi field judul, intro, body berbasis paragraf, foto, serta caption. Batasi panjang dan gunakan Markdown terbatas atau renderer rich text yang aman. Jangan menyisipkan script, iframe bebas, atau HTML mentah dari editor.

### 4.4 Galeri

Gunakan grid yang mempertahankan rasio foto melalui sel 4:3 dan 1:1 yang teratur. Hindari masonry yang mengubah urutan baca keyboard. Filter hanya mengubah data yang terlihat; jangan mengubah URL menjadi rute tidak valid. Lightbox memberi caption, kredit, tombol tutup, tombol berikut/sebelumnya, focus trap, Escape untuk menutup, dan pengembalian fokus ke thumbnail. Jangan memaksa autoplay atau video bersuara.

### 4.5 Lokasi dan kontak

Gunakan kolom informasi dan panel peta opsional. Tautan Petunjuk Arah membuka URL Google Maps yang pemilik validasi. Muat peta pihak ketiga setelah pengunjung menekan “Muat peta”; sediakan tautan arah yang tetap bekerja tanpa embed. Pengaturan menyimpan jam reguler per hari, tutup harian, serta pengecualian tanggal. Hitung status “Buka sekarang” hanya ketika zona waktu, jam, dan pengecualian lengkap. Jika data belum lengkap, tampilkan jadwal teks yang tersedia tanpa menyimpulkan status.

### 4.6 Privasi dan kredit

Jelaskan pemrosesan akun admin, foto, log aktivitas, cookies sesi, kontak pengelola, serta retensi yang pemilik tetapkan. Tulis kebijakan sesuai implementasi aktual, bukan template yang menjanjikan hal yang belum tersedia. Halaman kredit memuat sumber dan lisensi foto contoh apabila pemilik memilih mempertahankannya. Jangan menyebut foto ilustrasi pihak lain sebagai suasana Pawon Tentrem.

## 5. Menu harian: aturan domain yang wajib konsisten

### 5.1 Entitas dan status

Satu `menu_day` mewakili satu tanggal layanan lokal. Entitas tersebut dapat memiliki beberapa revisi; hanya satu revisi published yang menjadi sumber publik. Revisi draf tidak mengubah revisi published. Ketika admin mengubah item yang sudah tayang, sistem membuat draf baru dari snapshot terakhir. Publikasi memindahkan pointer published melalui transaksi sehingga pengunjung tidak pernah membaca separuh perubahan.

| Kondisi | Tindakan sistem | Pesan publik |
|---|---|---|
| Hari ini memiliki published revision dengan item tersedia | Tampilkan galeri dan daftar terbaru | Menu Hari Ini |
| Hari ini hanya memiliki draf | Jangan membuka draf ke publik | Menu hari ini sedang disiapkan |
| Hari ini belum memiliki entri | Jangan memakai tanggal sebelumnya | Menu hari ini belum diperbarui |
| Semua item hari ini habis | Tampilkan daftar dengan status habis; hentikan slideshow promosi | Sajian hari ini sudah habis |
| Hari libur/tutup terverifikasi | Tampilkan status tutup dan tanggal berikut hanya jika ada | Pawon tutup hari ini |
| Foto sedang diproses | Publikasi menunggu atau admin memilih lepas foto | Foto sedang diproses |
| Basis data gagal | Beri pesan aman; jangan memakai menu lama tanpa label | Menu belum dapat dimuat. Silakan hubungi kami |

Hari layanan mengikuti pukul 00.00-23.59.59 Asia/Jakarta. Versi pertama tidak memakai jam pergantian bisnis khusus. Jika usaha buka melewati tengah malam, pemilik harus menyetujui model hari layanan baru sebelum pengembang mengubah aturan. Jangan memakai waktu perangkat admin atau timezone UTC untuk membentuk tanggal menu.

### 5.2 Pergantian hari dan kesegaran data

Render Menu Hari Ini secara dinamis dengan `cache: 'no-store'` atau mekanisme ekuivalen yang benar-benar menghindari cache lintas tanggal. Kunci query selalu menyertakan tanggal lokal restoran. Ambil waktu server untuk respons, lalu hitung timer client menuju tengah malam WIB. Refresh ketika melewati tengah malam, ketika tab kembali aktif, dan setiap 60 detik selama tab aktif. Batalkan fetch ketika tab tersembunyi. Jangan mengumumkan perubahan daftar secara agresif melalui screen reader.

Setelah publikasi, refresh dashboard dan halaman preview melalui `router.refresh()`. Gunakan revalidasi rute/tag hanya untuk konten statis yang memang memakai cache. Jangan mengandalkan cache invalidation untuk memperbaiki query yang salah memilih tanggal. Dokumentasi Next.js membatasi `updateTag` pada Server Actions; gunakan API yang sesuai dengan versi terpasang [T2].

### 5.3 Harga, kategori, ketersediaan

Simpan harga sebagai integer rupiah nullable, tanpa pecahan. Nilai `null` berarti admin tidak menampilkan harga; nilai negatif dan nol tidak valid pada MVP. Field `price_mode` memakai `fixed` atau `from`; default `fixed`. Unit opsional memakai pilihan porsi, potong, gelas, bungkus, atau teks pendek tervalidasi. Status item memakai `available` atau `sold_out`; draf/revisi mengatur publikasi, bukan status item. Admin dapat menyembunyikan item melalui draf tanpa menghapus riwayat.

Pilih kategori Lauk sebagai default agar admin cukup mengisi foto dan nama. Admin dapat membuka “Detail tambahan” untuk memilih kategori, harga, unit, catatan, dan foto alternatif. Jangan mengaktifkan pengenalan nama/harga berbasis AI secara diam-diam. Jika pengembang menambah fitur AI pada masa depan, nama hasil saran tetap memerlukan pemeriksaan admin sebelum publikasi.

## 6. Dashboard yang mengutamakan pekerjaan harian

### 6.1 Halaman pertama setelah login

Tampilkan sapaan singkat, tanggal WIB, tombol primer **+ Tambah Menu Hari Ini**, tombol sekunder **Salin dari Tanggal Lain**, status “Belum tayang”, “Draf tersimpan”, atau “Sudah tayang”, serta tombol “Lihat Website”. Selanjutnya tampilkan daftar item hari ini dengan thumbnail, nama, harga jika ada, status tersedia/habis, dan tombol Ubah. Tampilkan panel statistik kecil hanya untuk jumlah menu tersedia, item habis, dan waktu publikasi terakhir.

Desktop memakai sidebar 232 px dengan kelompok “Harian”, “Isi Website”, dan “Pengelolaan”. Mobile memakai header ringkas, tombol navigasi, serta bottom navigation maksimal empat tujuan: Hari Ini, Tambah, Riwayat, dan Lainnya. Tambahkan safe-area inset. Tombol publikasi yang sticky tidak boleh menutupi baris terakhir atau pesan galat.

### 6.2 Alur tambah paling sederhana

1. Admin menekan **Tambah Menu Hari Ini**. Sistem memilih tanggal WIB sekarang dan memastikan draf aktif tersedia.
2. Tampilkan bidang besar **Ambil Foto** dan pilihan **Pilih dari Galeri**. Gunakan input terpisah: satu dengan `capture='environment'` untuk kamera pada browser yang mendukung, satu tanpa capture untuk pemilih berkas. Desktop tetap memiliki file picker.
3. Setelah foto terpilih, sistem menampilkan pratinjau otomatis 4:3, indikator unggah, dan penyesuaian titik fokus opsional. Jangan memaksa crop manual.
4. Admin mengisi **Nama Menu**. Contoh placeholder: “Contoh: Ayam Goreng Lengkuas”. Field nama wajib; harga tidak wajib.
5. Tampilkan **Simpan & Tambah Lagi** sebagai aksi utama pada form item serta **Simpan Draf** sebagai aksi sekunder. Setelah simpan sukses, fokus kembali ke area ambil foto untuk item berikutnya.
6. Admin menekan **Pratinjau & Terbitkan** pada halaman harian. Sistem menampilkan daftar lengkap, tanggal, status harga, serta foto yang siap.
7. Setelah admin menekan **Terbitkan Menu Hari Ini**, server memvalidasi ulang sesi dan versi, lalu menyelesaikan transaksi. Tampilkan “Menu hari ini sudah tayang” hanya setelah server mengonfirmasi commit.

Berikan pilihan kecil **Tambahkan tanpa foto** ketika admin membutuhkan entri tulisan. Daftar publik tetap menampilkan item tersebut. Sistem tidak menampilkan kotak foto kosong pada slideshow. Setiap item membutuhkan nama, sedangkan satu hari membutuhkan minimal satu item non-hidden untuk terbit. Jika ada foto processing, tombol publish memberi pilihan menunggu atau menerbitkan item tanpa foto melalui konfirmasi yang jelas.

### 6.3 Input banyak foto

Sediakan mode “Pilih beberapa foto” sebagai tambahan, bukan layar default. Batasi satu batch maksimal 12 foto. Tampilkan satu kartu form per foto dengan nama yang wajib admin isi. Sistem tidak menebak bahwa nama berkas merupakan nama masakan. Beri status unggah per foto, tombol coba ulang per item, dan ringkasan item yang belum lengkap. Simpan item sukses tanpa menghapus item gagal dari layar.

### 6.4 Penyimpanan, konflik, dan riwayat

Autosave draf metadata dengan debounce 800 ms setelah perubahan valid, tetapi sediakan tombol simpan eksplisit. Tampilkan tiga keadaan: Menyimpan, Tersimpan pukul ..., dan Gagal menyimpan. Jangan menampilkan Tersimpan untuk data yang belum server konfirmasi. Simpan input yang gagal pada memori halaman; beri peringatan sebelum pengguna meninggalkan halaman yang memiliki perubahan belum tersimpan.

Kirim `expected_version` pada tiap perubahan. Ketika admin lain lebih dulu mengubah revisi, server mengembalikan 409 dan UI menawarkan memuat versi terbaru sambil menjaga salinan teks lokal. Jangan memakai last-write-wins tanpa pemberitahuan. Gunakan idempotency key untuk tambah item dan publish agar ketukan ganda tidak menciptakan duplikasi. Beri indikator pending dan kunci hanya aksi terkait selama request berjalan.

Fitur salin tanggal menyalin metadata dan referensi media yang masih valid ke draf baru. Sistem mengatur status item hasil salin menjadi tersedia hanya setelah admin memeriksa checklist dan tidak menerbitkannya otomatis. Beri label “Salinan, periksa kembali menu dan harga”. Aksi hapus item meminta konfirmasi; arsip mempertahankan riwayat published. Tombol “Batalkan publikasi” membutuhkan konfirmasi terpisah dan mencatat pelaku.

### 6.5 Panduan pengguna singkat

**Membuka hari:** masuk, lihat tanggal, tambah atau salin menu, ambil foto, isi nama, periksa daftar, lalu terbitkan. **Menghabiskan stok:** buka item, ubah status Habis, lalu terbitkan pembaruan. **Mengganti harga:** ubah harga pada draf, periksa unit, lalu terbitkan. **Memperbaiki foto:** pilih foto pengganti, tunggu pratinjau siap, lalu terbitkan. **Mengakhiri hari:** tidak perlu menghapus menu; tanggal berikutnya memulai halaman publik baru. Tampilkan panduan ini di `/admin/panduan` dengan gambar UI yang sesuai implementasi akhir.

## 7. Pengelolaan foto dan tata letak otomatis

### 7.1 Pipeline produksi

1. Client meminta slot unggah ke server yang memeriksa sesi, peran, kuota, MIME yang diizinkan, dan ukuran yang admin laporkan.
2. Server membuat ID media UUID serta signed upload URL ke bucket privat `menu-originals`. Client mengunggah langsung ke storage; jangan mengirim foto 15 MB melalui body Server Action default.
3. Endpoint finalize memeriksa pemilik slot, ukuran byte aktual, signature file, pixel count, dan state idempotensi. Jangan memercayai ekstensi atau Content-Type client.
4. Route Handler finalize memakai Cloudflare Images binding `IMAGES` untuk memeriksa informasi gambar dan membuat turunan WebP 480, 960, serta 1600 px. Pertahankan rasio asli pada berkas turunan; gunakan crop tampilan 4:3 dan focal point pada antarmuka. Proses menerapkan orientasi yang benar dan menghasilkan turunan tanpa EXIF/GPS. Jangan mengimpor Sharp, libheif native, atau menjalankan proses sistem operasi pada Worker.
5. Sistem menyimpan turunan ke bucket privat `menu-web`, menyimpan dimensi, checksum, focal point, dan status `ready`. UI melakukan polling singkat dengan backoff sampai ready atau failed.
6. Public media resolver hanya menandatangani turunan yang suatu published revision atau galeri published rujuk. Masa berlaku URL 10 menit; client dapat memperbarui URL yang kedaluwarsa. Jangan memberi endpoint signer akses ke path arbitrer.

Batasi berkas asli 15 MB dan 40 megapiksel untuk JPEG, PNG, WebP, serta HEIC yang pengujian binding terpasang nyatakan berhasil. Batas ini merupakan kebijakan aplikasi. Tolak SVG, HTML, animasi, dan file yang gagal decode. Validasi byte aktual, format, lebar, tinggi, serta pixel count pada server; jangan mempercayai metadata dari browser. Gunakan input stream ke layanan Images dan buffer hanya keluaran yang ukurannya telah aplikasi batasi [T10, T11].

Versi pertama menyelesaikan pengolahan dalam request finalize dengan timeout yang jelas. UI menampilkan “Memproses foto” sampai server mengonfirmasi `ready`; sistem tidak mengandalkan promise yang berjalan setelah respons selesai. Simpan processing token, masa lease, varian yang sudah selesai, dan kode galat pada `media_assets`. Retry melanjutkan ID media yang sama; server menolak processor kedua selama lease masih berlaku. Setelah lease kedaluwarsa, request ulang dapat mengambil pekerjaan yang terputus. Gunakan transaksi atau compare-and-swap untuk mengklaim lease dan mengubah status akhir. Jika kebutuhan pengolahan meningkat, pengembang dapat menambah antrean persisten tanpa mengubah kontrak menu.

Binding Images memerlukan konfigurasi layanan pada akun Cloudflare. Pengembang harus memeriksa aktivasi dan pemakaian layanan sebelum peluncuran. Jika binding belum tersedia, tampilkan galat konfigurasi kepada admin dan pertahankan inputnya; jangan menandai foto sebagai siap atau mengganti layanan dengan processor native yang tidak kompatibel. Supabase tetap menjadi sumber penyimpanan foto dan database; Cloudflare Images hanya memproses byte gambar.

### 7.2 Foto iPhone dan HEIC

Cloudflare mencantumkan HEIC pada daftar format masukan Images [T11]. Uji foto iPhone asli pada binding dan akun yang implementasi pakai, lalu tampilkan WebP/JPEG hasil konversi pada website. Jangan memuat HEIC langsung sebagai foto publik. Jika browser tidak dapat menampilkan pratinjau HEIC, tampilkan status “Foto terpilih, menyiapkan pratinjau” dan tunggu turunan server. Bila konversi gagal, pertahankan nama menu dan tawarkan mengambil foto baru atau memilih JPEG. Catat hasil uji iPhone dan batas nyata pada handover.

### 7.3 Aturan tampilan foto

Gunakan varian yang sudah processor hasilkan. Komponen `next/image` memakai `unoptimized` pada jalur media ini agar Worker tidak memanggil optimizer default yang memerlukan binary native. Komponen responsif dapat memakai `picture` dan `srcset` untuk memilih URL signed varian 480/960/1600. Selalu isi ukuran intrinsik atau container dengan rasio, `sizes` yang sesuai, serta placeholder warna. Beri `object-fit: cover` dan `object-position` dari focal point. Jangan meregangkan foto. Jangan membesarkan foto kecil secara berlebihan; tampilkan peringatan kualitas hanya kepada admin.

Rasio galeri Menu Hari Ini tetap 4:3. Foto portrait memperoleh crop pusat secara otomatis dan admin dapat menggeser titik fokus pada opsi lanjutan. Derivatif publik tidak mengganti berkas asli. Album galeri dapat menyimpan rasio asli untuk lightbox. Hentikan rotasi otomatis saat semua item habis atau ketika tidak ada foto siap.

### 7.4 Hak akses dan retensi media

Bucket privat menahan foto draf dan berkas asli. Signed URL foto published tetap dapat bekerja sampai masa berlakunya habis setelah unpublish; jelaskan batas maksimal 10 menit ini kepada pemilik. Unpublish segera menghilangkan data dari menu dan menolak penerbitan URL baru. Jangan menjanjikan pencabutan URL yang telah dibagikan secara seketika.

Simpan media yang masih menjadi referensi revisi riwayat. Jangan menghapusnya hanya karena item hari ini berubah. Jalankan pembersihan orphan yang tidak memiliki referensi setelah tenggang 7 hari. Jadikan retensi originals dan riwayat sebagai konfigurasi pemilik. Siapkan ekspor basis data dan cadangan object storage; uji pemulihan satu menu beserta fotonya.

## 8. Motion, slideshow, dan aksesibilitas

Gunakan reveal bagian dengan opacity 0 ke 1 dan translateY 12 px dalam 350-450 ms, sekali ketika bagian memasuki viewport. Tampilkan konten secara normal sebelum JavaScript siap. Gunakan stagger maksimum 60 ms per item dan total maksimum 300 ms. Jangan menganimasikan seluruh daftar panjang secara bersamaan. Transisi hover/focus memakai 150-200 ms. Jangan memakai parallax, scroll hijacking, atau perpindahan yang mengubah urutan baca.

Slideshow berganti setiap 6 detik dengan crossfade 450 ms. Sediakan kontrol jeda yang selalu terlihat. Pause saat hover, fokus berada di galeri, swipe manual, tab tersembunyi, atau reduced motion aktif. Setelah pengguna melakukan interaksi manual, jangan memulai autoplay lagi tanpa pengguna menekan Putar. Label tombol memakai bahasa Indonesia. Gunakan `aria-live='off'` saat autoplay dan pengumuman singkat hanya untuk navigasi manual yang pengguna minta.

Hormati `prefers-reduced-motion`: nonaktifkan autoplay, reveal bergerak, dan smooth scroll. Anchor memakai `scroll-margin-top` setara header ditambah 16 px. Targetkan WCAG 2.2 AA untuk kontras, fokus, label, navigasi keyboard, serta pesan galat [T4]. Tetapkan target sentuh internal 44 x 44 px untuk tombol utama. Jadikan focus ring tampak, jangan mengandalkan warna, dan jangan menaruh teks utama dalam gambar.

## 9. Responsivitas

| Lebar | Grid publik | Menu harian | Dashboard |
|---|---|---|---|
| 320-639 px | Satu kolom, gutter 20 px | Foto di atas daftar, filter bisa scroll horizontal | Satu kolom, bottom navigation |
| 640-1023 px | Satu atau dua kolom sesuai bagian | Galeri dan daftar bertumpuk pada ruang sempit | Sidebar drawer, form lebar penuh |
| 1024-1439 px | Dua kolom, maksimum 1200 px | Galeri kiri 48%, daftar kanan 52% | Sidebar tetap dan panel kerja |
| 1440 px ke atas | Tetap maksimum 1200 px | Lebar baca tetap terkontrol | Panel kerja maksimum 1320 px |

Uji 320, 360, 390, 430, 768, 1024, 1280, dan 1440 px. Pastikan body tidak memiliki overflow horizontal. Biarkan harga panjang membungkus dengan benar; gunakan `min-width: 0` pada kolom nama. Jangan menyembunyikan tindakan penting hanya karena hover tidak tersedia. Gunakan input minimal 16 px pada mobile untuk menghindari pembesaran formulir yang mengganggu.

## 10. Stack dan struktur proyek

Gunakan **Next.js 16.x App Router**, **React sesuai peer dependency Next.js**, **TypeScript strict**, **Tailwind CSS**, **Motion for React** untuk transisi terpilih, **Lucide React** untuk ikon, **React Hook Form + Zod** untuk validasi, **Supabase Postgres + Auth + private Storage**, **Cloudflare Workers**, **OpenNext**, **Wrangler**, dan **Cloudflare Images binding** untuk turunan foto. Tambahkan `@supabase/supabase-js` serta `@supabase/ssr`. Verifikasi dukungan versi stabil dan patch keamanan saat implementasi, lalu commit lockfile [T1, T9, T12]. Hindari canary dan jangan memaksa versi React yang tidak cocok.

Pakai model runtime Node.js milik Next.js melalui OpenNext pada runtime Workers `workerd`, dengan `nodejs_compat`. Flag ini tidak mengubah Worker menjadi server Node penuh. Gunakan Web APIs dan binding Cloudflare; hindari native addons, persistent filesystem, `child_process`, cron di proses aplikasi, dan penyimpanan lokal sebagai database. Jangan memberi `export const runtime = 'edge'` pada Route Handlers aplikasi OpenNext. Pisahkan adapter storage, auth, runtime config, dan image processor agar seluruh kode server mengikuti batas Workers.

Gunakan Supabase Data API HTTPS dan RPC melalui client Supabase. Aplikasi ini tidak memerlukan koneksi Postgres TCP langsung, Prisma engine native, D1, ataupun Hyperdrive pada arsitektur utama. Semua perubahan skema tetap melalui migration Supabase. Jangan mengganti Supabase dengan database Cloudflare hanya karena hosting memakai Workers.

```text
src/
  app/
    (public)/
      page.tsx
      menu-hari-ini/page.tsx
      tentang/page.tsx
      galeri/page.tsx
      lokasi-kontak/page.tsx
      privasi/page.tsx
      kredit-foto/page.tsx
    admin/
      login/page.tsx
      lupa-kata-sandi/page.tsx
      reset-kata-sandi/page.tsx
      (protected)/
        layout.tsx
        page.tsx
        menu-harian/page.tsx
        menu-harian/tambah/page.tsx
        menu-harian/[date]/[entryId]/page.tsx
        riwayat/page.tsx
        media/page.tsx
        konten/page.tsx
        galeri/page.tsx
        pengaturan/page.tsx
        pengguna/page.tsx
        aktivitas/page.tsx
        panduan/page.tsx
    api/
      public/today/route.ts
      public/media/[id]/route.ts
      admin/uploads/init/route.ts
      admin/uploads/complete/route.ts
      admin/media/[id]/status/route.ts
    auth/callback/route.ts
  components/{public,admin,ui}/
  lib/{auth,db,menu,media,validation,time,seo,cloudflare,supabase}/
  server/{actions,repositories,services}/
  styles/globals.css
public/assets/patterns/
supabase/{migrations,seed.sql}/
tests/{unit,integration,e2e,fixtures}/
docs/{SETUP,ADMIN_GUIDE,DEPLOYMENT}.md
next.config.ts
open-next.config.ts
wrangler.jsonc
cloudflare-env.d.ts
.env.example
.dev.vars.example
.nvmrc
.github/workflows/ci.yml
```

Gunakan Server Components untuk pengambilan data dan struktur halaman. Batasi Client Components pada interaksi galeri, filter, uploader, formulir, dan motion. Jangan memberi `use client` pada seluruh beranda. Pisahkan repository publik yang hanya mengembalikan snapshot published dari repository admin. Semua modul service secret wajib `server-only`.

## 11. Model basis data

### 11.1 Tabel utama

| Tabel | Field penting | Integritas |
|---|---|---|
| `admin_profiles` | user_id UUID, display_name, role owner/editor, active | FK auth.users; peran hanya owner ubah |
| `site_settings` | id singleton, brand_name, address, whatsapp, maps_url, timezone, seo, version | timezone Asia/Jakarta pada MVP |
| `opening_hours` | weekday, open_time, close_time, closed | satu baris per weekday |
| `opening_exceptions` | local_date, closed, open_time, close_time, note | unique local_date |
| `menu_days` | id, service_date DATE, published_revision_id, updated_at | unique service_date; pointer revisi hari yang sama |
| `menu_revisions` | id, menu_day_id, state draft/published/archived, version, published_at, created_by | maksimum satu draf aktif per hari |
| `menu_entries` | id, revision_id, name, category, price_rupiah nullable, price_mode, price_unit, availability, sort_order, hidden | snapshot immutable setelah published |
| `media_assets` | id, owner_id, original_path, status pending/processing/ready/failed, width, height, checksum, rights | path UUID, metadata bukan input bebas |
| `media_variants` | id, media_id, kind, storage_path, width, height, format, bytes | unique media_id + kind |
| `menu_entry_media` | entry_id, media_id, sort_order, focal_x, focal_y, alt | FK valid; focal 0..1 |
| `content_sections` | key, typed_payload JSONB, published_payload JSONB, version | schema valid per key |
| `gallery_items` | id, media_id, category, caption, alt, published, sort_order | publik hanya published + media ready |
| `audit_logs` | id, actor_id, action, entity_type, entity_id, result, timestamp | append-only melalui server |
| `mutation_keys` | actor_id, operation, key, response_ref, expires_at | unique actor_id + operation + key |

Simpan timestamp sebagai `timestamptz` UTC dan tanggal layanan sebagai `date` lokal. Jangan menyimpan URL bertanda tangan sebagai data permanen; simpan object path dan variant ID. Jangan menyalin URL signed yang kedaluwarsa ke draf baru. Gunakan constraints untuk harga positif atau null, kategori valid, panjang nama 2-80 karakter, urutan nonnegatif, dan versi positif.

### 11.2 Potongan SQL fondasi

Potongan berikut menjelaskan kontrak inti, bukan pengganti seluruh migration. Antigravity wajib menyelesaikan foreign key, indexes, triggers, fungsi otorisasi, RLS, audit, dan rollback yang konsisten sebelum produksi.

```sql
create type public.menu_revision_state as enum ('draft','published','archived');
create type public.menu_availability as enum ('available','sold_out');

create table public.menu_days (
  id uuid primary key default gen_random_uuid(),
  service_date date not null unique,
  published_revision_id uuid,
  updated_at timestamptz not null default now()
);

create table public.menu_revisions (
  id uuid primary key default gen_random_uuid(),
  menu_day_id uuid not null references public.menu_days(id),
  state public.menu_revision_state not null default 'draft',
  version integer not null default 1 check (version > 0),
  published_at timestamptz,
  created_by uuid not null references auth.users(id),
  unique (id, menu_day_id)
);

alter table public.menu_days add constraint published_revision_same_day
  foreign key (published_revision_id, id)
  references public.menu_revisions(id, menu_day_id);

create unique index one_active_draft_per_day
  on public.menu_revisions(menu_day_id) where state = 'draft';

create table public.menu_entries (
  id uuid primary key default gen_random_uuid(),
  revision_id uuid not null references public.menu_revisions(id),
  name text not null check (char_length(trim(name)) between 2 and 80),
  category text not null default 'lauk'
    check (category in ('lauk','sayur','pelengkap','sambal','minuman')),
  price_rupiah integer check (price_rupiah is null or price_rupiah > 0),
  price_mode text not null default 'fixed' check (price_mode in ('fixed','from')),
  price_unit text,
  availability public.menu_availability not null default 'available',
  sort_order integer not null default 0 check (sort_order >= 0),
  hidden boolean not null default false
);

alter table public.menu_days enable row level security;
alter table public.menu_revisions enable row level security;
alter table public.menu_entries enable row level security;
```

Tambahkan trigger yang menolak INSERT/UPDATE/DELETE pada child rows milik revisi published atau archived. Fungsi publish tidak mengubah isi snapshot; fungsi tersebut hanya mengganti status dan pointer. Sediakan index pada `revision_id`, `menu_day_id`, `published_revision_id`, `media_id`, dan timestamp audit. Tambahkan FK untuk media serta constraint panjang pada catatan dan unit.

### 11.3 Transaksi publikasi

Buat RPC `publish_menu_revision(day_id, revision_id, expected_version, idempotency_key)`. Fungsi memeriksa `auth.uid()`, profil aktif dan peran, mengambil `menu_days FOR UPDATE`, memastikan revisi milik hari tersebut dan masih draft, mencocokkan versi, serta memvalidasi minimal satu item yang boleh tampil. Fungsi menolak media belum ready kecuali admin sudah melepas referensinya. Dalam transaksi yang sama, arsipkan revisi published sebelumnya, ubah draf menjadi published, ganti pointer hari, simpan audit, dan simpan hasil idempotensi.

Jalankan fungsi `SECURITY DEFINER` hanya jika migration mengunci `search_path`, menggunakan nama schema eksplisit, mencabut hak execute dari PUBLIC, dan memberikan execute hanya kepada authenticated yang masih melewati pemeriksaan peran. Jangan mempercayai parameter actor atau role dari client. Cegah jalur UPDATE tabel yang dapat melewati fungsi publish. Uji kegagalan di tengah transaksi untuk membuktikan pointer lama tetap utuh.

### 11.4 Pembacaan publik dan RLS

Aktifkan RLS pada seluruh tabel aplikasi dan `storage.objects`. Default deny untuk anon dan editor nonaktif. Jangan menambahkan kebijakan `using (true)` pada tabel draf. Buat satu fungsi baca publik yang memilih `service_date = (now() at time zone 'Asia/Jakarta')::date`, mengikuti pointer published, memeriksa status revision, dan hanya mengembalikan field allowlist. Fungsi tersebut tidak menerima parameter tanggal dari pengunjung untuk membuka riwayat.

Public read function dapat memakai security definer dengan hak minimum dan search_path terkunci. Berikan hak execute terbatas, bukan akses SELECT ke seluruh tabel. Repository server dapat memanggil fungsi itu menggunakan anon key. Media resolver memeriksa referensi published sebelum membuat signed URL melalui secret server. Pengaturan publik memakai view/fungsi allowlist yang tidak memuat email admin atau secret. RLS storage tetap menolak akses asli dan unggah tanpa otorisasi [T3].

## 12. Kontrak layanan dan galat

| Operasi | Input inti | Output dan aturan |
|---|---|---|
| `GET /api/public/today` | Tidak menerima tanggal arbitrer | serverNow, serviceDate, publicationId, status, categories, items, media IDs; no-store |
| `GET /api/public/media/:id` | UUID variant yang published rujuk | URL signed, expiresAt; 404 untuk media nonpublik |
| `createDraft(date)` | ISO date lokal tervalidasi | draftId, version; idempotent |
| `addMenuEntry` | draftId, name, mediaIds, optional fields, expectedVersion, key | entryId, newVersion |
| `updateMenuEntry` | entryId, fields, expectedVersion | newVersion; 409 ketika konflik |
| `reorderEntries` | draftId, array entryId, expectedVersion | validasi tidak ada ID asing/duplikat |
| `publishMenuRevision` | dayId, revisionId, expectedVersion, key | publicationId, publishedAt |
| `unpublishMenuDay` | dayId, expectedPointer, confirmation | pointer null, audit |
| `copyMenuDay` | sourceDayId, targetDate, key | draft baru, tidak otomatis tayang |
| `POST /api/admin/uploads/init` | name, declaredBytes, mime, checksum optional | uploadId, signedUploadUrl, expiresAt |
| `POST /api/admin/uploads/complete` | uploadId | processing/ready, mediaId |

Gunakan envelope galat `{code, message, fieldErrors?, requestId}` tanpa stack trace atau secret. Kode utama: `UNAUTHENTICATED` 401, `FORBIDDEN` 403, `NOT_FOUND` 404, `VERSION_CONFLICT` 409, `VALIDATION_ERROR` 422, `FILE_TOO_LARGE` 413, `UNSUPPORTED_MEDIA` 415, `RATE_LIMITED` 429, dan `TEMPORARY_ERROR` 503. Jangan mengubah galat menjadi toast sukses. Gunakan timeout dan retry terbatas untuk fetch yang aman, serta idempotency untuk mutation yang mungkin pengguna ulangi.

Contoh respons publik menggunakan harga tanpa nilai sebagai `null`, tidak sebagai string kosong:

```json
{
  "serverNow": "2026-11-01T02:15:00Z",
  "serviceDate": "2026-11-01",
  "status": "published",
  "publicationId": "uuid",
  "updatedAt": "2026-11-01T02:15:00Z",
  "items": [
    {"id":"uuid","name":"Ayam Goreng Lengkuas","category":"lauk",
     "priceRupiah":null,"priceMode":"fixed","priceUnit":null,
     "availability":"available","mediaIds":[],"sortOrder":0}
  ]
}
```

Contoh tersebut hanya menunjukkan struktur. Gunakan UUID valid dan data hasil query pada aplikasi nyata. Jangan menanam tanggal contoh sebagai tanggal menu produksi.

## 13. Keamanan dan operasional

Validasi sesi dan peran pada setiap Server Action, Route Handler, RPC, serta operasi storage. Perlindungan layout atau middleware hanya membantu navigasi dan tidak menggantikan pemeriksaan mutation [T5]. Gunakan cookie sesi aman sesuai SDK resmi Supabase, HTTPS, same-site yang tepat, serta perlindungan CSRF/origin sesuai jalur permintaan. Jangan menaruh service role key dalam `NEXT_PUBLIC_*`, bundle client, repositori, log, atau tangkapan layar.

Batasi percobaan login, permintaan pemulihan, signer media, dan init upload dengan rate limit persisten. Jangan memakai Map memori proses sebagai satu-satunya pembatas produksi. Batasi upload per akun dan total storage melalui konfigurasi. Tampilkan pesan login yang tidak membocorkan keberadaan email. Nonaktifkan registrasi publik dan batasi undangan pengguna pada owner. Audit perubahan peran, publikasi, unpublish, hapus, serta pengaturan kontak.

Terapkan CSP yang hanya mengizinkan domain aktual, `X-Content-Type-Options: nosniff`, kebijakan referrer, HSTS setelah domain HTTPS stabil, dan pembatasan frame sesuai kebutuhan. Sanitasi input kaya teks melalui allowlist. Gunakan parameterized query. Jangan menjalankan URL remote dari input admin sebagai image fetch sewenang-wenang. Batasi remote image hosts dan validasi Maps/WhatsApp URL dengan parser URL, protokol https, dan domain allowlist.

Pisahkan lingkungan local, staging, dan production; gunakan project database yang berbeda untuk staging bila tersedia. Commit migration, lockfile, dan `.env.example`; abaikan `.env.local`. Catat secret yang wajib tersedia tanpa mengisi nilainya. Aktifkan log terstruktur tanpa password, token, URL bertanda tangan, atau foto asli. Siapkan error tracking, health check, pengukuran image processing gagal, dan alarm sederhana untuk kegagalan publikasi berulang.

### 13.1 Variabel lingkungan

```dotenv
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://yysctpfwpoxgspusdyta.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_URL=https://yysctpfwpoxgspusdyta.supabase.co
SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SECRET_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_PROJECT_REF=yysctpfwpoxgspusdyta
RATE_LIMIT_BACKEND_URL=
RATE_LIMIT_BACKEND_TOKEN=
APP_MODE=production
RESTAURANT_TIMEZONE=Asia/Jakarta
```

`APP_MODE=demo` hanya boleh mengaktifkan data demo berlabel. Pengaturan produksi harus menolak demo mode dalam build publik final. Pilih `SUPABASE_SECRET_KEY` modern atau `SUPABASE_SERVICE_ROLE_KEY` legacy sesuai key yang pemilik miliki; tidak perlu mengisi keduanya. Server memilih secret modern terlebih dahulu dan menolak konfigurasi kosong. `SUPABASE_PUBLISHABLE_KEY` runtime memakai nilai publik yang sama dengan `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` saat build. Pengembang dapat memakai legacy anon key sebagai nilai publishable bila proyek masih menyediakan format lama, tetapi tidak boleh memakai server secret sebagai penggantinya [T13].

Contoh di atas merupakan `.env.example` dan tidak memuat nilai secret. Jangan menyalin seluruh contoh sebagai `vars` dalam `wrangler.jsonc`. Browser hanya membaca `NEXT_PUBLIC_*`. Server membaca binding request melalui `getCloudflareContext()` sesuai adapter; helper konfigurasi lokal memakai `.env.local`. Bagian 19 memisahkan konfigurasi build, runtime, dan CLI. Site URL harus memakai URL deployment nyata untuk callback auth produksi.

### 13.2 Cadangan

Jadwalkan backup basis data dan object storage menurut kemampuan layanan yang pemilik pilih. Dokumentasikan retensi, cara ekspor, langkah restore, dan kontak pengelola. Target operasional usulan: kehilangan data maksimal 24 jam dan pemulihan maksimal satu hari kerja, lalu minta pemilik menyesuaikan kapasitas layanan. Target tersebut merupakan rancangan, bukan jaminan penyedia hosting. Uji restore pada staging sebelum peluncuran.

## 14. SEO, performa, dan analitik

Tetapkan title dan description unik pada setiap halaman publik, canonical berdasarkan domain produksi, Open Graph dengan foto yang haknya jelas, sitemap, robots, dan favicon. Tandai admin `noindex` dan tetap lindungi dengan autentikasi; robots bukan kontrol keamanan. Gunakan JSON-LD Restaurant hanya untuk nama, URL, alamat, kontak, jam, dan foto yang pemilik verifikasi. Jangan membuat aggregateRating atau review palsu. Hubungkan `hasMenu` ke halaman menu aktual.

Targetkan LCP maksimal 2,5 detik, INP maksimal 200 ms, dan CLS maksimal 0,1 pada pengukuran lapangan yang representatif [T6]. Perlakukan angka tersebut sebagai sasaran validasi. Muat foto hero secara prioritas dan lazy-load foto di bawah fold; jangan memprioritaskan seluruh slideshow. Reservasikan dimensi gambar, font, dan panel pesan. Batasi JS client, jangan memuat library galeri berat pada seluruh halaman, dan gunakan import dinamis untuk cropper/HEIC.

Gunakan analitik agregat yang pemilik setujui untuk event `view_today_menu`, `filter_menu`, `click_whatsapp`, `click_directions`, `upload_success`, dan `publish_success`. Jangan mengirim nama admin, email, isi percakapan, URL signed, atau foto ke payload analitik. Jangan menyebut klik WhatsApp sebagai transaksi berhasil. Hindari dashboard pemasaran yang menyimpulkan penjualan tanpa data transaksi.

## 15. Aset Jawa dan foto

Salin `assets/patterns/` ke `public/assets/patterns/`. Paket memuat lima tile geometris PNG RGBA 1024 x 1024 dan satu ornamen sulur PNG transparan. Gunakan `background-repeat: repeat` pada tile dan `background-repeat: no-repeat` pada sulur. Motif merupakan interpretasi visual untuk proyek ini, bukan dokumentasi pakem batik historis. Jangan menyatakan makna filosofis tertentu tanpa referensi yang benar-benar memverifikasinya.

| Aset | Penempatan | Ukuran CSS awal | Opasitas awal |
|---|---|---|---|
| `kawung-brown.png` | Latar hero sisi teks atau pembatas | 256 px | 0,05-0,08 |
| `kawung-cream.png` | Footer hijau | 256 px | 0,06-0,10 |
| `parang-brown.png` | Pita pembatas horizontal | 256 px | 0,06-0,08 |
| `truntum-gold.png` | Bidang cerita yang tenang | 256 px | 0,08-0,12 |
| `lurik-green.png` | Aksen kartu informasi | 256 px | 0,04-0,06 |
| `sulur-divider-brown.png` | Divider terpusat | max-width 360 px | 0,35-0,55 |

```css
.javanese-surface { position: relative; isolation: isolate; }
.javanese-surface::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background: url('/assets/patterns/kawung-brown.png') repeat;
  background-size: 256px 256px;
  opacity: .06;
}
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .section-reveal { animation: none; transform: none; opacity: 1; }
}
```

Gunakan maksimal satu motif dominan per bidang. Jangan memasang motif di belakang paragraf panjang tanpa lapisan solid. Berikan `aria-hidden='true'` untuk gambar dekoratif atau gunakan CSS. Ukuran 256 px merupakan ukuran keseluruhan tile; jangan mengecilkan motif sampai menghasilkan tekstur moire.

Foto contoh di `assets/photos/` berasal dari Wikimedia Commons melalui penelusuran web. Foto tersebut menunjukkan makanan dan tempat lain, bukan Pawon Tentrem. Gunakan hanya pada mode demo dan rancangan dengan label “Foto ilustrasi”. Simpan kredit setiap foto sesuai `assets/PHOTO_CREDITS.md`. Sebelum produksi, minta pemilik mengunggah foto asli atau mempertahankan atribusi dan ketentuan lisensi sumber. Jangan mengambil foto Google Maps, ulasan pelanggan, atau situs berita sebagai aset produksi tanpa hak yang jelas.

## 16. Copy antarmuka

| Konteks | Teks |
|---|---|
| CTA beranda | Lihat Menu Hari Ini |
| Dashboard primer | Tambah Menu Hari Ini |
| Upload kamera | Ambil Foto |
| Upload galeri | Pilih dari Galeri |
| Nama wajib | Nama Menu |
| Opsi tambahan | Detail tambahan |
| Harga kosong | Harga opsional. Kosongkan jika tidak ingin menampilkannya. |
| Simpan item | Simpan & Tambah Lagi |
| Preview | Pratinjau & Terbitkan |
| Publish final | Terbitkan Menu Hari Ini |
| Sukses | Menu hari ini sudah tayang. |
| Gagal upload | Foto belum berhasil diunggah. Coba lagi tanpa mengisi ulang nama. |
| Konflik | Ada perubahan dari admin lain. Muat versi terbaru sebelum menyimpan. |
| Belum ada menu | Menu hari ini belum diperbarui. Silakan hubungi kami untuk menanyakan sajian yang tersedia. |
| Harga tersembunyi | Jangan tampilkan placeholder harga pada baris item. |
| Habis | Habis hari ini |

Gunakan kalimat pendek dan instruksi konkret pada dashboard. Dokumen teknis memakai bahasa formal, sedangkan copy website menyapa pengunjung secara ramah. Hindari istilah “CRUD”, “mutation”, “storage”, dan “revision ID” pada alur pengguna biasa.

## 17. Pengujian dan definisi selesai

### 17.1 Skenario wajib

| ID | Skenario | Hasil yang harus terbukti |
|---|---|---|
| U01 | Admin tambah satu foto dan nama tanpa harga | Item tersimpan; baris publik tanpa Rp0 atau kolom kosong |
| U02 | Admin unggah foto portrait dan landscape | Semua preview 4:3 rapi; focal point bekerja |
| U03 | Nama ada tetapi foto gagal | Nama tetap tersedia untuk retry; UI tidak mengaku sukses |
| U04 | Admin publish draf dengan 5 item | Publik membaca snapshot lengkap dalam satu perubahan |
| U05 | Admin mengedit menu published | Publik masih membaca snapshot lama sampai publish baru |
| U06 | Dua admin mengubah versi yang sama | Penulisan kedua mendapat konflik; tidak menimpa diam-diam |
| U07 | Klik ganda simpan/publish | Tidak ada duplikasi berkat idempotency |
| U08 | Waktu berpindah 23.59 ke 00.00 WIB | Situs meminta hari baru dan tidak melabeli menu kemarin sebagai hari ini |
| U09 | Hari ini tidak memiliki published revision | Publik melihat empty state yang benar |
| U10 | Semua item habis | Status habis jelas dan slideshow promosi berhenti |
| U11 | Pengunjung menebak UUID foto draf | Media resolver menolak dan originals tetap privat |
| U12 | Editor mencoba ubah peran pengguna | Server/RLS menolak walaupun request langsung |
| U13 | Anon mencoba publish atau upload | Server/RPC/storage menolak |
| U14 | Galeri mendapat fokus keyboard | Autoplay berhenti; fokus tampak; kontrol berfungsi |
| U15 | Reduced motion aktif | Tidak ada autoplay atau reveal bergerak |
| U16 | Internet putus ketika upload | Retry tidak menggandakan item; input tetap ada |
| U17 | Signed URL kedaluwarsa | Client meminta URL baru untuk media yang masih published |
| U18 | Unpublish menu | Data hilang segera; signer menolak URL baru |
| U19 | HEIC dari iPhone nyata | Konversi berhasil atau pesan keterbatasan akurat |
| U20 | Restore backup satu hari dan objeknya | Daftar dan foto kembali terbaca pada staging |
| U21 | Jalankan build OpenNext dan preview workerd | Halaman publik, admin, Server Actions, serta Route Handlers berfungsi di Workers |
| U22 | Bandingkan environment build dan runtime | Client memiliki URL/key publik yang benar; server memiliki binding yang lengkap |
| U23 | Unggah HEIC melalui Images binding terpasang | Turunan siap dan EXIF/GPS tidak ikut masuk keluaran |
| U24 | Push commit ke main setelah integrasi Git aktif | Workers Builds menghasilkan deployment untuk commit yang benar |
| U25 | Buka preview dengan kredensial nonproduksi | Preview tidak dapat menulis ke database produksi |

Gunakan unit test untuk tanggal WIB, format harga nullable, aturan state, dan validasi. Gunakan integration test untuk RLS, fungsi publish, idempotensi, konflik, rollback, dan media signer. Gunakan Playwright untuk jalur admin-ke-publik dan viewport penting. Periksa keyboard, pembaca layar secara terpilih, kontras, jaringan lambat, orientasi landscape mobile, serta browser Chrome Android dan Safari iOS. Tes berfokus pada risiko alur nyata, bukan menyalin detail internal komponen.

### 17.2 Gerbang penerimaan

- `lint`, TypeScript, integration tests, dan production build lulus.
- Tidak ada konten contoh atau tombol kosong pada jalur produksi.
- Beranda, seluruh halaman publik, dan seluruh rute admin berfungsi sesuai tabel rute.
- Admin dapat menambah, mengubah, mengurutkan, menandai habis, mempratinjau, menerbitkan, dan mengarsipkan menu melalui basis data nyata.
- Uji lintas tanggal, RLS, akses media draf, dan rollback publish lulus.
- Foto berorientasi benar, tidak meregang, dan bebas metadata GPS pada turunan.
- Tidak ada secret pada bundle atau log.
- UI tidak overflow pada viewport pengujian dan tetap terbaca pada pembesaran 200%.
- Pemilik memeriksa data usaha, kredit foto, privacy notice, dan akun pemilik sebelum peluncuran.
- Handover memuat cara menjalankan, migration, setup storage, admin pertama, backup/restore, dan keterbatasan yang tersisa.
- Build OpenNext serta preview workerd lulus; pengembang tidak menganggap keberhasilan `next dev` sebagai bukti kompatibilitas Cloudflare.
- Runtime tidak memakai native image processor atau disk lokal untuk foto; Images binding serta private Storage berfungsi.
- Commit SHA, hasil push GitHub, deployment ID/URL Cloudflare, dan target project Supabase tercatat sesuai hasil nyata.

## 18. Urutan implementasi

**Fase 1, fondasi:** audit workspace, pilih versi stabil, buat struktur, tokens, layout publik/admin, `.env.example`, dan halaman mode demo. **Fase 2, domain:** migration, RLS, seed demo terpisah, autentikasi, bootstrap owner, repository, dan tanggal WIB. **Fase 3, alur inti:** uploader, processor, draf, item, preview, publish atomik, konflik, serta public reader. **Fase 4, visual lengkap:** beranda, menu, cerita, galeri, lokasi, konten admin, motif, dan responsive motion. **Fase 5, pengamanan:** rate limit, audit, validasi file, signed media, backup, serta error handling. **Fase 6, validasi:** jalankan seluruh skenario, perbaiki temuan, tulis panduan, lalu siapkan hasil review.

Setiap fase harus menghasilkan fitur yang dapat pengembang jalankan dan periksa. Jangan menumpuk pekerjaan backend sampai setelah seluruh UI selesai. Jangan menyebut layout foto statis sebagai uploader, localStorage sebagai database produksi, atau tombol preview sebagai publikasi.

## 19. Runbook implementasi, GitHub, Supabase, dan Cloudflare

### 19.1 Persiapan repository

Gunakan repository milik pemilik sebagai satu-satunya remote source utama. Periksa isi dan status branch sebelum menulis. Jika repository sudah memuat MD ini, pertahankan dokumen dan seluruh commit yang ada. Jika source website belum ada, buat scaffold Next.js di direktori sementara terpisah lalu gabungkan berkas aplikasinya ke root repository tanpa membawa direktori `.git` baru. Jangan membuat project aplikasi bersarang tanpa memperbarui root directory pada konfigurasi build.

```bash
git clone https://github.com/askaraindonesiaclient/pawontentrem.git
cd pawontentrem
git status --short
git remote -v
```

Pakai Node.js 22 sebagai baseline lingkungan pengembangan dan build yang proyek ini pilih, lalu cocokkan dukungan dependency terpasang. Isi `.nvmrc` dengan `22`; gunakan satu package manager npm dan commit `package-lock.json`. Instal Next.js/React yang kompatibel, dependency UI pada bagian 10, `@supabase/supabase-js`, `@supabase/ssr`, adapter OpenNext, serta Wrangler. Jangan menganggap nama repository kosong sebagai izin menghapus branch atau mengganti riwayat.

Setelah scaffold Next.js siap, tambahkan dependency integrasi:

```bash
npm install @supabase/supabase-js @supabase/ssr @opennextjs/cloudflare
npm install --save-dev wrangler supabase
```

Versi di lockfile harus stabil dan telah melewati preview Workers. Jangan memasang adapter Pages lama bersamaan dengan OpenNext. Jangan menjalankan migrator otomatis yang membuat resource tambahan tanpa memahami output dan kebutuhan proyek.

### 19.2 Konfigurasi OpenNext dan Worker

Buat `open-next.config.ts` berikut sebagai konfigurasi awal:

```typescript
import { defineCloudflareConfig } from '@opennextjs/cloudflare';

export default defineCloudflareConfig();
```

Buat `wrangler.jsonc` di root aplikasi. Contoh berikut menggunakan sumber database yang pemilik tetapkan dan tidak memuat secret:

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

Sesuaikan `compatibility_date` ke tanggal implementasi ketika pengembang memulai pada hari lain, kemudian uji ulang. Cocokkan nama Worker pada dashboard dan `name` dalam konfigurasi. Jangan mengisi `account_id` dari dugaan; pilih akun Cloudflare yang pemilik maksud melalui autentikasi CLI/dashboard. Tambahkan `SITE_URL` runtime setelah URL produksi nyata sudah diketahui.

Bagian menu, admin, dan endpoint signer menggunakan rendering/request dinamis tanpa ISR bersama. Konfigurasi awal ini tidak memerlukan R2 sebagai database atau media storage. Jika implementasi kemudian menambah ISR untuk konten profil, pengembang wajib menambahkan backend cache OpenNext yang sesuai, membuat resource serta binding-nya, dan menguji invalidasi. Jangan menyalin binding R2 atau service reference yang tidak memiliki resource nyata.

Pada `next.config.ts`, aktifkan akses binding saat development sesuai integrasi `initOpenNextCloudflareForDev` adapter. Jangan menjalankan akses binding pada module scope komponen aplikasi. Untuk media yang sudah memiliki varian, tetapkan konfigurasi gambar tanpa optimizer native. Pertahankan `next/image` atau `picture` sesuai aturan bagian 7.3; jangan memakai konfigurasi static export [T8, T9].

Tambahkan script berikut pada `package.json`; sesuaikan skrip unit test dengan runner yang benar-benar implementasi pasang:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test:unit": "vitest run",
    "verify": "npm run lint && npm run typecheck && npm run test:unit",
    "build:cloudflare": "opennextjs-cloudflare build",
    "preview:cloudflare": "opennextjs-cloudflare preview",
    "deploy:cloudflare": "opennextjs-cloudflare deploy -- --keep-vars",
    "cf-typegen": "wrangler types --env-interface CloudflareEnv cloudflare-env.d.ts"
  }
}
```

`build:cloudflare` memanggil proses build Next.js melalui adapter dan menghasilkan `.open-next`. `preview:cloudflare` serta `deploy:cloudflare` menggunakan hasil tersebut; pengembang harus menjalankan build terlebih dahulu. Pada Workers Builds, pisahkan build dan deploy supaya pipeline tidak membangun aplikasi dua kali [T8, T14].

Jalankan type generation setelah menambah binding dan gunakan `CloudflareEnv` hasil generator. Buat helper `server-only` untuk membaca binding melalui `getCloudflareContext()` di dalam request. Jangan menulis tipe `any` untuk binding atau menyimpan client Supabase bersesi dalam variabel global yang beberapa request pakai bersama.

### 19.3 Matriks environment

| Nilai | Build Next.js | Runtime Worker | Lokasi pengisian |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Ya | Nilai browser mengikuti hasil build | Build variables; nilai URL pada bagian 0.3 |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Ya | Nilai browser mengikuti hasil build | Build variables; key publik dari Supabase |
| `NEXT_PUBLIC_SITE_URL` | Ya | Metadata publik mengikuti hasil build | URL produksi yang benar-benar aktif |
| `SUPABASE_URL` | Tidak perlu jika semua query runtime | Ya | `vars` dalam `wrangler.jsonc` |
| `SUPABASE_PUBLISHABLE_KEY` | Tidak perlu | Ya | Runtime variable atau secret, sama dengan key publik build |
| `SUPABASE_SECRET_KEY` atau `SUPABASE_SERVICE_ROLE_KEY` | Tidak perlu | Ya, server saja | Runtime Secret Cloudflare |
| `SITE_URL` | Tidak perlu | Ya | Runtime variable untuk origin/callback yang tervalidasi |
| `RESTAURANT_TIMEZONE` | Tidak perlu | Ya | `vars`, selalu Asia/Jakarta pada MVP |
| `APP_MODE` | Sesuai pemeriksaan build | Ya | production pada deployment final |
| `IMAGES` | Tidak | Binding | Konfigurasi `images` dan layanan akun |
| Token CLI Cloudflare | Hanya saat deploy CLI/CI eksternal | Tidak | Login lokal atau secret CI |
| Access token dan password database Supabase | Hanya saat migration CLI | Tidak | Prompt CLI/secret CI; tidak masuk aplikasi |

Build variables dan runtime variables merupakan dua konfigurasi berbeda [T14, T15]. Mengisi URL/key hanya pada runtime tidak memperbarui JavaScript browser yang Next.js sudah bangun. Sebaliknya, mengisi secret build saja tidak menjamin Worker dapat membacanya saat menerima request. Lakukan rebuild setelah mengubah `NEXT_PUBLIC_*` dan pastikan URL/key build berasal dari project yang sama.

Untuk lokal, salin `.env.example` ke `.env.local` lalu isi nilai yang sah. Buat `.dev.vars` lokal berisi `NEXTJS_ENV=development` untuk alur OpenNext yang membaca environment development [T15]. File contoh boleh masuk Git; `.env.local`, `.dev.vars`, seluruh file environment berisi nilai nyata, dan token CLI tidak boleh masuk Git. Jika implementasi memakai remote binding saat development, jelaskan bahwa request dapat menjangkau layanan akun dan jangan membiarkannya menulis data produksi secara tidak sengaja.

Runtime secret dapat pengembang isi melalui dashboard Worker atau prompt Wrangler berikut setelah memilih akun dan nama Worker yang benar:

```bash
npx wrangler login
npx wrangler whoami
npx wrangler secret put SUPABASE_PUBLISHABLE_KEY
npx wrangler secret put SUPABASE_SECRET_KEY
```

Gunakan perintah secret kedua dengan `SUPABASE_SERVICE_ROLE_KEY` sebagai gantinya hanya jika proyek memakai legacy service role key. Jangan menaruh nilai secret sebagai argumen shell, contoh kode, commit message, atau keluaran log. `SUPABASE_PUBLISHABLE_KEY` memang key publik; menyimpannya melalui secret prompt tetap dapat membantu menghindari perubahan tidak sengaja pada konfigurasi repository.

### 19.4 Menghubungkan dan menyiapkan Supabase

Pakai project **yang sudah pemilik berikan**, yaitu `yysctpfwpoxgspusdyta`. Jangan membuat project baru sebagai pengganti tanpa kebutuhan yang pemilik setujui. Jalankan `supabase init` hanya jika direktori konfigurasi belum ada, lalu autentikasi dan tautkan CLI:

```bash
npx supabase init
npx supabase login
npx supabase link --project-ref yysctpfwpoxgspusdyta
npx supabase migration list
```

Sebelum menulis migration pertama, periksa apakah database remote sudah memiliki tabel, fungsi, data, atau riwayat migration. Pemeriksaan repository kosong tidak membuktikan database kosong. Jika schema sudah ada, ambil baseline dengan `supabase db pull` dan pertahankan objek yang tidak terkait. Jangan menjalankan `db reset` pada database remote atau menghapus data untuk menyamakan contoh dokumen.

Susun migration berurutan, misalnya `extensions_and_types`, `admin_and_settings`, `daily_menu_and_revisions`, `media_and_storage`, `rls_and_rpc`, serta `audit_and_indexes`. Setiap berkas memakai prefix timestamp yang CLI hasilkan. Uji migration pada Supabase lokal atau project staging; pengembang membutuhkan Docker untuk alur Supabase lokal standar. Pisahkan seed demonstrasi dari migration produksi.

Setelah hasil review skema dan backup awal siap, periksa daftar perubahan sebelum menerapkannya:

```bash
npx supabase db push --dry-run
npx supabase db push
```

Flag dan mekanisme migration mengikuti CLI terpasang [T16, T17]. Jangan menjalankan `db push` pada setiap request aplikasi atau pada setiap preview build. Catat project reference, nama migration terakhir, dan hasil penerapan tanpa mencatat password. Setelah schema sesuai, buat tipe TypeScript database melalui `supabase gen types typescript --project-id yysctpfwpoxgspusdyta` dan simpan hasilnya dalam `src/lib/supabase/database.types.ts`.

Buat bucket `menu-originals` dan `menu-web` sebagai **private**. Terapkan ukuran dan MIME allowlist sesuai pipeline foto, serta kebijakan `storage.objects` yang membatasi unggah ke akun admin aktif dan slot yang sah. Verifikasi signed upload, private download, serta signed URL varian. Endpoint signer harus memeriksa keterkaitan foto dengan published revision/galeri pada database sebelum memakai server secret. Secret server melewati beberapa pembatas RLS, sehingga pemeriksaan aplikasi tetap wajib.

Untuk `menu-originals`, browser hanya boleh membuat objek pada path UUID yang init upload sudah tentukan. Untuk `menu-web`, hanya jalur processor server yang boleh menulis varian. Jangan memberi editor hak menimpa varian published langsung. Bersihkan file yang gagal validasi melalui proses terkontrol dan pertahankan data input admin untuk retry.

### 19.5 Auth admin, cookie, dan callback

Gunakan dua client berbasis `@supabase/ssr`: browser client untuk interaksi pengguna dan server client baru pada setiap request. Server memverifikasi identitas melalui `getClaims()` atau `getUser()` sesuai kebutuhan, lalu membaca `admin_profiles` untuk memastikan `active` dan role. Jangan mempercayai objek user dari `getSession()` sebagai satu-satunya dasar izin [T12].

Pisahkan client server berprivilege tinggi untuk operasi terbatas seperti penandatanganan objek privat. Jalur mutation menu memakai JWT admin sehingga RPC dapat memeriksa `auth.uid()`. Jangan menjalankan RPC publikasi dengan service role lalu menganggap database mengetahui admin pelakunya. Jangan mengambil role dari form atau metadata yang pengguna dapat ubah sendiri.

Implementasikan penyegaran cookie memakai pola SSR Supabase yang sesuai dengan versi Next.js dan dukungan OpenNext terpasang. Next.js 16 menggunakan konvensi `proxy.ts`, sedangkan matriks adapter perlu pengembang periksa secara terpisah. Jangan menganggap Node proxy berjalan hanya karena `next dev` berhasil. Sebelum melanjutkan halaman lain, uji login, sesi kedaluwarsa, refresh, redirect, dan logout pada preview workerd. Bila adapter tidak mendukung pola proxy yang dipilih, selesaikan kompatibilitas melalui pola middleware/handler yang adapter dukung dan buktikan alur refresh; jangan menonaktifkan verifikasi sesi untuk melewati build.

Pada dashboard Supabase, tetapkan Site URL ke origin produksi sebenarnya. Tambahkan allowlist callback lokal `http://localhost:3000/auth/callback`, callback produksi pada origin yang sama, dan path reset kata sandi yang implementasi benar-benar gunakan. Jika email recovery memakai callback verifikasi terlebih dahulu, arahkan token ke callback tersebut dan lanjutkan ke halaman reset internal. Validasi parameter `next` sebagai path relatif agar aplikasi tidak membuka open redirect. Tambahkan preview callback hanya untuk origin staging yang pemilik kendalikan.

Pemilik membuat akun owner pertama melalui jalur bootstrap server atau Supabase Auth yang terkontrol. Nonaktifkan registrasi publik. Setelah itu, pemilik mengundang editor dari dashboard. Jangan membuat password default dalam SQL, `.env.example`, seed, repository, atau dokumentasi publik. Jelaskan prosedur pemulihan akun dan penyetelan pengiriman email sesuai konfigurasi Auth aktual.

### 19.6 Cache, origin, dan akses publik

Pasang `Cache-Control: private, no-store` pada respons admin, autentikasi, signer, dan API menu harian. Hindari cache CDN pada respons yang membawa `Set-Cookie`. Pisahkan reader menu publik dari client bersesi supaya halaman publik tidak tanpa sengaja memasukkan cookie admin. Terapkan aturan tanggal WIB dan refresh pada bagian 5.2.

Cache jangka panjang hanya berlaku untuk aset fingerprint seperti `/_next/static/`. Jangan memberi cache publik satu tahun pada path foto privat, URL signed, atau HTML menu harian. Endpoint media boleh menandatangani URL selama 10 menit sesuai kontrak; cache HTML atau optimizer lain tidak boleh memperpanjang akses melewati kebijakan yang pemilik pilih. Untuk pemisahan akses yang ketat, gunakan varian signed langsung tanpa cache proxy publik bersama.

CSP dan allowlist image/fetch harus mengizinkan origin `https://yysctpfwpoxgspusdyta.supabase.co` serta domain yang fitur sebenarnya perlukan. Jangan mengaktifkan CORS `*` pada endpoint admin. Web dan admin berada pada origin aplikasi yang sama; browser mengakses Supabase sesuai client resmi dan kebijakan proyek. Custom domain belum menjadi fakta proyek, sehingga pengembang harus memakai URL Cloudflare hasil deployment sampai pemilik menambahkan domain.

### 19.7 Verifikasi sebelum push dan deployment

Jalankan pemeriksaan berikut dari root repository setelah mengisi environment lokal yang tepat:

```bash
npm ci
npm run cf-typegen
npm run verify
npm run build:cloudflare
npx wrangler deploy --dry-run
npm run preview:cloudflare
```

Perintah preview menjalankan server untuk pengujian, bukan perintah yang harus selesai sebelum langkah berikutnya pada shell yang sama. Uji alur login sampai publish di browser terhadap server preview. Gunakan Supabase lokal/staging untuk test yang menulis data; jangan menjalankan seed uji terhadap project produksi. Catat keterbatasan emulasi Images lokal dan periksa pipeline gambar pada lingkungan staging yang memakai binding produksi sebelum menyatakan HEIC siap.

Build harus dapat menyelesaikan pembuatan halaman tanpa membaca data restoran menggunakan secret produksi. Ambil data runtime melalui request dinamis dan buat server config secara lazy. Jangan menambahkan server secret ke build hanya untuk menyembunyikan akses database yang seharusnya terjadi pada request. `verify` mencakup lint, typecheck, dan unit test; jalankan integration test RLS/RPC serta E2E pada lingkungan terpisah sebelum promosi produksi.

### 19.8 Push ke GitHub dengan riwayat yang aman

Buat `.gitignore` yang setidaknya memuat pola berikut:

```gitignore
node_modules/
.next/
.open-next/
.wrangler/
.env
.env.*
!.env.example
.dev.vars
.dev.vars.*
!.dev.vars.example
supabase/.temp/
supabase/.branches/
*.log
playwright-report/
test-results/
```

Commit source aplikasi, manifest dependency dan lockfile, konfigurasi OpenNext/Wrangler tanpa secret, migration, contoh environment, aset yang hak penggunaannya jelas, serta dokumentasi. Jangan menyimpan seluruh paket PDF/foto ilustrasi besar sebagai pengganti source aplikasi. Pertahankan atribusi ketika foto contoh masih masuk mode demo. Periksa diff dan staged files sebelum membuat commit:

```bash
git diff --check
git diff --stat
git status --short
git add src public supabase docs package.json package-lock.json next.config.ts open-next.config.ts wrangler.jsonc cloudflare-env.d.ts tsconfig.json .gitignore .env.example .dev.vars.example .nvmrc
git diff --cached --stat
git commit -m "feat: build Pawon Tentrem website for Cloudflare and Supabase"
git push origin main
```

Daftar pada `git add` merupakan daftar target setelah implementasi; sesuaikan terhadap berkas yang benar-benar ada dan tambahkan konfigurasi lint, test, atau CI yang proyek hasilkan. Jangan memakai `git add -f` untuk environment yang ignore lindungi. Jika repository memiliki branch protection atau tim mengharuskan pull request, push ke feature branch lalu ajukan PR sesuai aturan repository. Jangan memakai force push untuk menyelesaikan konflik; fetch, periksa perubahan remote, lalu gabungkan dengan aman.

Setelah push, cocokkan SHA lokal dan SHA remote. Simpan URL commit pada laporan. Keberhasilan push tidak membuktikan keberhasilan deployment atau penerapan migration; laporkan ketiganya secara terpisah.

### 19.9 Menghubungkan GitHub ke Cloudflare Workers Builds

Pada dashboard Cloudflare, pilih akun yang pemilik maksud, buka **Workers & Pages**, lalu mulai alur **Create Worker/Import a repository** untuk Worker. Jika layar masih menampilkan “Get started with Pages” seperti tangkapan layar pengguna, gunakan tautan **Create a Worker**. Nama dan letak tombol dapat berubah; yang harus benar ialah tipe resource **Worker**.

Hubungkan GitHub dan beri integrasi akses hanya ke repository yang diperlukan. Pilih `askaraindonesiaclient/pawontentrem`, branch produksi `main`, dan nama Worker `pawontentrem`. Jangan menghubungkan repository lain yang namanya mirip. Gunakan konfigurasi berikut setelah source aplikasi dan lockfile tersedia:

| Pengaturan Workers Builds | Nilai proyek |
|---|---|
| Repository | `askaraindonesiaclient/pawontentrem` |
| Production branch | `main` |
| Root directory | Root repository, umumnya `/` atau kosong sesuai UI |
| Build command | `npm run verify && npm run build:cloudflare` |
| Deploy command | `npm run deploy:cloudflare` |
| Node version | `22`, sesuaikan build image dan dependency yang teruji |
| Build variables | Tiga nilai `NEXT_PUBLIC_*`, serta konfigurasi build yang benar-benar diperlukan |
| Runtime variables/secrets | Nilai pada matriks bagian 19.3 |
| Output artefak | Worker `.open-next/worker.js` dan static assets `.open-next/assets` dari konfigurasi Wrangler |

Workers Builds menjalankan build dan deploy sebagai tahap terpisah [T14]. UI Workers tidak memakai kolom output directory Pages; jangan mengisi `out` atau `.next` sebagai situs statis. Pipeline tidak menjalankan Supabase production migration secara otomatis. Terapkan migration yang kompatibel lebih dahulu, lalu deploy kode yang memerlukannya. Untuk deployment CLI manual, jalankan build yang sama lalu `npm run deploy:cloudflare` setelah kredensial Cloudflare tersedia.

Pada versi pertama, nonaktifkan auto preview dari branch yang belum memiliki lingkungan terisolasi. Public repository dapat menerima kode tidak tepercaya; jangan memberikan production server secret atau akses tulis database produksi kepada PR preview. Jika pemilik menyediakan Supabase staging, buat Worker/config terpisah, URL/key staging, dan callback auth staging. Jangan sekadar mengganti `APP_MODE` sambil tetap mengarah ke Supabase produksi.

Jika menambahkan `.github/workflows/ci.yml`, gunakan workflow untuk lint, typecheck, unit test, dan pemeriksaan build tanpa production secret. Pilih versi action resmi yang pengembang verifikasi, lalu kunci commit SHA untuk reproducibility. Gunakan Workers Builds sebagai jalur deployment utama. Jangan mengaktifkan deployment yang sama melalui GitHub Actions dan Workers Builds sekaligus tanpa aturan yang mencegah deploy ganda.

### 19.10 Pemeriksaan setelah deployment dan rollback

Setelah Cloudflare menyatakan deployment sukses, buka URL hasil sebenarnya. Periksa halaman beranda, menu harian, seluruh halaman profil, login, refresh sesi, foto kamera/galeri, publish, status habis, dan perubahan tanggal WIB. Pastikan hasil query memakai Supabase `yysctpfwpoxgspusdyta`. Periksa log Worker untuk binding hilang, environment kosong, processor gagal, atau kegagalan RPC, tanpa mencetak token/URL signed.

Perbarui Site URL serta allowlist redirect Supabase jika origin final berubah. Buat ulang build ketika `NEXT_PUBLIC_SITE_URL` berubah. Jalankan pengujian tampil mobile/desktop, keyboard, reduced motion, dan jaringan lambat pada URL deployment. Simpan commit SHA, deployment/version ID yang Cloudflare kembalikan, URL aplikasi, migration terakhir, serta hasil checklist. Jangan membuat URL `workers.dev` dari perkiraan subdomain akun.

Jika kode baru gagal, gunakan mekanisme rollback Cloudflare ke versi yang sebelumnya lulus. Jangan menganggap rollback Worker ikut mengembalikan database. Utamakan migration aditif yang kompatibel dengan versi lama dan baru; buat migration perbaikan bila perubahan data memerlukan koreksi. Jangan menjalankan reset database sebagai mekanisme rollback aplikasi.

### 19.11 Hasil akhir yang Antigravity wajib serahkan

Sediakan source website lengkap pada repository target, `README.md`, `docs/SETUP.md`, `docs/ADMIN_GUIDE.md`, `docs/DEPLOYMENT.md`, `docs/VALIDATION.md`, `.env.example`, `.dev.vars.example`, migration SQL lengkap, seed demo terpisah, fixture gambar uji, dan laporan pemeriksaan. Panduan deployment harus membedakan pengaturan build, runtime, CLI, Supabase Auth, Storage, Images binding, backup, serta rollback. Pemilik tidak perlu memahami SQL untuk mengubah menu harian.

Laporan akhir harus memisahkan status **source selesai**, **push berhasil**, **migration berhasil**, dan **deployment berhasil**. Sertakan bukti SHA/URL nyata untuk status yang berhasil. Jika akses Cloudflare atau key Supabase belum tersedia, tetap siapkan source dan konfigurasi yang dapat direview, lalu sebutkan bagian yang belum dapat pengembang jalankan. Jangan menyebut aplikasi sudah live atau database sudah terhubung hanya karena file konfigurasi memuat URL.

Untuk permintaan revisi dokumen ini, hasil aktual berupa MD yang menyesuaikan target dan commit dokumentasi GitHub. Instruksi implementasi di atas menjadi tugas Antigravity berikutnya. Jangan menganggap penyimpanan MD ke repository sebagai pembangunan atau deployment website.

## 20. Dasar perancangan dan sumber

Kajian Chan et al. (2021) menempatkan konten dan sistem sebagai unsur penting dalam penelitian desain website pariwisata dan hospitality [J1]. Dokumen ini menafsirkan kerangka tersebut dengan memprioritaskan ketepatan menu harian sekaligus komposisi visual. Kajian itu tidak membuktikan bahwa desain Pawon Tentrem akan meningkatkan penjualan, sehingga pengembang tetap perlu menguji hasil pada pengunjung dan admin sebenarnya.

Santoso et al. (2025) melaporkan evaluasi usability pada prototipe website kafe dengan pendekatan Design Thinking [J2]. Temuan pada konteks kafe tersebut mendukung pilihan metode prototipe dan uji tugas, tetapi tidak menggantikan uji pada pengelola rumah makan prasmanan. Oleh karena itu, jadikan pengujian alur foto, nama, dan publikasi sebagai bukti penerimaan proyek ini.

### Jurnal

- [J1] Chan, I. C. C., Law, R., Fong, L. H. N., & Zhong, L. (2021). Website design in tourism and hospitality: A multilevel review. *International Journal of Tourism Research, 23*, 805-815. https://doi.org/10.1002/jtr.2443
- [J2] Santoso, D. L., Caesaron, D., & Yekti, Y. N. D. (2025). Kaikana Coffee & Kitchen Website UI: A Design Thinking Approach. *International Journal of Innovation in Enterprise System, 9*(1), 41-50. https://doi.org/10.25124/ijies.v9i01.658

### Dokumentasi primer teknis

- [T1] Next.js, Installation. https://nextjs.org/docs/app/getting-started/installation
- [T2] Next.js, updateTag. https://nextjs.org/docs/app/api-reference/functions/updateTag
- [T3] Supabase, Storage Access Control. https://supabase.com/docs/guides/storage/security/access-control
- [T4] W3C, How to Meet WCAG 2.2. https://www.w3.org/WAI/WCAG22/quickref/
- [T5] Next.js, Authentication. https://nextjs.org/docs/app/guides/authentication
- [T6] web.dev, Web Vitals. https://web.dev/articles/vitals
- [T7] Cloudflare, Next.js and deployment paths. https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/
- [T8] Cloudflare, OpenNext adapter. https://developers.cloudflare.com/workers/framework-guides/web-apps/opennext/
- [T9] OpenNext, Cloudflare overview and compatibility. https://opennext.js.org/cloudflare
- [T10] Cloudflare Images, Optimize with Workers. https://developers.cloudflare.com/images/optimization/binding/
- [T11] Cloudflare Images, Limits and formats. https://developers.cloudflare.com/images/get-started/limits/
- [T12] Supabase, Creating a client for SSR. https://supabase.com/docs/guides/auth/server-side/creating-a-client?framework=nextjs
- [T13] Supabase, API keys. https://supabase.com/docs/guides/getting-started/api-keys
- [T14] Cloudflare, Workers Builds configuration. https://developers.cloudflare.com/workers/ci-cd/builds/configuration/
- [T15] OpenNext, Environment variables. https://opennext.js.org/cloudflare/howtos/env-vars
- [T16] Supabase, Managing environments. https://supabase.com/docs/guides/deployment/managing-environments
- [T17] Supabase, CLI reference. https://supabase.com/docs/reference/cli/supabase-db-push
- [T18] Cloudflare, Workers best practices. https://developers.cloudflare.com/workers/best-practices/workers-best-practices/

Dokumen ini membedakan temuan penelitian, kontrak teknis dari dokumentasi resmi, dan keputusan desain proyek. Ukuran layout, palet, durasi motion, urutan halaman, serta prioritas fitur merupakan spesifikasi yang proyek ini tetapkan. Verifikasi kembali dokumentasi versi aktual saat implementasi.
