'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, CheckCircle2, Eye, EyeOff } from 'lucide-react';

interface AdminGalleryItem {
  id: string;
  url: string;
  caption: string;
  category: 'makanan' | 'suasana' | 'kegiatan';
  published: boolean;
}

const INITIAL_ITEMS: AdminGalleryItem[] = [
  {
    id: 'g-1',
    url: '/assets/photos/nasi-liwet.jpg',
    caption: 'Sajian Nasi Liwet Gurih Solo',
    category: 'makanan',
    published: true,
  },
  {
    id: 'g-2',
    url: '/assets/photos/nasi-rames.jpg',
    caption: 'Nasi Rames Ayam Goreng Lengkuas',
    category: 'makanan',
    published: true,
  },
  {
    id: 'g-3',
    url: '/assets/photos/prasmanan.jpg',
    caption: 'Kehangatan Meja Prasmanan',
    category: 'suasana',
    published: true,
  },
];

export default function GaleriAdminPage() {
  const [items, setItems] = useState<AdminGalleryItem[]>(INITIAL_ITEMS);

  const togglePublish = (id: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, published: !i.published } : i))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-ink">
            Galeri Suasana Publik
          </h1>
          <p className="text-muted text-xs sm:text-sm mt-1">
            Atur foto-foto yang ditampilkan pada halaman galeri pengunjung.
          </p>
        </div>

        <button
          type="button"
          className="touch-target inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-leaf text-paper text-xs sm:text-sm font-semibold hover:bg-leaf-dark transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4 text-turmeric" />
          <span>+ Tambah Foto Galeri</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-card bg-paper border border-line overflow-hidden shadow-xs hover:border-leaf/40 transition-colors"
          >
            <div className="relative aspect-[4/3] w-full bg-rice">
              <Image src={item.url} alt={item.caption} fill className="object-cover" />
              <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-paper/90 backdrop-blur-sm text-[10px] font-semibold capitalize text-ink">
                {item.category}
              </div>
            </div>

            <div className="p-4 space-y-3">
              <p className="font-editorial text-sm font-bold text-ink truncate">
                {item.caption}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-line">
                <button
                  type="button"
                  onClick={() => togglePublish(item.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${
                    item.published
                      ? 'bg-success-bg text-leaf border-leaf/30'
                      : 'bg-rice text-muted border-line'
                  }`}
                >
                  {item.published ? (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>Tayang</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Disembunyikan</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

