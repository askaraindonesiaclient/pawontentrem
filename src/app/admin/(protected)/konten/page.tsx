'use client';

import React, { useState } from 'react';
import { CheckCircle2, Save } from 'lucide-react';

export default function KontenWebsitePage() {
  const [heroH1, setHeroH1] = useState('Rasa rumahan, suasana yang menentramkan.');
  const [heroBody, setHeroBody] = useState(
    'Pilih lauk dan sayur sesuai selera. Seluruh hidangan dimasak segar dengan bumbu rempah asli Jawa. Lihat sajian hari ini sebelum Anda mampir.'
  );
  const [storyTitle, setStoryTitle] = useState('Sederhana sajiannya, hangat suasananya.');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-ink">
          Konten Teks Website
        </h1>
        <p className="text-muted text-xs sm:text-sm mt-1">
          Sesuaikan judul hero dan narasi cerita tanpa menyentuh kode program.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-success-bg border border-leaf/30 text-leaf text-sm flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>Konten berhasil disimpan.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Hero Section Card */}
        <div className="p-6 rounded-card bg-paper border border-line space-y-4 shadow-xs">
          <h2 className="font-editorial text-xl font-bold text-leaf">
            Bagian Pembuka (Hero)
          </h2>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
              Judul Utama (H1)
            </label>
            <input
              type="text"
              value={heroH1}
              onChange={(e) => setHeroH1(e.target.value)}
              className="w-full px-4 py-2.5 rounded-input border border-line bg-rice/30 text-ink text-sm font-medium focus:outline-none focus:border-leaf focus:bg-paper"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
              Teks Deskripsi Hero
            </label>
            <textarea
              rows={3}
              value={heroBody}
              onChange={(e) => setHeroBody(e.target.value)}
              className="w-full px-4 py-2.5 rounded-input border border-line bg-rice/30 text-ink text-sm focus:outline-none focus:border-leaf focus:bg-paper"
            />
          </div>
        </div>

        {/* Story Section Card */}
        <div className="p-6 rounded-card bg-paper border border-line space-y-4 shadow-xs">
          <h2 className="font-editorial text-xl font-bold text-leaf">
            Cerita Pawon Tentrem
          </h2>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
              Judul Narasi Cerita
            </label>
            <input
              type="text"
              value={storyTitle}
              onChange={(e) => setStoryTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-input border border-line bg-rice/30 text-ink text-sm font-medium focus:outline-none focus:border-leaf focus:bg-paper"
            />
          </div>
        </div>

        <button
          type="submit"
          className="touch-target inline-flex items-center gap-2 px-6 py-3 rounded-full bg-leaf text-paper font-semibold text-sm hover:bg-leaf-dark transition-colors shadow-sm"
        >
          <Save className="w-4 h-4 text-turmeric" />
          <span>Simpan Konten Website</span>
        </button>
      </form>
    </div>
  );
}

