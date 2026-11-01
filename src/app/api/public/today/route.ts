import { NextResponse } from 'next/server';
import { getTodayMenu } from '@/lib/menu/service';

export const dynamic = 'force-dynamic';

export async function GET() {
  const data = await getTodayMenu();

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'private, no-store, no-cache, must-revalidate',
    },
  });
}

