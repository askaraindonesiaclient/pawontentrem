'use client';

import React, { useState } from 'react';
import { UserPlus, Shield, CheckCircle2, UserCheck, UserX } from 'lucide-react';

interface UserRecord {
  id: string;
  email: string;
  displayName: string;
  role: 'owner' | 'editor';
  active: boolean;
}

const INITIAL_USERS: UserRecord[] = [
  {
    id: 'u-1',
    email: 'pemilik@pawontentrem.id',
    displayName: 'Pemilik Pawon',
    role: 'owner',
    active: true,
  },
  {
    id: 'u-2',
    email: 'dapur@pawontentrem.id',
    displayName: 'Staf Dapur & Kasir',
    role: 'editor',
    active: true,
  },
];

export default function PenggunaAdminPage() {
  const [users, setUsers] = useState<UserRecord[]>(INITIAL_USERS);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteName, setInviteName] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const toggleUserActive = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id && u.role !== 'owner') {
          return { ...u, active: !u.active };
        }
        return u;
      })
    );
  };

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;

    setUsers((prev) => [
      ...prev,
      {
        id: `u-${Date.now()}`,
        email: inviteEmail,
        displayName: inviteName || 'Editor Dapur',
        role: 'editor',
        active: true,
      },
    ]);
    setShowInviteModal(false);
    setInviteEmail('');
    setInviteName('');
    setToast('Undangan editor berhasil dikirim.');
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-ink">
            Pengelolaan Pengguna & Staf
          </h1>
          <p className="text-muted text-xs sm:text-sm mt-1">
            Khusus Pemilik: Atur hak akses staf editor yang bertugas memperbarui menu harian.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowInviteModal(true)}
          className="touch-target inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-leaf text-paper text-xs sm:text-sm font-semibold hover:bg-leaf-dark transition-colors shadow-sm"
        >
          <UserPlus className="w-4 h-4 text-turmeric" />
          <span>+ Undang Editor</span>
        </button>
      </div>

      {toast && (
        <div className="p-4 rounded-xl bg-success-bg border border-leaf/30 text-leaf text-sm flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      <div className="rounded-card bg-paper border border-line overflow-hidden shadow-xs">
        <div className="divide-y divide-line">
          {users.map((u) => (
            <div
              key={u.id}
              className="p-5 flex items-center justify-between gap-4 hover:bg-rice/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rice border border-line flex items-center justify-center text-leaf font-bold">
                  {u.displayName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-ink">{u.displayName}</h3>
                  <p className="text-xs text-muted">{u.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rice border border-line text-wood capitalize">
                  <Shield className="w-3 h-3" />
                  <span>{u.role}</span>
                </span>

                {u.role !== 'owner' && (
                  <button
                    type="button"
                    onClick={() => toggleUserActive(u.id)}
                    className={`touch-target px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${
                      u.active
                        ? 'bg-success-bg text-leaf border-leaf/30'
                        : 'bg-danger/10 text-danger border-danger/30'
                    }`}
                  >
                    {u.active ? 'Aktif' : 'Nonaktif'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-ink/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-paper max-w-md w-full rounded-card border border-line p-6 sm:p-8 shadow-2xl space-y-5">
            <div>
              <h2 className="font-editorial text-2xl font-bold text-ink">
                Undang Editor Dapur
              </h2>
              <p className="text-xs text-muted mt-1">
                Editor dapat menambah dan menerbitkan menu harian tetapi tidak dapat mengubah data
                keamanan.
              </p>
            </div>

            <form onSubmit={handleInvite} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
                  Nama Staf
                </label>
                <input
                  type="text"
                  required
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="Contoh: Mas Budi (Kasir)"
                  className="w-full px-4 py-2.5 rounded-input border border-line bg-rice/40 text-ink text-sm focus:outline-none focus:border-leaf focus:bg-paper"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink mb-1.5">
                  Alamat Email Staf
                </label>
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="budi@pawontentrem.id"
                  className="w-full px-4 py-2.5 rounded-input border border-line bg-rice/40 text-ink text-sm focus:outline-none focus:border-leaf focus:bg-paper"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-line">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="px-4 py-2 rounded-full border border-line text-xs font-semibold text-muted hover:text-ink"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="touch-target px-5 py-2 rounded-full bg-leaf text-paper font-semibold text-xs hover:bg-leaf-dark shadow-sm"
                >
                  Kirim Undangan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
