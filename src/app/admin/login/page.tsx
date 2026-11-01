'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg('Email atau kata sandi tidak sesuai.');
        setLoading(false);
        return;
      }

      if (data.user) {
        router.push('/admin');
        router.refresh();
      }
    } catch {
      setErrorMsg('Terjadi kendala saat menghubungkan ke server.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-rice px-4 py-12">
      <div className="max-w-md w-full bg-paper rounded-card border border-line p-8 shadow-sm space-y-6">
        <div className="text-center">
          <span className="text-xs uppercase tracking-widest text-wood font-semibold">
            Pawon Tentrem
          </span>
          <h1 className="font-editorial text-3xl font-bold text-ink mt-1">
            Masuk Ruang Pengelola
          </h1>
          <p className="text-muted text-sm mt-2">
            Kelola sajian menu harian dan informasi rumah makan.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-lg bg-danger/10 border border-danger/30 flex items-start gap-2.5 text-danger text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
              Alamat Email
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@pawontentrem.id"
                className="w-full pl-11 pr-4 py-3 rounded-input border border-line bg-rice/50 text-ink text-sm focus:outline-none focus:border-leaf focus:bg-paper"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink">
                Kata Sandi
              </label>
              <Link
                href="/admin/lupa-kata-sandi"
                className="text-xs text-leaf hover:underline font-medium"
              >
                Lupa sandi?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-5 h-5 text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-11 py-3 rounded-input border border-line bg-rice/50 text-ink text-sm focus:outline-none focus:border-leaf focus:bg-paper"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink p-1"
                aria-label={showPassword ? 'Sembunyikan sandi' : 'Tampilkan sandi'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="touch-target w-full py-3.5 rounded-full bg-leaf text-paper font-semibold text-sm hover:bg-leaf-dark transition-colors shadow-sm disabled:opacity-60"
          >
            {loading ? 'Memeriksa sesi...' : 'Masuk Dashboard'}
          </button>
        </form>

        <div className="pt-4 border-t border-line text-center">
          <Link href="/" className="text-xs text-muted hover:text-leaf underline">
            Kembali ke Beranda Publik
          </Link>
        </div>
      </div>
    </div>
  );
}

