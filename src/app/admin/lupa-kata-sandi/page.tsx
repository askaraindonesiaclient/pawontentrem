'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function LupaKataSandiPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const supabase = createClient();
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/reset-kata-sandi`,
      });
      // Always show generic success message to prevent user enumeration
      setSubmitted(true);
    } catch {
      setErrorMsg('Gagal mengirimkan tautan pemulihan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-rice px-4 py-12">
      <div className="max-w-md w-full bg-paper rounded-card border border-line p-8 shadow-sm space-y-6">
        <div className="text-center">
          <span className="text-xs uppercase tracking-widest text-wood font-semibold">
            Pemulihan Akses
          </span>
          <h1 className="font-editorial text-3xl font-bold text-ink mt-1">
            Lupa Kata Sandi
          </h1>
          <p className="text-muted text-sm mt-2">
            Masukkan alamat email yang terdaftar untuk menerima tautan atur ulang kata sandi.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-xl bg-success-bg border border-leaf/30 text-center space-y-4">
            <CheckCircle2 className="w-10 h-10 text-leaf mx-auto" />
            <h3 className="font-editorial text-lg font-bold text-leaf">Tautan Telah Dikirim</h3>
            <p className="text-xs text-ink/80 leading-relaxed">
              Jika alamat email tersebut terdaftar di sistem, kami telah mengirimkan instruksi
              pemulihan. Silakan periksa kotak masuk atau spam email Anda.
            </p>
            <div className="pt-2">
              <Link
                href="/admin/login"
                className="inline-block text-xs font-semibold text-leaf underline"
              >
                Kembali ke Halaman Masuk
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-3 rounded-lg bg-danger/10 border border-danger/30 text-danger text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

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

            <button
              type="submit"
              disabled={loading}
              className="touch-target w-full py-3.5 rounded-full bg-leaf text-paper font-semibold text-sm hover:bg-leaf-dark transition-colors shadow-sm disabled:opacity-60"
            >
              {loading ? 'Mengirim...' : 'Kirim Tautan Pemulihan'}
            </button>

            <div className="pt-2 text-center">
              <Link href="/admin/login" className="text-xs text-muted hover:text-leaf underline">
                Kembali ke Halaman Masuk
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
