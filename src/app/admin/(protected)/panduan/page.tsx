import React from 'react';
import { Sun, CheckCircle2, DollarSign, Camera, Moon } from 'lucide-react';

export default function PanduanAdminPage() {
  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-ink">
          Panduan Praktis Pengelola Harian
        </h1>
        <p className="text-muted text-xs sm:text-sm mt-1">
          Langkah sederhana dan checklist kerja rutin untuk staf dapur dan kasir Pawon Tentrem.
        </p>
      </div>

      <div className="space-y-6">
        {/* 1. Membuka Hari */}
        <div className="p-6 rounded-card bg-paper border border-line shadow-xs space-y-3">
          <div className="flex items-center gap-3 text-leaf">
            <Sun className="w-6 h-6 text-turmeric" />
            <h2 className="font-editorial text-xl font-bold text-ink">1. Membuka Hari Layanan</h2>
          </div>
          <p className="text-sm text-ink/90 leading-relaxed">
            Setiap pagi saat sajian mulai matang: masuk ke ruang pengelola, periksa tanggal hari ini,
            lalu tekan tombol hijau <strong>+ Tambah Menu Hari Ini</strong> (atau gunakan tombol{' '}
            <strong>Salin dari Tanggal Lain</strong> jika menu serupa). Ambil foto langsung melalui
            kamera ponsel, ketik nama sajian, lalu tekan <strong>Pratinjau & Terbitkan</strong> agar
            pengunjung langsung melihat menu segar hari ini.
          </p>
        </div>

        {/* 2. Menghabiskan Stok */}
        <div className="p-6 rounded-card bg-paper border border-line shadow-xs space-y-3">
          <div className="flex items-center gap-3 text-leaf">
            <CheckCircle2 className="w-6 h-6 text-danger" />
            <h2 className="font-editorial text-xl font-bold text-ink">2. Menandai Lauk yang Habis</h2>
          </div>
          <p className="text-sm text-ink/90 leading-relaxed">
            Jika satu panci sayur atau wadah lauk telah habis sebelum jam tutup: buka halaman{' '}
            <strong>Menu Harian</strong>, klik tombol status pada baris makanan tersebut hingga
            berubah menjadi <strong>Habis hari ini</strong>, lalu klik{' '}
            <strong>Pratinjau & Terbitkan</strong>. Pengunjung di beranda akan melihat badge habis
            sehingga tidak kecewa saat mampir.
          </p>
        </div>

        {/* 3. Mengganti Harga */}
        <div className="p-6 rounded-card bg-paper border border-line shadow-xs space-y-3">
          <div className="flex items-center gap-3 text-leaf">
            <DollarSign className="w-6 h-6 text-leaf" />
            <h2 className="font-editorial text-xl font-bold text-ink">3. Mengatur atau Menghapus Harga</h2>
          </div>
          <p className="text-sm text-ink/90 leading-relaxed">
            Harga bersifat opsional. Jika Anda mengosongkan harga, sistem tidak akan menampilkan Rp0
            ataupun kotak kosong; sistem akan otomatis menyesuaikan tampilan agar tetap rapi. Jika
            ingin mengubah harga, klik <strong>Ubah</strong> pada item, isi nominal baru, simpan, lalu
            terbitkan.
          </p>
        </div>

        {/* 4. Memperbaiki Foto */}
        <div className="p-6 rounded-card bg-paper border border-line shadow-xs space-y-3">
          <div className="flex items-center gap-3 text-leaf">
            <Camera className="w-6 h-6 text-wood" />
            <h2 className="font-editorial text-xl font-bold text-ink">4. Mengganti Foto yang Kurang Jelas</h2>
          </div>
          <p className="text-sm text-ink/90 leading-relaxed">
            Jika foto awal kurang fokus atau pencahayaannya redup: ambil foto baru saat siang hari,
            unggah pada item terkait, dan periksa pratinjau 4:3 otomatis sebelum menekan terbit.
          </p>
        </div>

        {/* 5. Mengakhiri Hari */}
        <div className="p-6 rounded-card bg-paper border border-line shadow-xs space-y-3">
          <div className="flex items-center gap-3 text-leaf">
            <Moon className="w-6 h-6 text-wood" />
            <h2 className="font-editorial text-xl font-bold text-ink">5. Mengakhiri Hari Layanan</h2>
          </div>
          <p className="text-sm text-ink/90 leading-relaxed">
            Anda <strong>tidak perlu menghapus</strong> menu hari ini saat menutup warung malam hari.
            Tepat pukul 00.00 WIB tengah malam, sistem otomatis beralih ke tanggal berikutnya dan
            menampilkan status persiapan sampai Anda menerbitkan menu baru keesokan paginya. Riwayat
            hari kemarin akan tersimpan rapi di halaman <strong>Riwayat</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
