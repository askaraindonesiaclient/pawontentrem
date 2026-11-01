'use client';

import React, { useState } from 'react';
import { Save, CheckCircle2 } from 'lucide-react';

export default function PengaturanAdminPage() {
  const [brandName, setBrandName] = useState('Pawon Tentrem');
  const [whatsapp, setWhatsapp] = useState('');
  const [address, setAddress] = useState('');
  const [mapsUrl, setMapsUrl] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-ink">
          Pengaturan Informasi Usaha
        </h1>
        <p className="text-muted text-xs sm:text-sm mt-1">
          Atur nomor kontak WhatsApp resmi, alamat, link Google Maps, dan jam operasional.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-success-bg border border-leaf/30 text-leaf text-sm flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>Pengaturan usaha berhasil diperbarui.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-card bg-paper border border-line space-y-5 shadow-xs">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
            Nama Usaha / Merek
          </label>
          <input
            type="text"
            required
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-input border border-line bg-rice/40 text-ink text-sm font-medium focus:outline-none focus:border-leaf focus:bg-paper"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
            Nomor WhatsApp Pemilik / Staf
          </label>
          <input
            type="text"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="Contoh: 081234567890"
            className="w-full px-4 py-2.5 rounded-input border border-line bg-rice/40 text-ink text-sm focus:outline-none focus:border-leaf focus:bg-paper"
          />
          <p className="text-[11px] text-muted mt-1">
            Kosongkan jika nomor WhatsApp belum siap digunakan publik.
          </p>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
            Alamat Lengkap
          </label>
          <textarea
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Contoh: Jl. Slamet Riyadi No. 123, Solo, Jawa Tengah"
            className="w-full px-4 py-2.5 rounded-input border border-line bg-rice/40 text-ink text-sm focus:outline-none focus:border-leaf focus:bg-paper"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
            Tautan Google Maps
          </label>
          <input
            type="url"
            value={mapsUrl}
            onChange={(e) => setMapsUrl(e.target.value)}
            placeholder="https://maps.google.com/..."
            className="w-full px-4 py-2.5 rounded-input border border-line bg-rice/40 text-ink text-sm focus:outline-none focus:border-leaf focus:bg-paper"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
            Zona Waktu Operasional
          </label>
          <input
            type="text"
            disabled
            value="Asia/Jakarta (WIB)"
            className="w-full px-4 py-2.5 rounded-input border border-line bg-rice/60 text-muted text-sm cursor-not-allowed"
          />
          <p className="text-[11px] text-muted mt-1">
            Zona waktu tetap Asia/Jakarta sesuai jam layanan restoran.
          </p>
        </div>

        <div className="pt-4 border-t border-line">
          <button
            type="submit"
            className="touch-target inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-leaf text-paper font-semibold text-xs sm:text-sm hover:bg-leaf-dark transition-colors shadow-sm"
          >
            <Save className="w-4 h-4 text-turmeric" />
            <span>Simpan Pengaturan</span>
          </button>
        </div>
      </form>
    </div>
  );
}

