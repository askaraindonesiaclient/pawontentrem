'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, Copy, CheckCircle2, ChevronRight, Eye } from 'lucide-react';
import { formatIndonesianDate } from '@/lib/time/wib';

interface HistoryRecord {
  date: string;
  itemCount: number;
  publishedAt: string;
  items: string[];
}

const PAST_DAYS: HistoryRecord[] = [
  {
    date: '2026-11-01',
    itemCount: 6,
    publishedAt: '09.15 WIB',
    items: ['Nasi Liwet Solo', 'Ayam Goreng Lengkuas', 'Sayur Lodeh', 'Tempe Bacem'],
  },
  {
    date: '2026-10-31',
    itemCount: 5,
    publishedAt: '08.45 WIB',
    items: ['Nasi Rames Gurih', 'Empal Daging Sapi', 'Sayur Asem', 'Tahu Bacem'],
  },
  {
    date: '2026-10-30',
    itemCount: 6,
    publishedAt: '09.00 WIB',
    items: ['Ayam Bakar Madu', 'Sayur Bening Bayam', 'Bakwan Jagung', 'Sambal Bawang'],
  },
];

export default function RiwayatMenuPage() {
  const [selectedDay, setSelectedDay] = useState<HistoryRecord | null>(null);
  const [copiedSuccess, setCopiedSuccess] = useState<boolean>(false);

  const handleCopy = (day: HistoryRecord) => {
    setSelectedDay(day);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-ink">
          Riwayat Menu Harian
        </h1>
        <p className="text-muted text-xs sm:text-sm mt-1">
          Lihat snapshot menu terdahulu dan salin kumpulan sajian sebagai draf tanggal hari ini.
        </p>
      </div>

      {copiedSuccess && (
        <div className="p-4 rounded-xl bg-success-bg border border-leaf/30 text-leaf text-sm flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>
            Menu tanggal {selectedDay?.date} berhasil disalin sebagai draf baru. Silakan periksa
            kembali daftar dan harga sebelum menerbitkan.
          </span>
        </div>
      )}

      <div className="space-y-4">
        {PAST_DAYS.map((day) => (
          <div
            key={day.date}
            className="p-5 rounded-card bg-paper border border-line flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs hover:border-leaf/40 transition-colors"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-leaf" />
                <h3 className="font-bold text-sm sm:text-base text-ink">
                  {formatIndonesianDate(day.date)}
                </h3>
              </div>
              <p className="text-xs text-muted">
                {day.itemCount} menu • Terbit pukul {day.publishedAt}
              </p>
              <p className="text-xs text-wood italic pt-1 truncate max-w-md">
                Contoh sajian: {day.items.join(', ')}...
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => handleCopy(day)}
                className="touch-target inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-paper border border-line text-xs font-semibold text-ink hover:border-leaf hover:text-leaf transition-colors"
              >
                <Copy className="w-3.5 h-3.5 text-leaf" />
                <span>Salin sebagai Draf Hari Ini</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

