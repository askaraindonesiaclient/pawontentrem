'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Camera,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  X,
} from 'lucide-react';
import { getWibDateString, formatIndonesianDate } from '@/lib/time/wib';
import { MenuCategory, PriceMode, MenuAvailability } from '@/types';

export default function TambahMenuPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [name, setName] = useState('');
  const [category, setCategory] = useState<MenuCategory>('lauk');
  const [priceRupiah, setPriceRupiah] = useState<string>('');
  const [priceMode, setPriceMode] = useState<PriceMode>('fixed');
  const [priceUnit, setPriceUnit] = useState<string>('porsi');
  const [availability, setAvailability] = useState<MenuAvailability>('available');

  // Photo states
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [focalX, setFocalX] = useState<number>(0.5);
  const [focalY, setFocalY] = useState<number>(0.5);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Status
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const todayWib = formatIndonesianDate(getWibDateString());

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      setErrorMsg('Ukuran berkas maksimal 15 MB.');
      return;
    }

    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPhotoPreview(objectUrl);
    setErrorMsg(null);
  };

  const handleSave = async (andAddMore: boolean) => {
    if (!name.trim() || name.trim().length < 2) {
      setErrorMsg('Nama menu wajib diisi minimal 2 karakter.');
      return;
    }

    setSaving(true);
    setErrorMsg(null);

    try {
      // In a real flow, upload file to /api/admin/uploads/init -> storage -> complete
      // and insert into menu_entries
      const parsedPrice = priceRupiah.trim() ? parseInt(priceRupiah.replace(/\D/g, ''), 10) : null;

      // Simulate successful save
      setSuccessMsg(`Menu "${name}" berhasil disimpan ke draf hari ini.`);
      setSaving(false);

      if (andAddMore) {
        // Reset form for next item
        setName('');
        setPriceRupiah('');
        setPhotoPreview(null);
        setSelectedFile(null);
        setFocalX(0.5);
        setFocalY(0.5);
        setShowAdvanced(false);
        // Focus back
        if (fileInputRef.current) fileInputRef.current.value = '';
        if (cameraInputRef.current) cameraInputRef.current.value = '';
      } else {
        setTimeout(() => {
          router.push('/admin/menu-harian');
        }, 1200);
      }
    } catch {
      setErrorMsg('Gagal menyimpan menu. Silakan coba kembali.');
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Top back navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-leaf transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Ringkasan</span>
        </Link>
        <span className="text-xs text-muted">Tanggal: {todayWib}</span>
      </div>

      <div className="bg-paper rounded-card border border-line p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-ink">
            Tambah Menu Hari Ini
          </h1>
          <p className="text-muted text-xs sm:text-sm mt-1">
            Ambil foto masakan lalu isi nama menu. Harga bersifat opsional.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-lg bg-danger/10 border border-danger/30 text-danger text-xs sm:text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3.5 rounded-lg bg-success-bg border border-leaf/30 text-leaf text-xs sm:text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* 1. Photo Area */}
        <div className="space-y-3">
          <label className="block text-xs font-semibold uppercase tracking-wider text-ink">
            Foto Sajian (Rasio 4:3)
          </label>

          {photoPreview ? (
            <div className="relative rounded-card overflow-hidden bg-rice border border-line aspect-[4/3] w-full max-w-md mx-auto">
              <Image
                src={photoPreview}
                alt="Pratinjau foto menu"
                fill
                className="object-cover"
                style={{ objectPosition: `${focalX * 100}% ${focalY * 100}%` }}
              />
              <button
                type="button"
                onClick={() => {
                  setPhotoPreview(null);
                  setSelectedFile(null);
                }}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-ink/70 text-paper hover:bg-ink transition-colors"
                aria-label="Hapus foto"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-3 px-3 py-1 bg-ink/75 backdrop-blur-sm rounded-md text-[11px] text-paper">
                Foto siap diproses
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-line rounded-card p-6 sm:p-8 bg-rice/40 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-paper border border-line text-wood flex items-center justify-center mx-auto shadow-xs">
                <Camera className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">Ambil foto masakan langsung</p>
                <p className="text-xs text-muted mt-1">
                  Mendukung kamera ponsel atau berkas JPG, PNG, WebP (maks 15 MB)
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                {/* Camera input button */}
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className="touch-target w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-leaf text-paper text-xs sm:text-sm font-semibold hover:bg-leaf-dark transition-colors shadow-sm"
                >
                  <Camera className="w-4 h-4 text-turmeric" />
                  <span>Ambil Foto</span>
                </button>

                {/* Gallery picker */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/heic"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="touch-target w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-paper border border-line text-xs sm:text-sm font-semibold text-ink hover:border-leaf hover:text-leaf transition-colors"
                >
                  <ImageIcon className="w-4 h-4 text-wood" />
                  <span>Pilih dari Galeri</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 2. Menu Name (Required) */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
            Nama Menu <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Contoh: Ayam Goreng Lengkuas"
            className="w-full px-4 py-3 rounded-input border border-line bg-rice/40 text-ink text-sm sm:text-base font-medium focus:outline-none focus:border-leaf focus:bg-paper"
          />
          <p className="text-[11px] text-muted mt-1">
            Cukup beri nama menu. Harga boleh dikosongkan jika mengikuti pilihan porsi kasir.
          </p>
        </div>

        {/* 3. Collapsible Detail Tambahan */}
        <div className="border border-line rounded-xl overflow-hidden bg-rice/20">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-rice/50 transition-colors"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-wood">
              + Detail Tambahan (Kategori, Harga, Porsi)
            </span>
            {showAdvanced ? (
              <ChevronUp className="w-4 h-4 text-muted" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted" />
            )}
          </button>

          {showAdvanced && (
            <div className="p-4 sm:p-6 border-t border-line space-y-4 bg-paper">
              {/* Category */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
                  Kategori Sajian
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
                      placeholder="Contoh: 18000"
                      className="w-full pl-11 pr-4 py-2.5 rounded-input border border-line bg-rice/30 text-ink text-sm focus:outline-none focus:border-leaf focus:bg-paper"
                    />
                  </div>
                  <p className="text-[11px] text-muted mt-1">
                    Kosongkan jika tidak ingin menampilkan harga pada daftar.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
                    Satuan Harga
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
            </div>
          )}
        </div>

        {/* 4. Action Buttons */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              disabled={saving}
              onClick={() => handleSave(true)}
              className="touch-target w-full sm:flex-1 py-3.5 rounded-full bg-leaf text-paper font-semibold text-sm hover:bg-leaf-dark transition-colors shadow-sm disabled:opacity-60"
            >
              {saving ? 'Menyimpan...' : 'Simpan & Tambah Lagi'}
            </button>

            <button
              type="button"
              disabled={saving}
              onClick={() => handleSave(false)}
              className="touch-target w-full sm:w-auto px-6 py-3.5 rounded-full bg-paper border border-line text-ink font-semibold text-sm hover:border-leaf hover:text-leaf transition-colors disabled:opacity-60"
            >
              Simpan Draf
            </button>
          </div>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => {
                setPhotoPreview(null);
                setSelectedFile(null);
                handleSave(false);
              }}
              className="text-xs text-muted hover:text-leaf underline"
            >
              Tambahkan tanpa foto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

