import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import {
  Calendar,
  UtensilsCrossed,
  History,
  Image as ImageIcon,
  FileText,
  Settings,
  Users,
  Activity,
  BookOpen,
  LogOut,
  ExternalLink,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { getWibDateString, formatIndonesianDate } from '@/lib/time/wib';

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // If not logged in and not in dev/demo mode, redirect to login
  if (!user && process.env.APP_MODE === 'production') {
    redirect('/admin/login');
  }

  const todayWib = formatIndonesianDate(getWibDateString());

  return (
    <div className="min-h-screen bg-rice flex flex-col md:flex-row text-ink">
      {/* Desktop Sidebar: 240px */}
      <aside className="hidden md:flex flex-col w-60 bg-paper border-r border-line shrink-0 justify-between">
        <div className="p-6">
          <Link href="/admin" className="block mb-8">
            <span className="font-editorial text-2xl font-bold text-leaf tracking-tight block">
              Pawon Tentrem
            </span>
            <span className="text-[10px] uppercase tracking-widest text-wood font-semibold block mt-0.5">
              Ruang Pengelola
            </span>
          </Link>

          <nav className="space-y-6 text-sm">
            {/* Kelompok Harian */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-muted/70 px-3 mb-2">
                Pekerjaan Harian
              </div>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/admin"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg font-medium text-ink hover:bg-rice hover:text-leaf transition-colors"
                  >
                    <Calendar className="w-4 h-4 text-leaf" />
                    <span>Hari Ini</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/menu-harian"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg font-medium text-ink hover:bg-rice hover:text-leaf transition-colors"
                  >
                    <UtensilsCrossed className="w-4 h-4 text-leaf" />
                    <span>Menu Harian</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/riwayat"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg font-medium text-ink hover:bg-rice hover:text-leaf transition-colors"
                  >
                    <History className="w-4 h-4 text-leaf" />
                    <span>Riwayat Menu</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Kelompok Isi Website */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-muted/70 px-3 mb-2">
                Isi Website
              </div>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/admin/media"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg font-medium text-ink hover:bg-rice hover:text-leaf transition-colors"
                  >
                    <ImageIcon className="w-4 h-4 text-wood" />
                    <span>Media & Foto</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/konten"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg font-medium text-ink hover:bg-rice hover:text-leaf transition-colors"
                  >
                    <FileText className="w-4 h-4 text-wood" />
                    <span>Konten Website</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/galeri"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg font-medium text-ink hover:bg-rice hover:text-leaf transition-colors"
                  >
                    <ImageIcon className="w-4 h-4 text-wood" />
                    <span>Galeri Publik</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Kelompok Pengelolaan */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-muted/70 px-3 mb-2">
                Pengelolaan
              </div>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/admin/pengaturan"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg font-medium text-ink hover:bg-rice hover:text-leaf transition-colors"
                  >
                    <Settings className="w-4 h-4 text-muted" />
                    <span>Pengaturan</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/pengguna"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg font-medium text-ink hover:bg-rice hover:text-leaf transition-colors"
                  >
                    <Users className="w-4 h-4 text-muted" />
                    <span>Pengguna</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/aktivitas"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg font-medium text-ink hover:bg-rice hover:text-leaf transition-colors"
                  >
                    <Activity className="w-4 h-4 text-muted" />
                    <span>Aktivitas</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/panduan"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg font-medium text-ink hover:bg-rice hover:text-leaf transition-colors"
                  >
                    <BookOpen className="w-4 h-4 text-turmeric" />
                    <span>Panduan Admin</span>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-line space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-leaf hover:bg-rice transition-colors"
          >
            <span>Lihat Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-danger hover:bg-danger/10 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar Sesi</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Panel */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-paper border-b border-line px-5 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-editorial text-lg font-bold text-leaf md:hidden">
              Pawon Tentrem
            </span>
            <span className="text-xs text-muted font-medium hidden sm:inline">
              Hari ini: <strong className="text-ink">{todayWib}</strong> (WIB)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="touch-target inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-line text-xs font-medium text-ink hover:border-leaf hover:text-leaf transition-colors"
            >
              <span>Lihat Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-5 sm:p-8 pb-24 md:pb-12 max-w-5xl w-full mx-auto">
          {children}
        </main>

        {/* Mobile Bottom Navigation (max 4 items) */}
        <nav className="md:hidden fixed bottom-0 inset-x-0 bg-paper/95 backdrop-blur-md border-t border-line py-2 px-4 flex items-center justify-around z-30 shadow-lg">
          <Link
            href="/admin"
            className="flex flex-col items-center gap-1 text-[11px] font-medium text-ink hover:text-leaf"
          >
            <Calendar className="w-5 h-5" />
            <span>Hari Ini</span>
          </Link>
          <Link
            href="/admin/menu-harian/tambah"
            className="flex flex-col items-center gap-1 text-[11px] font-semibold text-leaf"
          >
            <div className="w-8 h-8 rounded-full bg-leaf text-paper flex items-center justify-center -mt-3 shadow-md">
              <UtensilsCrossed className="w-4 h-4" />
            </div>
            <span>+ Tambah</span>
          </Link>
          <Link
            href="/admin/riwayat"
            className="flex flex-col items-center gap-1 text-[11px] font-medium text-muted hover:text-leaf"
          >
            <History className="w-5 h-5" />
            <span>Riwayat</span>
          </Link>
          <Link
            href="/admin/panduan"
            className="flex flex-col items-center gap-1 text-[11px] font-medium text-muted hover:text-leaf"
          >
            <BookOpen className="w-5 h-5" />
            <span>Panduan</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}

