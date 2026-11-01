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
    file: 'nasi-liwet.jpg',
    title: 'Nasi Liwet',
    creator: 'Atkhun08 (2022)',
    source: 'https://commons.wikimedia.org/wiki/File:Nasi_Liwet.jpg',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
  },
  {
    file: 'nasi-rames.jpg',
    title: 'Nasi ramas ayam goreng',
    creator: 'Midori (2007)',
    source: 'https://commons.wikimedia.org/wiki/File:Nasi_ramas_ayam_goreng.JPG',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
  },
  {
    file: 'prasmanan.jpg',
    title: 'Warung Nasi Pecel Yu Sri ngisor Talok (4)',
    creator: 'YT Arty (2026)',
    source: 'https://commons.wikimedia.org/wiki/File:Warung_Nasi_Pecel_Yu_Sri_ngisor_Talok_(4).jpg',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
  },
];

export default function KreditFotoPage() {
  return (
    <div className="py-12 md:py-20 bg-paper">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 space-y-8">
        <div>
          <span className="text-xs uppercase tracking-widest text-wood font-semibold">
            Hak Cipta & Lisensi
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-ink mt-2">
            Kredit Foto Ilustrasi
          </h1>
          <p className="text-muted text-sm sm:text-base mt-2 leading-relaxed">
            Seluruh foto masakan dan warung yang digunakan pada prototipe awal dan mode demo ini
            berasal dari Wikimedia Commons dengan lisensi Creative Commons terbuka. Foto-foto ini
            berfungsi sebagai ilustrasi dan bukan foto asli lokasi Pawon Tentrem.
          </p>
        </div>

        <div className="rounded-card overflow-hidden border border-line bg-rice">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-leaf text-paper uppercase text-xs tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Nama Berkas</th>
                  <th className="py-3.5 px-4">Judul & Pembuat</th>
                  <th className="py-3.5 px-4">Sumber Asli</th>
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
                      <a
                        href={c.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-leaf underline hover:text-leaf-dark"
                      >
                        <span>Buka Wikimedia</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </td>
                    <td className="py-4 px-4">
                      <a
                        href={c.licenseUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-2.5 py-1 rounded-full bg-paper border border-line text-xs font-semibold text-ink hover:border-leaf"
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
