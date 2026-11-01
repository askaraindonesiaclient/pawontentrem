'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RotateCcw } from 'lucide-react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log safe error internally
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-rice px-5 py-16">
      <div className="max-w-md w-full bg-paper rounded-card border border-line p-8 text-center shadow-sm space-y-4">
        <AlertCircle className="w-12 h-12 text-danger mx-auto" />
        <h1 className="font-editorial text-2xl font-bold text-ink">Ada Kendala</h1>
        <p className="text-muted text-sm leading-relaxed">
          Terjadi kesalahan saat memuat halaman. Silakan coba memuat ulang atau hubungi pengelola jika
          masalah berlanjut.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="touch-target w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-leaf text-paper text-sm font-semibold hover:bg-leaf-dark transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Coba Lagi</span>
          </button>
          <Link
            href="/"
            className="touch-target w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-paper border border-line text-sm font-semibold text-ink hover:border-leaf hover:text-leaf transition-colors"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}

