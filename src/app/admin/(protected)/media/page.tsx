import React from 'react';
import Image from 'next/image';
import { ImageIcon, CheckCircle2, ShieldCheck } from 'lucide-react';

const MEDIA_LIST = [
  {
    id: 'm-1',
    name: 'prasmanan-lauk.jpg',
    url: '/assets/photos/prasmanan-lauk.jpg',
    status: 'ready',
    width: 1920,
    height: 1440,
    rights: 'Dokumentasi Asli Pawon Tentrem',
  },
  {
    id: 'm-2',
    name: 'prasmanan-antre.jpg',
    url: '/assets/photos/prasmanan-antre.jpg',
    status: 'ready',
    width: 1920,
    height: 1440,
    rights: 'Dokumentasi Asli Pawon Tentrem',
  },
  {
    id: 'm-3',
    name: 'suasana-ruang.jpg',
    url: '/assets/photos/suasana-ruang.jpg',
    status: 'ready',
    width: 1920,
    height: 1440,
    rights: 'Dokumentasi Asli Pawon Tentrem',
  },
  {
    id: 'm-4',
    name: 'pintu-masuk.jpg',
    url: '/assets/photos/pintu-masuk.jpg',
    status: 'ready',
    width: 1920,
    height: 1440,
    rights: 'Dokumentasi Asli Pawon Tentrem',
  },
  {
    id: 'm-5',
    name: 'nasi-liwet.jpg',
    url: '/assets/photos/nasi-liwet.jpg',
    status: 'ready',
    width: 1600,
    height: 1200,
    rights: 'Arsip Kuliner Tradisional',
  },
];

export default function MediaAdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-ink">
          Media & Foto Tersimpan
        </h1>
        <p className="text-muted text-xs sm:text-sm mt-1">
          Koleksi foto sajian dan suasana yang telah diproses varian web (WebP tanpa EXIF GPS).
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MEDIA_LIST.map((item) => (
          <div
            key={item.id}
            className="rounded-card bg-paper border border-line overflow-hidden shadow-xs hover:border-leaf/50 transition-colors"
          >
            <div className="relative aspect-[4/3] w-full bg-rice">
              <Image src={item.url} alt={item.name} fill className="object-cover" />
              <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-success-bg/90 border border-leaf/20 text-leaf text-[10px] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Siap</span>
              </div>
            </div>

            <div className="p-4 space-y-2">
              <h4 className="font-bold text-sm text-ink truncate">{item.name}</h4>
              <p className="text-[11px] text-muted">
                Resolusi Varian: {item.width} x {item.height} px
              </p>
              <div className="pt-2 border-t border-line flex items-center gap-1.5 text-[11px] text-wood">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{item.rights}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

