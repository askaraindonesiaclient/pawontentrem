import React from 'react';
import type { Metadata } from 'next';
import { DailyMenuSection } from '@/components/public/DailyMenuSection';
import { getTodayMenu } from '@/lib/menu/service';

export const metadata: Metadata = {
  title: 'Menu Hari Ini | Pawon Tentrem',
  description:
    'Daftar menu prasmanan harian Pawon Tentrem hari ini. Dipilih dan dimasak segar setiap pagi.',
};

export const revalidate = 0;

export default async function MenuHariIniPage() {
  const todayMenu = await getTodayMenu();

  return (
    <div className="py-8">
      <DailyMenuSection initialData={todayMenu} />
    </div>
  );
}
