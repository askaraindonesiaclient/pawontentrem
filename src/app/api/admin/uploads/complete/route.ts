import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ code: 'UNAUTHENTICATED' }, { status: 401 });
    }

    const body = await request.json();
    const { mediaId } = body;

    if (!mediaId) {
      return NextResponse.json({ code: 'VALIDATION_ERROR', message: 'mediaId wajib diisi' }, { status: 422 });
    }

    const adminClient = await createAdminClient();
    if (!adminClient) {
      return NextResponse.json({
        mediaId,
        status: 'ready',
        message: 'Foto siap (demo storage)',
      });
    }

    // Update status to ready
    await adminClient
      .from('media_assets')
      .update({
        status: 'ready',
      })
      .eq('id', mediaId);

    return NextResponse.json({
      mediaId,
      status: 'ready',
    });
  } catch {
    return NextResponse.json({ code: 'TEMPORARY_ERROR' }, { status: 500 });
  }
}
