import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function CeritaSingkat() {
  return (
    <section className="javanese-truntum-surface py-16 md:py-24 bg-rice overflow-hidden">
      <div className="max-w-container mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Photo Left */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-card overflow-hidden bg-paper border border-line shadow-sm aspect-[4/3] w-full">
              <Image
                src="/assets/photos/prasmanan.jpg"
                alt="Suasana meja prasmanan Pawon Tentrem"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover"
              />
              <div className="absolute bottom-2 right-2 px-2.5 py-0.5 bg-ink/75 backdrop-blur-sm rounded text-[10px] text-paper">
                Foto ilustrasi warung prasmanan
              </div>
            </div>
          </div>

          {/* Text Right */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-4">
            <span className="text-xs uppercase tracking-widest text-wood font-semibold">
              Cerita Pawon
            </span>

            <h2 className="font-editorial text-3xl md:text-4xl font-bold text-ink leading-tight">
              Sederhana sajiannya,
              <br />
              <span className="text-leaf">hangat suasananya.</span>
            </h2>

            <div className="py-2">
              <Image
                src="/assets/patterns/sulur-divider-brown.png"
                alt=""
                width={260}
                height={30}
                className="opacity-45"
                aria-hidden="true"
              />
            </div>

            <p className="text-muted text-base leading-relaxed">
              Pawon Tentrem berawal dari kerinduan bersantap di dapur rumah nenek, di mana aroma
              bumbu tumis rempah tradisional dan kepulan nasi hangat selalu menyambut siapa saja
              yang singgah. Kami meracik masakan Jawa rumahan dengan resep yang tulus dan bersahaja.
            </p>

            <div className="pt-2">
              <Link
                href="/tentang"
                className="touch-target inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-leaf text-leaf text-sm font-semibold hover:bg-leaf hover:text-paper transition-colors"
              >
                Baca Cerita Selengkapnya
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

