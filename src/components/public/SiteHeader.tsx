'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, MapPin } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/menu-hari-ini', label: 'Menu Hari Ini' },
  { href: '/tentang', label: 'Cerita Pawon' },
  { href: '/galeri', label: 'Galeri' },
  { href: '/lokasi-kontak', label: 'Lokasi' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-200 ${
        isScrolled
          ? 'bg-paper/95 backdrop-blur-md shadow-sm border-b border-line'
          : 'bg-rice/90 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-container mx-auto px-5 sm:px-8 h-16 md:h-20 flex items-center justify-between">
        {/* Wordmark */}
        <Link href="/" className="group flex flex-col">
          <span className="font-editorial text-2xl md:text-3xl font-bold tracking-tight text-leaf group-hover:text-leaf-dark transition-colors">
            Pawon Tentrem
          </span>
          <span className="text-[10px] md:text-xs uppercase tracking-widest text-wood font-medium">
            Rumah Makan Prasmanan
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-7">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-leaf ${
                  isActive ? 'text-leaf font-semibold border-b-2 border-leaf pb-1' : 'text-muted'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="/lokasi-kontak"
            className="touch-target inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-leaf text-paper text-sm font-medium hover:bg-leaf-dark transition-colors shadow-sm"
          >
            <MapPin className="w-4 h-4 text-turmeric" />
            <span>Lokasi Pawon</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden touch-target p-2 text-ink hover:text-leaf focus:outline-none"
          aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-paper border-b border-line px-6 py-6 shadow-lg animate-fadeIn">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium py-2 border-b border-line/40 transition-colors ${
                    isActive ? 'text-leaf font-bold' : 'text-muted hover:text-leaf'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-2">
              <Link
                href="/lokasi-kontak"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full touch-target flex items-center justify-center gap-2 py-3 rounded-full bg-leaf text-paper font-medium"
              >
                <MapPin className="w-4 h-4 text-turmeric" />
                <span>Lihat Lokasi & Jam Buka</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
