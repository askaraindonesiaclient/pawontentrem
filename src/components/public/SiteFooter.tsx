import React from 'react';
import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="javanese-footer bg-leaf text-paper relative mt-20 pt-16 pb-12 overflow-hidden">
      <div className="max-w-container mx-auto px-5 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-paper/15">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="font-editorial text-2xl md:text-3xl text-paper font-bold tracking-tight">
              Pawon Tentrem
            </h3>
            <p className="text-paper/80 text-sm max-w-sm leading-relaxed">
              Rumah makan prasmanan masakan Jawa rumahan. Memasak dengan rempah pilihan,
              menghadirkan rasa yang hangat dan suasana yang menentramkan.
            </p>
            <div className="text-xs text-paper/60 pt-2">
              <span>Zona Waktu Layanan: Asia/Jakarta (WIB)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-turmeric">
              Jelajahi
            </h4>
            <ul className="space-y-2 text-sm text-paper/80">
              <li>
                <Link href="/" className="hover:text-paper hover:underline transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/menu-hari-ini" className="hover:text-paper hover:underline transition-colors">
                  Menu Hari Ini
                </Link>
              </li>
              <li>
                <Link href="/tentang" className="hover:text-paper hover:underline transition-colors">
                  Cerita Pawon
                </Link>
              </li>
              <li>
                <Link href="/galeri" className="hover:text-paper hover:underline transition-colors">
                  Suasana Galeri
                </Link>
              </li>
              <li>
                <Link href="/lokasi-kontak" className="hover:text-paper hover:underline transition-colors">
                  Lokasi & Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact / Service Info */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-turmeric">
              Mampir ke Pawon
            </h4>
            <p className="text-sm text-paper/80 leading-relaxed">
              Informasi alamat dan jam buka terverifikasi dapat dilihat pada halaman lokasi.
            </p>
            <div className="pt-2">
              <Link
                href="/lokasi-kontak"
                className="inline-block px-4 py-2 rounded-full border border-paper/30 text-xs font-medium text-paper hover:bg-paper hover:text-leaf transition-colors"
              >
                Lihat Jadwal & Petunjuk Arah
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-paper/60 gap-4">
          <p>© {new Date().getFullYear()} Pawon Tentrem. Seluruh hak cipta dilindungi.</p>
          <div className="flex items-center space-x-6">
            <Link href="/privasi" className="hover:text-paper underline transition-colors">
              Kebijakan Privasi
            </Link>
            <Link href="/kredit-foto" className="hover:text-paper underline transition-colors">
              Kredit Foto
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

