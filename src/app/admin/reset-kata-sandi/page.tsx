'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, CheckCircle2, AlertCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function ResetKataSandiPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMsg('Konfirmasi kata sandi tidak cocok.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Kata sandi minimal 6 karakter.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        setErrorMsg('Tautan pemulihan sudah kedaluwarsa atau tidak valid.');
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/admin');
      }, 2000);
    } catch {
      setErrorMsg('Gagal memperbarui kata sandi.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-rice px-4 py-12">
      <div className="max-w-md w-full bg-paper rounded-card border border-line p-8 shadow-sm space-y-6">
        <div className="text-center">
          <span className="text-xs uppercase tracking-widest text-wood font-semibold">
            Keamanan Akun
          </span>
          <h1 className="font-editorial text-3xl font-bold text-ink mt-1">
            Kata Sandi Baru
          </h1>
          <p className="text-muted text-sm mt-2">
            Silakan tentukan kata sandi baru untuk akun pengelola Anda.
          </p>
        </div>

        {success ? (
          <div className="p-6 rounded-xl bg-success-bg border border-leaf/30 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-leaf mx-auto" />
            <h3 className="font-editorial text-lg font-bold text-leaf">Kata Sandi Diperbarui</h3>
            <p className="text-xs text-ink/80">
              Kata sandi Anda berhasil diubah. Mengalihkan ke dashboard...
            </p>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            {errorMsg && (
              <div className="p-3 rounded-lg bg-danger/10 border border-danger/30 text-danger text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
                Kata Sandi Baru
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="w-full pl-11 pr-4 py-3 rounded-input border border-line bg-rice/50 text-ink text-sm focus:outline-none focus:border-leaf focus:bg-paper"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
                Ulangi Kata Sandi
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ulangi kata sandi baru"
                  className="w-full pl-11 pr-4 py-3 rounded-input border border-line bg-rice/50 text-ink text-sm focus:outline-none focus:border-leaf focus:bg-paper"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="touch-target w-full py-3.5 rounded-full bg-leaf text-paper font-semibold text-sm hover:bg-leaf-dark transition-colors shadow-sm disabled:opacity-60"
            >
              {loading ? 'Menyimpan...' : 'Simpan Kata Sandi Baru'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
