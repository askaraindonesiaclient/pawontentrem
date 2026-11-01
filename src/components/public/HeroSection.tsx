import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, MapPin } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="javanese-surface relative overflow-hidden py-12 md:py-20 lg:py-28">
      <div className="max-w-container mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Text (46%) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-block px-3.5 py-1.5 rounded-full bg-paper/80 border border-line text-xs uppercase tracking-widest text-wood font-semibold">
              Rumah Makan Prasmanan
            </div>

            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-ink leading-[1.1] tracking-tight">
              Rasa rumahan,
              <br />
              <span className="text-leaf">suasana yang menentramkan.</span>
            </h1>

            <p className="text-muted text-base sm:text-lg leading-relaxed max-w-lg">
              Pilih lauk dan sayur sesuai selera. Seluruh hidangan dimasak segar dengan bumbu rempah
              asli Jawa. Lihat sajian hari ini sebelum Anda mampir.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="#menu-hari-ini"
                className="touch-target inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-leaf text-paper font-semibold hover:bg-leaf-dark transition-colors shadow-sm"
              >
                <span>Lihat Menu Hari Ini</span>
                <ArrowDown className="w-4 h-4 text-turmeric" />
              </a>

              <Link
                href="/lokasi-kontak"
                className="touch-target inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-paper border border-line text-ink font-semibold hover:border-leaf hover:text-leaf transition-colors"
              >
                <MapPin className="w-4 h-4 text-wood" />
                <span>Petunjuk Lokasi</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Food Photo (54%) */}
          <div className="lg:col-span-6">
            <div className="relative rounded-card overflow-hidden bg-paper border border-line shadow-md aspect-[4/3] w-full max-h-[460px]">
              <Image
                src="/assets/photos/nasi-liwet.jpg"
                alt="Sajian Nasi Liwet hangat Pawon Tentrem"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
              />
              <div className="absolute bottom-3 right-3 px-3 py-1 bg-ink/70 backdrop-blur-sm rounded-md text-[11px] text-paper/90">
                Foto ilustrasi sajian
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

