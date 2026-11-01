import React from 'react';
import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-rice px-5 py-16">
      <div className="max-w-md w-full bg-paper rounded-card border border-line p-8 text-center shadow-sm space-y-4">
        <span className="text-4xl font-editorial font-bold text-turmeric">404</span>
        <h1 className="font-editorial text-2xl font-bold text-ink">Halaman Belum Tersedia</h1>
        <p className="text-muted text-sm leading-relaxed">
          Halaman yang Anda tuju belum tersedia atau tautan telah berpindah. Silakan kembali ke beranda.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="touch-target inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-leaf text-paper text-sm font-semibold hover:bg-leaf-dark transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
