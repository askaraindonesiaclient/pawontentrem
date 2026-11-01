import React from 'react';
import { HeroSection } from '@/components/public/HeroSection';
import { DailyMenuSection } from '@/components/public/DailyMenuSection';
import { CaraPrasmanan } from '@/components/public/CaraPrasmanan';
import { CeritaSingkat } from '@/components/public/CeritaSingkat';
import { GaleriGrid } from '@/components/public/GaleriGrid';
import { MampirLokasi } from '@/components/public/MampirLokasi';
import { getTodayMenu } from '@/lib/menu/service';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const revalidate = 0; // Dynamic rendering for freshness

export default async function HomePage() {
  const todayMenu = await getTodayMenu();

  return (
    <div>
      {/* 1. Hero Ringkas */}
      <HeroSection />

      {/* 2. Menu Hari Ini (Pusat Pengalaman) */}
      <DailyMenuSection initialData={todayMenu} />

      {/* 3. Cara Menikmati Prasmanan */}
      <CaraPrasmanan />

      {/* 4. Cerita Singkat Pawon */}
      <CeritaSingkat />

      {/* 5. Galeri Kurasi */}
      <section className="py-16 md:py-24 bg-rice border-b border-line">
        <div className="max-w-container mx-auto px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-line/60 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-wood font-semibold">
                Dokumentasi Suasana
              </span>
              <h2 className="font-editorial text-3xl md:text-4xl font-bold text-ink mt-1">
                Suasana Pawon Tentrem
              </h2>
            </div>
            <Link
              href="/galeri"
              className="touch-target inline-flex items-center gap-2 text-sm font-semibold text-leaf hover:text-leaf-dark transition-colors"
            >
              <span>Lihat Semua Foto Galeri</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <GaleriGrid showFilter={false} limit={3} />
        </div>
      </section>

      {/* 6. Lokasi & Jam Operasional */}
      <MampirLokasi />
    </div>
  );
}
