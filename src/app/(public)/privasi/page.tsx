import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kebijakan Privasi | Pawon Tentrem',
  description:
    'Kebijakan privasi dan transparansi pengelolaan data pada website rumah makan Pawon Tentrem.',
};

export default function PrivasiPage() {
  return (
    <div className="py-12 md:py-20 bg-paper">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 space-y-8 text-ink/90 leading-relaxed">
        <div>
          <span className="text-xs uppercase tracking-widest text-wood font-semibold">
            Transparansi Data
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-ink mt-2">
            Kebijakan Privasi
          </h1>
          <p className="text-muted text-sm mt-1">Terakhir diperbarui: 1 November 2026</p>
        </div>

        <section className="space-y-3">
          <h2 className="font-editorial text-xl font-bold text-ink">1. Ruang Lingkup</h2>
          <p className="text-sm">
            Website Pawon Tentrem dirancang dengan prinsip minimasi data. Halaman publik bersifat
            terbuka dan tidak mewajibkan pengunjung membuat akun, mengisi formulir identitas pribadi,
            ataupun melakukan transaksi pembayaran di dalam situs web.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-editorial text-xl font-bold text-ink">2. Data Pengunjung Publik</h2>
          <p className="text-sm">
            Kami tidak memasang pelacak lintas situs (third-party tracking cookies) yang menjual
            informasi kebiasaan berselancar Anda. Request ke server web mencatat log akses standar
            (seperti alamat IP, user-agent peramban, dan waktu akses) untuk keamanan infrastruktur,
            pencegahan penyalahgunaan rate limit, dan kestabilan performa hosting Cloudflare Workers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-editorial text-xl font-bold text-ink">3. Pengelolaan Data Admin</h2>
          <p className="text-sm">
            Bagi pengelola (admin/editor) yang memiliki akun terdaftar:
          </p>
          <ul className="list-disc pl-5 text-sm space-y-1 text-muted">
            <li>Alamat email dan token sesi disimpan secara terenkripsi oleh Supabase Auth.</li>
            <li>
              Aktivitas administratif (seperti penerbitan menu harian dan perubahan status) dicatat
              dalam audit log internal demi integritas riwayat layanan.
            </li>
            <li>
              Foto menu yang diunggah diproses tanpa menyertakan metadata lokasi sensitif (EXIF/GPS).
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-editorial text-xl font-bold text-ink">4. Komunikasi WhatsApp</h2>
          <p className="text-sm">
            Tautan "Tanya via WhatsApp" mengarahkan Anda langsung ke aplikasi WhatsApp milik Anda.
            Percakapan yang terjadi tunduk pada kebijakan privasi WhatsApp dan ditangani langsung
            oleh staf pengelola Pawon Tentrem tanpa melalui server perantara kami.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-editorial text-xl font-bold text-ink">5. Kontak Pengelola</h2>
          <p className="text-sm">
            Untuk pertanyaan terkait operasional situs web ini, silakan hubungi pengelola melalui
            halaman Lokasi & Kontak.
          </p>
        </section>
      </div>
    </div>
  );
}
