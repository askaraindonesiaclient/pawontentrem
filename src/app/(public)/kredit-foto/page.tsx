import React from 'react';
import type { Metadata } from 'next';
import { ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kredit Foto | Pawon Tentrem',
  description:
    'Atribusi dan informasi lisensi foto ilustrasi pihak ketiga yang digunakan dalam mode demonstrasi.',
};

const CREDITS = [
  {
    file: 'prasmanan-lauk.jpg',
    title: 'Dokumentasi Asli Meja Saji & Lauk Prasmanan',
    creator: 'Pawon Tentrem (2026)',
    source: 'Dokumentasi Resmi Usaha',
    license: 'Hak Cipta Pawon Tentrem',
    licenseUrl: '#',
    isOfficial: true,
  },
  {
    file: 'prasmanan-antre.jpg',
    title: 'Dokumentasi Asli Suasana Tamu Prasmanan',
    creator: 'Pawon Tentrem (2026)',
    source: 'Dokumentasi Resmi Usaha',
    license: 'Hak Cipta Pawon Tentrem',
    licenseUrl: '#',
    isOfficial: true,
  },
  {
    file: 'suasana-ruang.jpg',
    title: 'Dokumentasi Asli Ruang Makan & Interior',
    creator: 'Pawon Tentrem (2026)',
    source: 'Dokumentasi Resmi Usaha',
    license: 'Hak Cipta Pawon Tentrem',
    licenseUrl: '#',
    isOfficial: true,
  },
  {
    file: 'pintu-masuk.jpg',
    title: 'Dokumentasi Asli Pintu Masuk Jawa & Loro Blonyo',
    creator: 'Pawon Tentrem (2026)',
    source: 'Dokumentasi Resmi Usaha',
    license: 'Hak Cipta Pawon Tentrem',
    licenseUrl: '#',
    isOfficial: true,
  },
  {
    file: 'nasi-liwet.jpg',
    title: 'Nasi Liwet Solo (Foto Referensi Kuliner)',
    creator: 'Atkhun08 (2022)',
    source: 'https://commons.wikimedia.org/wiki/File:Nasi_Liwet.jpg',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    isOfficial: false,
  },
  {
    file: 'nasi-rames.jpg',
    title: 'Nasi rames ayam goreng (Foto Referensi Kuliner)',
    creator: 'Midori (2007)',
    source: 'https://commons.wikimedia.org/wiki/File:Nasi_ramas_ayam_goreng.JPG',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    isOfficial: false,
  },
];

export default function KreditFotoPage() {
  return (
    <div className="py-12 md:py-20 bg-paper">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 space-y-8">
        <div>
          <span className="text-xs uppercase tracking-widest text-wood font-semibold">
            Hak Cipta & Dokumentasi
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-ink mt-2">
            Dokumentasi & Kredit Foto
          </h1>
          <p className="text-muted text-sm sm:text-base mt-2 leading-relaxed">
            Foto utama yang ditampilkan pada website Pawon Tentrem (prasmanan lauk, suasana antre santap,
            ruang makan, dan pintu masuk Jawa) adalah dokumentasi foto asli langsung dari rumah makan
            Pawon Tentrem. Foto referensi pendukung lainnya mencantumkan atribusi lisensi Creative Commons secara terbuka.
          </p>
        </div>

        <div className="rounded-card overflow-hidden border border-line bg-rice">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-leaf text-paper uppercase text-xs tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Nama Berkas</th>
                  <th className="py-3.5 px-4">Keterangan & Pembuat</th>
                  <th className="py-3.5 px-4">Sumber</th>
                  <th className="py-3.5 px-4">Lisensi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {CREDITS.map((c) => (
                  <tr key={c.file} className="hover:bg-paper/60 transition-colors">
                    <td className="py-4 px-4 font-mono text-xs text-wood font-medium">{c.file}</td>
                    <td className="py-4 px-4 font-medium text-ink">
                      <div>{c.title}</div>
                      <div className="text-xs text-muted font-normal">{c.creator}</div>
                    </td>
                    <td className="py-4 px-4">
                      {c.isOfficial ? (
                        <span className="text-leaf font-medium text-xs">Arsip Resmi Usaha</span>
                      ) : (
                        <a
                          href={c.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-leaf underline hover:text-leaf-dark"
                        >
                          <span>Buka Wikimedia</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <a
                        href={c.licenseUrl}
                        target={c.isOfficial ? undefined : '_blank'}
                        rel="noopener noreferrer"
                        className={`inline-block px-2.5 py-1 rounded-full border text-xs font-semibold ${
                          c.isOfficial
                            ? 'bg-leaf/10 border-leaf/30 text-leaf'
                            : 'bg-paper border-line text-ink hover:border-leaf'
                        }`}
                      >
                        {c.license}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-6 rounded-card bg-rice/60 border border-line text-xs text-muted leading-relaxed">
          <strong>Catatan Penggunaan:</strong> Sebelum peluncuran produksi penuh, pemilik usaha
          dapat mengganti foto-foto ini dengan foto asli masakan dan dapur Pawon Tentrem melalui
          dashboard admin. Jika foto ini tetap digunakan, atribusi di atas akan tetap dipertahankan
          sesuai klausul ShareAlike.
        </div>
      </div>
    </div>
  );
}

