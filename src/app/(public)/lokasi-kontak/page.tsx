import React from 'react';
import type { Metadata } from 'next';
import { MampirLokasi } from '@/components/public/MampirLokasi';
import { Clock, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Lokasi & Kontak | Pawon Tentrem',
  description:
    'Alamat, jam operasional, peta petunjuk arah, dan kontak WhatsApp resmi rumah makan Pawon Tentrem.',
};

const SCHEDULE = [
  { day: 'Senin', hours: '08.00 - 20.00 WIB' },
  { day: 'Selasa', hours: '08.00 - 20.00 WIB' },
  { day: 'Rabu', hours: '08.00 - 20.00 WIB' },
  { day: 'Kamis', hours: '08.00 - 20.00 WIB' },
  { day: 'Jumat', hours: '08.00 - 20.00 WIB' },
  { day: 'Sabtu', hours: '08.00 - 20.00 WIB' },
  { day: 'Minggu', hours: '08.00 - 20.00 WIB' },
];

export default function LokasiKontakPage() {
  return (
    <div className="py-12 md:py-20 bg-paper space-y-16">
      <div className="max-w-container mx-auto px-5 sm:px-8">
        <div className="max-w-2xl mb-8">
          <span className="text-xs uppercase tracking-widest text-wood font-semibold">
            Kunjungan & Bantuan
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-ink mt-2">
            Mampir & Hubungi Pawon
          </h1>
          <p className="text-muted text-base sm:text-lg mt-3 leading-relaxed">
            Kami siap menyambut kedatangan Anda sekeluarga untuk menikmati santap prasmanan yang
            tenang dan bersahaja.
          </p>
        </div>

        {/* Core Location & Map Component */}
        <MampirLokasi />

        {/* Operating Hours Details & Amenities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* Schedule */}
          <div className="p-8 rounded-card bg-rice border border-line">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-5 h-5 text-wood" />
              <h3 className="font-editorial text-2xl font-bold text-ink">Jadwal Buka Reguler</h3>
            </div>
            <div className="divide-y divide-line/60">
              {SCHEDULE.map((item) => (
                <div key={item.day} className="py-2.5 flex items-center justify-between text-sm">
                  <span className="font-medium text-ink">{item.day}</span>
                  <span className="text-muted">{item.hours}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-line text-xs text-muted">
              * Hari libur nasional tetap buka, kecuali ada pengumuman khusus di beranda.
            </div>
          </div>

          {/* Guidelines / Tips */}
          <div className="p-8 rounded-card bg-rice border border-line flex flex-col justify-between">
            <div>
              <h3 className="font-editorial text-2xl font-bold text-ink mb-6">
                Kenyamanan Bersantap
              </h3>
              <ul className="space-y-4 text-sm text-ink/90">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-leaf shrink-0 mt-0.5" />
                  <span>
                    <strong>Pukul 11.30 - 13.00 WIB:</strong> Waktu makan siang paling ramai. Silakan
                    datang lebih awal untuk pilihan lauk paling lengkap.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-leaf shrink-0 mt-0.5" />
                  <span>
                    <strong>Bungkus & Bawa Pulang:</strong> Tersedia kotak ramah lingkungan untuk Anda
                    yang ingin menikmati sajian di rumah.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-leaf shrink-0 mt-0.5" />
                  <span>
                    <strong>Mushola & Tempat Cuci Tangan:</strong> Area bersih dan nyaman selalu kami
                    sediakan untuk ketenangan pengunjung.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-line text-xs text-muted">
              Zona waktu: Asia/Jakarta (WIB)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
