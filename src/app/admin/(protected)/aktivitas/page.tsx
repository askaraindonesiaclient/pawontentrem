import React from 'react';
import { Activity, CheckCircle2, Shield } from 'lucide-react';
import { formatWibTime } from '@/lib/time/wib';

interface AuditItem {
  id: string;
  actor: string;
  action: string;
  entity: string;
  result: 'SUCCESS' | 'FAILED';
  time: string;
}

const AUDIT_ITEMS: AuditItem[] = [
  {
    id: 'a-1',
    actor: 'Pemilik Pawon',
    action: 'PUBLISH_MENU_REVISION',
    entity: 'Menu Hari Ini (6 item)',
    result: 'SUCCESS',
    time: new Date().toISOString(),
  },
  {
    id: 'a-2',
    actor: 'Staf Dapur',
    action: 'UPDATE_ITEM_STATUS',
    entity: 'Tempe Bacem -> Habis',
    result: 'SUCCESS',
    time: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'a-3',
    actor: 'Pemilik Pawon',
    action: 'CREATE_DRAFT',
    entity: 'Draf 1 November 2026',
    result: 'SUCCESS',
    time: new Date(Date.now() - 7200000).toISOString(),
  },
];

export default function AktivitasAdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-ink">
          Catatan Jejak Aktivitas (Audit Log)
        </h1>
        <p className="text-muted text-xs sm:text-sm mt-1">
          Rekaman otomatis setiap perubahan draf, pembaruan status sajian, dan transaksi publikasi.
        </p>
      </div>

      <div className="rounded-card bg-paper border border-line overflow-hidden shadow-xs">
        <div className="divide-y divide-line">
          {AUDIT_ITEMS.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-rice/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-full bg-rice border border-line text-leaf">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-ink">{item.action}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-success-bg text-leaf font-semibold text-[10px]">
                      {item.result}
                    </span>
                  </div>
                  <p className="text-xs text-muted mt-0.5">
                    {item.entity} • Dilakukan oleh: <strong className="text-ink">{item.actor}</strong>
                  </p>
                </div>
              </div>

              <div className="text-right text-xs text-muted whitespace-nowrap">
                {formatWibTime(item.time)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
