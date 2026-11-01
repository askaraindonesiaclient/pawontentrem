'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Plus,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  AlertCircle,
  Eye,
  Send,
  Calendar,
} from 'lucide-react';
import { getWibDateString, formatIndonesianDate, formatRupiahNullable } from '@/lib/time/wib';
import { MenuItem } from '@/types';
import { DEMO_MENU_ITEMS } from '@/lib/menu/demo-data';

export default function KelolaMenuHarianPage() {
  const [date, setDate] = useState<string>(getWibDateString());
  const [items, setItems] = useState<MenuItem[]>(DEMO_MENU_ITEMS);
  const [isPublished, setIsPublished] = useState<boolean>(true);
  const [publishing, setPublishing] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);

  const formattedDate = formatIndonesianDate(date);

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= items.length) return;

    const copy = [...items];
    const [moved] = copy.splice(index, 1);
    copy.splice(targetIdx, 0, moved);
    // update sort orders
    copy.forEach((item, idx) => {
      item.sortOrder = idx;
    });
    setItems(copy);
  };

  const toggleAvailability = (id: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            availability: item.availability === 'available' ? 'sold_out' : 'available',
          };
        }
        return item;
      })
    );
  };

  const handlePublish = async () => {
    setPublishing(true);
    setToastMsg(null);

    try {
      // In production, calls Supabase RPC `publish_menu_revision`
      // Simulate atomic transaction
      await new Promise((r) => setTimeout(r, 800));
      setIsPublished(true);
      setShowPreviewModal(false);
      setToastMsg({
        type: 'success',
        text: 'Menu hari ini sudah tayang di website!',
      });
    } catch {
      setToastMsg({
        type: 'error',
        text: 'Gagal menerbitkan menu. Silakan coba kembali.',
      });
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Date */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-ink">
            Kelola Menu Harian
          </h1>
          <p className="text-muted text-xs sm:text-sm mt-1">
            Atur urutan sajian, status ketersediaan, dan publikasikan snapshot menu.
          </p>
        </div>

        {/* Date Selector */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-paper border border-line text-sm font-medium">
          <Calendar className="w-4 h-4 text-leaf" />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-transparent border-0 text-ink focus:outline-none text-xs sm:text-sm"
          />
        </div>
      </div>

      {/* Toast Notification */}
      {toastMsg && (
        <div
          className={`p-4 rounded-xl border flex items-center gap-3 text-sm ${
            toastMsg.type === 'success'
              ? 'bg-success-bg border-leaf/30 text-leaf'
              : 'bg-danger/10 border-danger/30 text-danger'
          }`}
        >
          {toastMsg.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0" />
          )}
          <span>{toastMsg.text}</span>
        </div>
      )}

      {/* Status Bar */}
      <div className="p-4 rounded-card bg-paper border border-line flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded-full text-xs font-semibold bg-rice border border-line text-wood">
            {isPublished ? 'Status: Sudah Tayang' : 'Status: Draf Perubahan'}
          </div>
          <span className="text-xs text-muted">
            {items.length} sajian tercatat untuk {formattedDate}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowPreviewModal(true)}
            className="touch-target inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-paper border border-line text-ink text-xs sm:text-sm font-semibold hover:border-leaf hover:text-leaf transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>Pratinjau & Terbitkan</span>
          </button>

          <Link
            href="/admin/menu-harian/tambah"
            className="touch-target inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-leaf text-paper text-xs sm:text-sm font-semibold hover:bg-leaf-dark transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4 text-turmeric" />
            <span>+ Tambah Menu</span>
          </Link>
        </div>
      </div>

      {/* Menu List Table */}
      <div className="rounded-card bg-paper border border-line overflow-hidden shadow-xs">
        <div className="p-4 sm:p-5 bg-rice/50 border-b border-line flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted">
          <span>Daftar Menu</span>
          <span>Tindakan & Status</span>
        </div>

        <div className="divide-y divide-line">
          {items.map((item, idx) => {
            const priceDisplay = formatRupiahNullable(
              item.priceRupiah,
              item.priceMode,
              item.priceUnit
            );
            const isSoldOut = item.availability === 'sold_out';

            return (
              <div
                key={item.id}
                className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-rice/30 transition-colors"
              >
                {/* Item Info */}
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-lg bg-rice border border-line overflow-hidden shrink-0 flex items-center justify-center text-xs text-muted">
                    {item.media && item.media[0]?.url ? (
                      <img src={item.media[0].url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[10px]">No foto</span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-bold text-sm sm:text-base text-ink truncate">{item.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-muted mt-0.5">
                      <span className="capitalize text-wood font-medium">{item.category}</span>
                      {priceDisplay ? (
                        <span>• {priceDisplay}</span>
                      ) : (
                        <span className="italic text-muted/80">• Harga kasir</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-3 shrink-0">
                  {/* Availability toggle */}
                  <button
                    type="button"
                    onClick={() => toggleAvailability(item.id)}
                    className={`touch-target px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${
                      isSoldOut
                        ? 'bg-danger/10 text-danger border-danger/30 hover:bg-danger/20'
                        : 'bg-success-bg text-leaf border-leaf/30 hover:bg-success-bg/80'
                    }`}
                  >
                    {isSoldOut ? 'Habis hari ini' : 'Tersedia'}
                  </button>

                  {/* Move Up/Down Controls */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => moveItem(idx, 'up')}
                      className="p-1.5 rounded border border-line hover:bg-rice text-muted hover:text-ink disabled:opacity-30"
                      aria-label="Pindahkan ke atas"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === items.length - 1}
                      onClick={() => moveItem(idx, 'down')}
                      className="p-1.5 rounded border border-line hover:bg-rice text-muted hover:text-ink disabled:opacity-30"
                      aria-label="Pindahkan ke bawah"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Preview & Publish Modal */}
      {showPreviewModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-ink/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-paper max-w-xl w-full rounded-card border border-line p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-line pb-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-wood font-semibold">
                  Konfirmasi Publikasi
                </span>
                <h2 className="font-editorial text-2xl font-bold text-ink mt-0.5">
                  Pratinjau & Terbitkan Menu
                </h2>
                <p className="text-xs text-muted mt-1">Tanggal Layanan: {formattedDate} (WIB)</p>
              </div>
              <button
                type="button"
                onClick={() => setShowPreviewModal(false)}
                className="text-muted hover:text-ink p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">
                Ringkasan Sajian Siap Terbit ({items.length} item)
              </h4>
              <div className="divide-y divide-line/60 border border-line rounded-xl overflow-hidden max-h-60 overflow-y-auto">
                {items.map((i) => (
                  <div key={i.id} className="p-3 text-xs flex items-center justify-between bg-rice/20">
                    <span className="font-medium text-ink">{i.name}</span>
                    <span
                      className={`capitalize font-semibold ${
                        i.availability === 'sold_out' ? 'text-danger' : 'text-leaf'
                      }`}
                    >
                      {i.availability === 'sold_out' ? 'Habis' : 'Tersedia'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs text-muted leading-relaxed">
              * Menerbitkan menu ini akan memperbarui tampilan halaman utama bagi seluruh pengunjung
              secara langsung (atomik).
            </p>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-line">
              <button
                type="button"
                onClick={() => setShowPreviewModal(false)}
                className="px-5 py-2.5 rounded-full border border-line text-xs sm:text-sm font-semibold text-muted hover:text-ink"
              >
                Batal
              </button>

              <button
                type="button"
                disabled={publishing}
                onClick={handlePublish}
                className="touch-target inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-leaf text-paper text-xs sm:text-sm font-semibold hover:bg-leaf-dark transition-colors disabled:opacity-60 shadow-sm"
              >
                <Send className="w-4 h-4 text-turmeric" />
                <span>{publishing ? 'Menerbitkan...' : 'Terbitkan Menu Hari Ini'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

