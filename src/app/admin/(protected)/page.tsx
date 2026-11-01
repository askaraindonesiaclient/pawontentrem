import React from 'react';
import Link from 'next/link';
import { Plus, Copy, CheckCircle2, AlertCircle, Clock, Eye } from 'lucide-react';
import { getTodayMenu } from '@/lib/menu/service';
import { formatIndonesianDate, formatRupiahNullable, formatWibTime, getWibDateString } from '@/lib/time/wib';

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const menuData = await getTodayMenu();
  const items = menuData.items || [];
  const todayWib = formatIndonesianDate(getWibDateString());

  const availableCount = items.filter((i) => i.availability === 'available').length;
  const soldOutCount = items.filter((i) => i.availability === 'sold_out').length;

  const isPublished = menuData.status === 'published' && items.length > 0;
  const lastPublishedTime = menuData.publishedAt ? formatWibTime(menuData.publishedAt) : '-';

  return (
    <div className="space-y-8">
      {/* Welcome Banner & Actions */}
      <div className="space-y-4">
        <div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-ink">
            Selamat Datang, Pengelola
          </h1>
          <p className="text-muted text-sm mt-1">
            {todayWib} • Zona Waktu Asia/Jakarta (WIB)
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link
            href="/admin/menu-harian/tambah"
            className="touch-target inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-leaf text-paper font-semibold hover:bg-leaf-dark transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5 text-turmeric" />
            <span>+ Tambah Menu Hari Ini</span>
          </Link>

          <Link
            href="/admin/riwayat"
            className="touch-target inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-paper border border-line text-ink font-semibold hover:border-leaf hover:text-leaf transition-colors"
          >
            <Copy className="w-4 h-4 text-wood" />
            <span>Salin dari Tanggal Lain</span>
          </Link>

          <Link
            href="/admin/menu-harian"
            className="touch-target inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-paper border border-line text-ink font-semibold hover:border-leaf hover:text-leaf transition-colors"
          >
            <Eye className="w-4 h-4 text-leaf" />
            <span>Kelola & Terbitkan</span>
          </Link>
        </div>
      </div>

      {/* Publication Status Pill */}
      <div className="p-4 rounded-xl bg-paper border border-line flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          {isPublished ? (
            <div className="flex items-center gap-2 text-leaf text-sm font-semibold">
              <CheckCircle2 className="w-5 h-5" />
              <span>Sudah Tayang di Beranda</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-wood text-sm font-semibold">
              <AlertCircle className="w-5 h-5 text-turmeric" />
              <span>Belum ada menu yang tayang untuk hari ini</span>
            </div>
          )}
        </div>
        <span className="text-xs text-muted">
          Perubahan pada draf hanya akan tayang setelah Anda menekan Terbitkan.
        </span>
      </div>

      {/* Small Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-card bg-paper border border-line shadow-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">
            Menu Tersedia
          </span>
          <div className="font-editorial text-4xl font-bold text-leaf mt-2">
            {availableCount}
          </div>
          <span className="text-xs text-muted mt-1 block">Siap saji di meja prasmanan</span>
        </div>

        <div className="p-6 rounded-card bg-paper border border-line shadow-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">
            Menu Habis
          </span>
          <div className="font-editorial text-4xl font-bold text-danger mt-2">
            {soldOutCount}
          </div>
          <span className="text-xs text-muted mt-1 block">Tercatat habis hari ini</span>
        </div>

        <div className="p-6 rounded-card bg-paper border border-line shadow-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">
            Publikasi Terakhir
          </span>
          <div className="font-editorial text-3xl font-bold text-ink mt-2 flex items-center gap-2">
            <Clock className="w-6 h-6 text-wood" />
            <span>{lastPublishedTime}</span>
          </div>
          <span className="text-xs text-muted mt-1 block">Snapshot publik</span>
        </div>
      </div>

      {/* Daftar Menu Hari Ini */}
      <div className="rounded-card bg-paper border border-line overflow-hidden shadow-xs">
        <div className="p-6 border-b border-line flex items-center justify-between">
          <div>
            <h2 className="font-editorial text-xl font-bold text-ink">
              Daftar Sajian Menu Hari Ini
            </h2>
            <p className="text-xs text-muted mt-0.5">
              Urutan dan status item yang tayang atau sedang disiapkan.
            </p>
          </div>
          <Link
            href="/admin/menu-harian/tambah"
            className="text-xs font-semibold text-leaf hover:underline"
          >
            + Tambah Item
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="p-8 text-center space-y-3">
            <p className="text-muted text-sm">
              Belum ada menu yang didaftarkan untuk hari ini.
            </p>
            <Link
              href="/admin/menu-harian/tambah"
              className="touch-target inline-block px-5 py-2.5 rounded-full bg-leaf text-paper text-xs font-semibold hover:bg-leaf-dark transition-colors"
            >
              + Tambah Menu Pertama Hari Ini
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-line">
            {items.map((item) => {
              const priceDisplay = formatRupiahNullable(
                item.priceRupiah,
                item.priceMode,
                item.priceUnit
              );
              const isSoldOut = item.availability === 'sold_out';

              return (
                <div
                  key={item.id}
                  className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-rice/40 transition-colors"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-12 h-12 rounded-lg bg-rice border border-line overflow-hidden shrink-0 flex items-center justify-center text-xs text-muted">
                      {item.media && item.media[0]?.url ? (
                        <img
                          src={item.media[0].url}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-[10px] text-muted">No foto</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-sm sm:text-base text-ink truncate">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-muted mt-0.5">
                        <span className="capitalize text-wood font-medium">{item.category}</span>
                        {priceDisplay && <span>• {priceDisplay}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {isSoldOut ? (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-danger/10 text-danger border border-danger/20">
                        Habis hari ini
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-success-bg text-leaf border border-leaf/20">
                        Tersedia
                      </span>
                    )}

                    <Link
                      href={`/admin/menu-harian/${menuData.serviceDate}/${item.id}`}
                      className="touch-target px-3 py-1.5 rounded-lg border border-line text-xs font-medium text-ink hover:border-leaf hover:text-leaf transition-colors"
                    >
                      Ubah
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

