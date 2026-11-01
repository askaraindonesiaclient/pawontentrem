'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Pause, ChevronLeft, ChevronRight, MessageCircle, AlertCircle } from 'lucide-react';
import { MenuItem, MenuCategory, TodayMenuResponse } from '@/types';
import { formatIndonesianDate, formatRupiahNullable, formatWibTime } from '@/lib/time/wib';

interface DailyMenuSectionProps {
  initialData?: TodayMenuResponse;
}

const CATEGORIES: { key: string; label: string }[] = [
  { key: 'semua', label: 'Semua' },
  { key: 'lauk', label: 'Lauk' },
  { key: 'sayur', label: 'Sayur' },
  { key: 'pelengkap', label: 'Pelengkap' },
  { key: 'sambal', label: 'Sambal' },
  { key: 'minuman', label: 'Minuman' },
];

export function DailyMenuSection({ initialData }: DailyMenuSectionProps) {
  const [data, setData] = useState<TodayMenuResponse | undefined>(initialData);
  const [selectedCategory, setSelectedCategory] = useState<string>('semua');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Poll today's menu periodically and on window focus
  useEffect(() => {
    let isMounted = true;

    async function fetchToday() {
      try {
        const res = await fetch('/api/public/today', { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (isMounted) setData(json);
        }
      } catch {
        // network or server error handled gracefully
      }
    }

    const interval = setInterval(fetchToday, 60000);
    const handleFocus = () => {
      if (document.visibilityState === 'visible') {
        fetchToday();
      }
    };

    window.addEventListener('visibilitychange', handleFocus);
    window.addEventListener('focus', handleFocus);

    return () => {
      isMounted = false;
      clearInterval(interval);
      window.removeEventListener('visibilitychange', handleFocus);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const items: MenuItem[] = data?.items || [];
  const isPublished = data?.status === 'published' && items.length > 0;
  const allSoldOut = isPublished && items.every((i) => i.availability === 'sold_out');

  // Filter items by category
  const filteredItems = useMemo(() => {
    if (selectedCategory === 'semua') return items;
    return items.filter((i) => i.category === selectedCategory);
  }, [items, selectedCategory]);

  // Extract photos for available items
  const photos = useMemo(() => {
    const list: { url: string; alt: string; name: string }[] = [];
    items.forEach((item) => {
      if (item.availability === 'available' && item.media && item.media.length > 0) {
        item.media.forEach((m) => {
          if (m.url) {
            list.push({
              url: m.url,
              alt: m.alt || item.name,
              name: item.name,
            });
          }
        });
      }
    });
    return list;
  }, [items]);

  // Slideshow timer
  useEffect(() => {
    if (!isPlaying || photos.length <= 1 || allSoldOut) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % photos.length);
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, photos.length, allSoldOut]);

  const handlePrevSlide = () => {
    setIsPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleNextSlide = () => {
    setIsPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % photos.length);
  };

  const formattedDate = data?.serviceDate
    ? formatIndonesianDate(data.serviceDate)
    : formatIndonesianDate(new Date());

  const formattedUpdate = data?.updatedAt || data?.publishedAt
    ? `Diperbarui ${formatWibTime(data.updatedAt || data.publishedAt!)}`
    : 'Diperbarui pagi ini';

  return (
    <section id="menu-hari-ini" className="py-16 md:py-24 bg-paper scroll-mt-24">
      <div className="max-w-container mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-line gap-4">
          <div>
            <span className="text-xs md:text-sm uppercase tracking-widest text-wood font-medium">
              Sajian Prasmanan Segar
            </span>
            <h2 className="font-editorial text-3xl md:text-4xl lg:text-5xl font-bold text-ink mt-1">
              Menu Hari Ini
            </h2>
            <p className="text-muted text-sm md:text-base mt-2">
              {formattedDate} • <span className="text-leaf font-medium">{formattedUpdate}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/lokasi-kontak"
              className="touch-target inline-flex items-center gap-2 px-4 py-2 rounded-full border border-line text-xs md:text-sm font-medium text-ink hover:border-leaf hover:text-leaf transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-leaf" />
              <span>Tanya Ketersediaan</span>
            </Link>
          </div>
        </div>

        {/* Empty State / Not Published */}
        {!isPublished ? (
          <div className="rounded-card bg-rice p-8 md:p-12 text-center max-w-xl mx-auto border border-line my-8">
            <AlertCircle className="w-10 h-10 text-wood mx-auto mb-4" />
            <h3 className="font-editorial text-2xl font-bold text-ink mb-2">
              Menu hari ini belum diperbarui
            </h3>
            <p className="text-muted text-sm md:text-base leading-relaxed mb-6">
              Dapur Pawon Tentrem sedang menyiapkan sajian prasmanan segar hari ini. Silakan hubungi
              kami untuk menanyakan menu yang baru saja matang.
            </p>
            <Link
              href="/lokasi-kontak"
              className="touch-target inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-leaf text-paper text-sm font-medium hover:bg-leaf-dark transition-colors"
            >
              Hubungi Pengelola Pawon
            </Link>
          </div>
        ) : (
          <div>
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`touch-target px-5 py-2 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-colors ${
                      isActive
                        ? 'bg-leaf text-paper shadow-sm'
                        : 'bg-rice text-muted hover:text-ink hover:bg-line/40'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Main Layout: 48% Photo Gallery Left, 52% Item List Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column: Photo Gallery (48%) */}
              <div className="lg:col-span-6">
                {photos.length > 0 && !allSoldOut ? (
                  <div className="rounded-card overflow-hidden bg-rice border border-line shadow-sm relative group">
                    {/* 4:3 Aspect Ratio Container */}
                    <div className="relative aspect-[4/3] w-full bg-line/20">
                      <Image
                        src={photos[currentSlide].url}
                        alt={photos[currentSlide].alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 550px"
                        className="object-cover transition-opacity duration-500"
                        priority
                      />
                      {/* Photo Caption Overlay */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 via-ink/40 to-transparent p-4 text-paper">
                        <p className="font-editorial text-lg font-semibold">
                          {photos[currentSlide].name}
                        </p>
                        <p className="text-xs text-paper/80">{photos[currentSlide].alt}</p>
                      </div>
                    </div>

                    {/* Slideshow Controls Bar */}
                    <div className="p-3 bg-paper border-t border-line flex items-center justify-between text-xs text-muted">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handlePrevSlide}
                          className="p-1.5 rounded hover:bg-rice text-ink"
                          aria-label="Foto sebelumnya"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-rice hover:bg-line/40 text-ink font-medium"
                        >
                          {isPlaying ? (
                            <>
                              <Pause className="w-3.5 h-3.5" />
                              <span>Jeda</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3.5 h-3.5" />
                              <span>Putar</span>
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={handleNextSlide}
                          className="p-1.5 rounded hover:bg-rice text-ink"
                          aria-label="Foto berikutnya"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="font-medium text-wood tracking-wider">
                        {String(currentSlide + 1).padStart(2, '0')} /{' '}
                        {String(photos.length).padStart(2, '0')}
                      </div>
                    </div>
                  </div>
                ) : allSoldOut ? (
                  <div className="rounded-card bg-rice border border-line p-8 text-center">
                    <p className="font-editorial text-xl font-bold text-danger mb-2">
                      Sajian hari ini sudah habis
                    </p>
                    <p className="text-muted text-sm">
                      Terima kasih atas kunjungannya. Dapur akan kembali memasak menu baru besok pagi.
                    </p>
                  </div>
                ) : (
                  <div className="rounded-card bg-rice border border-line p-8 text-center text-muted text-sm">
                    Foto sajian belum ditambahkan. Daftar tulisan lengkap tertera di samping.
                  </div>
                )}
              </div>

              {/* Right Column: Text List (52%) */}
              <div className="lg:col-span-6 space-y-3">
                {filteredItems.length === 0 ? (
                  <div className="py-8 text-center text-muted text-sm">
                    Tidak ada menu dalam kategori ini hari ini.
                  </div>
                ) : (
                  filteredItems.map((item) => {
                    const priceFormatted = formatRupiahNullable(
                      item.priceRupiah,
                      item.priceMode,
                      item.priceUnit
                    );
                    const isSoldOut = item.availability === 'sold_out';

                    return (
                      <div
                        key={item.id}
                        className={`p-4 rounded-xl border transition-all ${
                          isSoldOut
                            ? 'bg-rice/50 border-line/60 opacity-70'
                            : 'bg-paper border-line hover:border-leaf/40 shadow-xs'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="font-editorial text-lg md:text-xl font-bold text-ink leading-snug">
                                {item.name}
                              </h4>
                              {isSoldOut ? (
                                <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-danger/10 text-danger border border-danger/20">
                                  Habis hari ini
                                </span>
                              ) : (
                                <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-success-bg text-leaf border border-leaf/20">
                                  Tersedia
                                </span>
                              )}
                            </div>

                            <span className="text-xs uppercase tracking-wider text-wood font-medium capitalize">
                              {item.category}
                            </span>
                          </div>

                          {/* Nullable Price Display */}
                          {priceFormatted && (
                            <div className="text-right whitespace-nowrap">
                              <span className="font-medium text-sm md:text-base text-leaf">
                                {priceFormatted}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}

                <div className="pt-4 text-xs text-muted leading-relaxed">
                  * Harga dan ketersediaan dapat menyesuaikan pilihan porsi kasir saat Anda mampir.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
