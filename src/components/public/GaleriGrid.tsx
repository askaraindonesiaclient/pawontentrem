'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryItem {
  id: string;
  url: string;
  title: string;
  category: 'makanan' | 'suasana' | 'kegiatan';
  alt: string;
  credit?: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    url: '/assets/photos/prasmanan-lauk.jpg',
    title: 'Meja Saji Aneka Lauk Prasmanan',
    category: 'makanan',
    alt: 'Sajian hangat aneka lauk ayam pedas manis, bakwan goreng, dan rempah khas Pawon Tentrem',
    credit: 'Dokumentasi Asli Pawon Tentrem',
  },
  {
    id: 'g-2',
    url: '/assets/photos/prasmanan-antre.jpg',
    title: 'Suasana Santap Prasmanan Hangat',
    category: 'kegiatan',
    alt: 'Pelanggan antre memilih sajian prasmanan di bawah lampu gantung antik Pawon Tentrem',
    credit: 'Dokumentasi Asli Pawon Tentrem',
  },
  {
    id: 'g-3',
    url: '/assets/photos/suasana-ruang.jpg',
    title: 'Kenyamanan Ruang Makan & Interior Pawon',
    category: 'suasana',
    alt: 'Ruang makan berubin motif klasik, lukisan pasar tradisional, dan area prasmanan yang asri',
    credit: 'Dokumentasi Asli Pawon Tentrem',
  },
  {
    id: 'g-4',
    url: '/assets/photos/pintu-masuk.jpg',
    title: 'Pintu Masuk Bernuansa Budaya Jawa',
    category: 'suasana',
    alt: 'Pintu kayu jati berhias patung Loro Blonyo dan caping tradisional menyambut tamu',
    credit: 'Dokumentasi Asli Pawon Tentrem',
  },
  {
    id: 'g-5',
    url: '/assets/photos/nasi-liwet.jpg',
    title: 'Sajian Nasi Liwet Gurih Rempah',
    category: 'makanan',
    alt: 'Nasi Liwet khas Jawa dengan lauk suwir ayam dan telur pindang',
    credit: 'Arsip Kuliner Tradisional',
  },
  {
    id: 'g-6',
    url: '/assets/photos/nasi-rames.jpg',
    title: 'Nasi Rames Jawa Komplit',
    category: 'makanan',
    alt: 'Piring prasmanan dengan nasi rames dan aneka lauk gurih',
    credit: 'Arsip Kuliner Tradisional',
  },
];

interface GaleriGridProps {
  showFilter?: boolean;
  limit?: number;
}

export function GaleriGrid({ showFilter = true, limit }: GaleriGridProps) {
  const [filter, setFilter] = useState<string>('semua');
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);

  const filtered = GALLERY_ITEMS.filter((item) => {
    if (filter === 'semua') return true;
    return item.category === filter;
  });

  const displayItems = limit ? filtered.slice(0, limit) : filtered;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (activeItemIndex === null) return;
      if (e.key === 'Escape') {
        setActiveItemIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setActiveItemIndex((prev) => (prev! > 0 ? prev! - 1 : displayItems.length - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveItemIndex((prev) => (prev! < displayItems.length - 1 ? prev! + 1 : 0));
      }
    },
    [activeItemIndex, displayItems.length]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div>
      {/* Category Filter */}
      {showFilter && (
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {['semua', 'makanan', 'suasana', 'kegiatan'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`touch-target px-5 py-2 rounded-full text-xs md:text-sm font-medium capitalize transition-colors ${
                filter === cat
                  ? 'bg-leaf text-paper shadow-sm'
                  : 'bg-rice text-muted hover:text-ink hover:bg-line/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Grid: 4:3 cells */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayItems.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveItemIndex(idx)}
            className="group relative rounded-card overflow-hidden bg-paper border border-line shadow-xs aspect-[4/3] w-full text-left focus:outline-none focus:ring-2 focus:ring-leaf"
          >
            <Image
              src={item.url}
              alt={item.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent p-4 opacity-90 group-hover:opacity-100 transition-opacity">
              <p className="font-editorial text-base font-bold text-paper">{item.title}</p>
              <p className="text-[11px] text-paper/80 capitalize">{item.category}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeItemIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-ink/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
        >
          <div className="relative max-w-4xl w-full bg-paper rounded-card overflow-hidden shadow-2xl border border-line">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setActiveItemIndex(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-ink/60 text-paper hover:bg-ink transition-colors"
              aria-label="Tutup lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Photo container */}
            <div className="relative aspect-[4/3] md:aspect-[16/10] w-full bg-ink">
              <Image
                src={displayItems[activeItemIndex].url}
                alt={displayItems[activeItemIndex].alt}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Caption & Controls */}
            <div className="p-4 md:p-6 bg-paper flex items-center justify-between gap-4 border-t border-line">
              <div>
                <h4 className="font-editorial text-lg md:text-xl font-bold text-ink">
                  {displayItems[activeItemIndex].title}
                </h4>
                <p className="text-xs text-muted mt-1">{displayItems[activeItemIndex].alt}</p>
                {displayItems[activeItemIndex].credit && (
                  <p className="text-[11px] text-wood mt-0.5">
                    Kredit: {displayItems[activeItemIndex].credit}
                  </p>
                )}
              </div>

              {/* Prev / Next */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setActiveItemIndex((prev) =>
                      prev! > 0 ? prev! - 1 : displayItems.length - 1
                    )
                  }
                  className="touch-target p-2 rounded-full border border-line hover:border-leaf text-ink transition-colors"
                  aria-label="Foto sebelumnya"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveItemIndex((prev) =>
                      prev! < displayItems.length - 1 ? prev! + 1 : 0
                    )
                  }
                  className="touch-target p-2 rounded-full border border-line hover:border-leaf text-ink transition-colors"
                  aria-label="Foto berikutnya"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

