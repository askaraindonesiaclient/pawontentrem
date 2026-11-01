import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Sparkles, Utensils, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cerita Pawon | Pawon Tentrem',
  description:
    'Kisah dan filosofi di balik Pawon Tentrem. Menghadirkan rasa rumahan dan kehangatan masakan Jawa yang menentramkan.',
};

export default function TentangPage() {
  return (
    <div className="py-12 md:py-20 bg-paper">
      <div className="max-w-container mx-auto px-5 sm:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-widest text-wood font-semibold">
            Tentang Kami
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-ink mt-2">
            Cerita dari Dapur Pawon Tentrem
          </h1>
          <p className="text-muted text-lg mt-4 leading-relaxed">
            Menghadirkan kembali kehangatan rumah, di mana setiap hidangan dimasak dengan ketulusan
            bumbu rempah nusantara.
          </p>
        </div>

        {/* Narrative & Photo Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6 text-ink/90 leading-relaxed">
            <p>
              Pawon Tentrem terinspirasi dari suasana pawon (dapur tradisional Jawa) yang selalu
              menjadi pusat kehangatan keluarga. Di masa lalu, aroma sedap bumbu tumis di atas
              tungku arang dan kepulan uap nasi liwet selalu menjadi tanda bahwa siapa saja yang
              pulang akan disambut dengan tangan terbuka.
            </p>
            <p>
              Kami ingin merawat kenangan tersebut melalui konsep rumah makan prasmanan. Di sini,
              Anda tidak dibatasi oleh menu paket yang kaku. Setiap pengunjung dipersilakan mengambil
              piring, memilih nasi hangat, lalu memadukannya dengan sayur lodeh, tumis daun pepaya,
              ayam goreng lengkuas, serta sambal terasi ulek segar sesuai selera porsi masing-masing.
            </p>
            <p>
              Bagi kami, makanan bukan sekadar pengisi perut, melainkan jeda yang menentramkan di
              tengah kesibukan harian.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-card overflow-hidden bg-rice border border-line shadow-md aspect-[4/3] w-full">
              <Image
                src="/assets/photos/prasmanan.jpg"
                alt="Suasana prasmanan Pawon Tentrem"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
              />
              <div className="absolute bottom-3 right-3 px-3 py-1 bg-ink/75 backdrop-blur-sm rounded text-[11px] text-paper">
                Foto ilustrasi warung prasmanan
              </div>
            </div>
          </div>
        </div>

        {/* Nilai Pelayanan */}
        <div className="pt-8 border-t border-line">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-editorial text-3xl font-bold text-ink">
              Nilai yang Selalu Kami Jaga
            </h2>
            <p className="text-muted text-sm mt-2">
              Prinsip sederhana yang mengiringi kami memasak setiap hari.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-card bg-rice border border-line">
              <div className="w-12 h-12 rounded-full bg-leaf text-turmeric flex items-center justify-center mb-6">
                <Utensils className="w-6 h-6" />
              </div>
              <h3 className="font-editorial text-xl font-bold text-ink mb-2">
                Segar Setiap Pagi
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                Sayur dan lauk dimasak baru setiap pagi menjelang jam buka. Kami tidak menyajikan
                makanan sisa hari kemarin.
              </p>
            </div>

            <div className="p-8 rounded-card bg-rice border border-line">
              <div className="w-12 h-12 rounded-full bg-leaf text-turmeric flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-editorial text-xl font-bold text-ink mb-2">
                Rempah Alami Nusantara
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                Menggunakan paduan rempah tradisional seperti lengkuas, serai, daun salam, dan
                bawang merah lokal untuk cita rasa autentik.
              </p>
            </div>

            <div className="p-8 rounded-card bg-rice border border-line">
              <div className="w-12 h-12 rounded-full bg-leaf text-turmeric flex items-center justify-center mb-6">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-editorial text-xl font-bold text-ink mb-2">
                Pelayanan yang Bersahaja
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                Suasana tenang, senyuman ramah, dan keterbukaan dalam menyambut setiap keluarga yang
                datang bersantap.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-card bg-rice border border-line p-8 md:p-12 text-center max-w-2xl mx-auto">
          <h3 className="font-editorial text-2xl font-bold text-ink mb-3">
            Ingin mencicipi sajian kami hari ini?
          </h3>
          <p className="text-muted text-sm mb-6">
            Mampir langsung ke Pawon Tentrem atau periksa ketersediaan menu sebelum berkunjung.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/menu-hari-ini"
              className="touch-target px-6 py-2.5 rounded-full bg-leaf text-paper text-sm font-semibold hover:bg-leaf-dark transition-colors"
            >
              Lihat Menu Hari Ini
            </Link>
            <Link
              href="/lokasi-kontak"
              className="touch-target inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-paper border border-line text-sm font-semibold text-ink hover:border-leaf hover:text-leaf transition-colors"
            >
              <MapPin className="w-4 h-4 text-wood" />
              <span>Petunjuk Lokasi</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
