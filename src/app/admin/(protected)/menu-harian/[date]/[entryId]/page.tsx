'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, AlertCircle, Trash2 } from 'lucide-react';
import { MenuCategory, PriceMode, MenuAvailability } from '@/types';

export default function UbahMenuEntryPage() {
  const router = useRouter();
  const params = useParams();

  const [name, setName] = useState('Ayam Goreng Lengkuas');
  const [category, setCategory] = useState<MenuCategory>('lauk');
  const [priceRupiah, setPriceRupiah] = useState<string>('16000');
  const [priceMode, setPriceMode] = useState<PriceMode>('fixed');
  const [priceUnit, setPriceUnit] = useState<string>('potong');
  const [availability, setAvailability] = useState<MenuAvailability>('available');

  const [saving, setSaving] = useState(false);
  const [toastMsg, setToastMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setToastMsg(null);

    try {
      await new Promise((r) => setTimeout(r, 600));
      setToastMsg({ type: 'success', text: 'Perubahan item berhasil disimpan ke draf.' });
      setTimeout(() => {
        router.push('/admin/menu-harian');
      }, 1000);
    } catch {
      setToastMsg({ type: 'error', text: 'Gagal memperbarui item.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/menu-harian"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-leaf transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Daftar Menu</span>
        </Link>
        <span className="text-xs text-muted font-mono">ID: {params?.entryId}</span>
      </div>

      <div className="bg-paper rounded-card border border-line p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-ink">
            Ubah Sajian Menu
          </h1>
          <p className="text-muted text-xs sm:text-sm mt-1">
            Ubah nama, kategori, harga, atau status ketersediaan item ini pada draf revisi.
          </p>
        </div>

        {toastMsg && (
          <div
            className={`p-3.5 rounded-lg border flex items-center gap-2 text-xs sm:text-sm ${
              toastMsg.type === 'success'
                ? 'bg-success-bg border-leaf/30 text-leaf'
                : 'bg-danger/10 border-danger/30 text-danger'
            }`}
          >
            {toastMsg.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{toastMsg.text}</span>
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
              Nama Menu <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-input border border-line bg-rice/40 text-ink text-sm sm:text-base font-medium focus:outline-none focus:border-leaf focus:bg-paper"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
              Kategori
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {(['lauk', 'sayur', 'pelengkap', 'sambal', 'minuman'] as MenuCategory[]).map(
                (cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`touch-target px-3 py-2 rounded-lg text-xs font-medium capitalize border transition-colors ${
                      category === cat
                        ? 'bg-leaf text-paper border-leaf'
                        : 'bg-rice border-line text-muted hover:text-ink'
                    }`}
                  >
                    {cat}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Price & Unit */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
                Harga Rupiah (Opsional)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-muted font-medium">
                  Rp
                </span>
                <input
                  type="number"
                  value={priceRupiah}
                  onChange={(e) => setPriceRupiah(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 rounded-input border border-line bg-rice/30 text-ink text-sm focus:outline-none focus:border-leaf focus:bg-paper"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
                Satuan Porsi
              </label>
              <select
                value={priceUnit}
                onChange={(e) => setPriceUnit(e.target.value)}
                className="w-full px-4 py-2.5 rounded-input border border-line bg-rice/30 text-ink text-sm focus:outline-none focus:border-leaf focus:bg-paper"
              >
                <option value="porsi">per porsi</option>
                <option value="potong">per potong</option>
                <option value="gelas">per gelas</option>
                <option value="bungkus">per bungkus</option>
              </select>
            </div>
          </div>

          {/* Availability */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
              Status Ketersediaan
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setAvailability('available')}
                className={`touch-target px-4 py-2 rounded-lg text-xs font-semibold border ${
                  availability === 'available'
                    ? 'bg-success-bg text-leaf border-leaf/40'
                    : 'bg-rice border-line text-muted'
                }`}
              >
                Tersedia
              </button>
              <button
                type="button"
                onClick={() => setAvailability('sold_out')}
                className={`touch-target px-4 py-2 rounded-lg text-xs font-semibold border ${
                  availability === 'sold_out'
                    ? 'bg-danger/10 text-danger border-danger/40'
                    : 'bg-rice border-line text-muted'
                }`}
              >
                Habis Hari Ini
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-line">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-xs text-danger hover:underline font-medium"
            >
              <Trash2 className="w-4 h-4" />
              <span>Hapus Item</span>
            </button>

            <button
              type="submit"
              disabled={saving}
              className="touch-target px-6 py-2.5 rounded-full bg-leaf text-paper font-semibold text-xs sm:text-sm hover:bg-leaf-dark transition-colors disabled:opacity-60 shadow-sm"
            >
              {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
