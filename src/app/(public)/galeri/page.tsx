import React from 'react';
import type { Metadata } from 'next';
import { GaleriGrid } from '@/components/public/GaleriGrid';

export const metadata: Metadata = {
  title: 'Galeri Foto | Pawon Tentrem',
  description:
    'Dokumentasi visual sajian makanan dan suasana hangat rumah makan prasmanan Pawon Tentrem.',
};

export default function GaleriPage() {
  return (
    <div className="py-12 md:py-20 bg-paper">
      <div className="max-w-container mx-auto px-5 sm:px-8 space-y-12">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-widest text-wood font-semibold">
            Dokumentasi Visual
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-ink mt-2">
            Galeri Suasana Pawon
          </h1>
          <p className="text-muted text-base sm:text-lg mt-3 leading-relaxed">
            Menangkap momen kehangatan meja saji, aneka lauk tradisional, dan suasana nyaman saat
            bersantap bersama orang terkasih.
          </p>
        </div>

        {/* Full Gallery Grid with filters & lightbox */}
        <GaleriGrid showFilter={true} />

        <div className="pt-8 border-t border-line text-xs text-muted">
          <p>
            * Foto yang ditampilkan pada prototipe ini mencakup foto contoh berlisensi terbuka.
            Lihat{' '}
            <a href="/kredit-foto" className="text-leaf underline font-medium">
              halaman Kredit Foto
            </a>{' '}
            untuk detail atribusi lengkap.
          </p>
        </div>
      </div>
    </div>
  );
}

