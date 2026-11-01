'use client';

import React, { useState } from 'react';
import { MapPin, Clock, MessageCircle, Navigation, ExternalLink } from 'lucide-react';

interface MampirLokasiProps {
  address?: string | null;
  whatsapp?: string | null;
  mapsUrl?: string | null;
}

export function MampirLokasi({ address, whatsapp, mapsUrl }: MampirLokasiProps) {
  const [loadMap, setLoadMap] = useState(false);

  const cleanWhatsapp = whatsapp ? whatsapp.replace(/[^0-9]/g, '') : null;
  const waUrl = cleanWhatsapp
    ? `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
        'Halo Pawon Tentrem, saya ingin menanyakan sajian menu hari ini.'
      )}`
    : null;

  return (
    <section id="lokasi" className="py-16 md:py-24 bg-paper">
      <div className="max-w-container mx-auto px-5 sm:px-8">
        <div className="rounded-card bg-leaf text-paper p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10 items-center">
            {/* Info Column */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-turmeric font-semibold">
                  Mampir ke Rumah Makan
                </span>
                <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-paper mt-1">
                  Mampir ke Pawon Tentrem
                </h2>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-paper/10 text-turmeric shrink-0 mt-1">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-turmeric">
                    Alamat
                  </h4>
                  {address ? (
                    <p className="text-paper/90 text-sm md:text-base leading-relaxed mt-0.5">
                      {address}
                    </p>
                  ) : (
                    <p className="text-paper/70 text-sm italic mt-0.5">
                      Informasi alamat resmi segera hadir setelah verifikasi pemilik.
                    </p>
                  )}
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-paper/10 text-turmeric shrink-0 mt-1">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-turmeric">
                    Jam Buka
                  </h4>
                  <p className="text-paper/90 text-sm md:text-base leading-relaxed mt-0.5">
                    Setiap Hari: 08.00 - 20.00 WIB
                  </p>
                  <p className="text-paper/60 text-xs mt-0.5">
                    * Sajian lauk hangat siap saji mulai pukul 09.00 WIB.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                {mapsUrl ? (
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="touch-target inline-flex items-center gap-2 px-6 py-3 rounded-full bg-turmeric text-ink font-semibold hover:bg-turmeric/90 transition-colors shadow-sm"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Petunjuk Arah</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="touch-target inline-flex items-center gap-2 px-6 py-3 rounded-full bg-paper/20 text-paper/60 font-medium cursor-not-allowed text-sm"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Petunjuk Arah (Segera Hadir)</span>
                  </button>
                )}

                {waUrl ? (
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="touch-target inline-flex items-center gap-2 px-6 py-3 rounded-full bg-paper text-leaf font-semibold hover:bg-paper/90 transition-colors shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Tanya via WhatsApp</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="touch-target inline-flex items-center gap-2 px-6 py-3 rounded-full border border-paper/30 text-paper/60 font-medium cursor-not-allowed text-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp (Segera Hadir)</span>
                  </button>
                )}
              </div>
            </div>

            {/* Map Column */}
            <div className="lg:col-span-5">
              <div className="rounded-xl overflow-hidden bg-paper/10 border border-paper/20 aspect-video md:aspect-square flex flex-col items-center justify-center p-6 text-center">
                {loadMap && mapsUrl ? (
                  <iframe
                    title="Peta Lokasi Pawon Tentrem"
                    src={mapsUrl}
                    className="w-full h-full border-0"
                    loading="lazy"
                  />
                ) : (
                  <div className="space-y-4">
                    <MapPin className="w-12 h-12 text-turmeric mx-auto opacity-75" />
                    <p className="text-sm text-paper/80 max-w-xs">
                      Peta interaktif dapat dimuat langsung atau dibuka di Google Maps.
                    </p>
                    {mapsUrl ? (
                      <button
                        type="button"
                        onClick={() => setLoadMap(true)}
                        className="touch-target px-5 py-2 rounded-full bg-paper text-leaf text-xs font-semibold hover:bg-paper/90 transition-colors"
                      >
                        Muat Peta Interaktif
                      </button>
                    ) : (
                      <span className="text-xs text-paper/60">
                        Menunggu penetapan link Google Maps dari pemilik
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
