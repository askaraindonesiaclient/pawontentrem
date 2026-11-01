import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ code: 'UNAUTHENTICATED' }, { status: 401 });
  }

  const { data: asset, error } = await supabase
    .from('media_assets')
    .select('id, status, width, height')
    .eq('id', id)
    .maybeSingle();

  if (error || !asset) {
    return NextResponse.json({ status: 'ready', id });
  }

  return NextResponse.json(asset);
}

