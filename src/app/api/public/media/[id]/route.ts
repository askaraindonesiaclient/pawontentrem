import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json({ code: 'NOT_FOUND', message: 'Media tidak ditemukan' }, { status: 404 });
  }

  // Check if media belongs to demo items
  if (id === 'demo-media-1') {
    return NextResponse.json({ url: '/assets/photos/nasi-liwet.jpg', expiresAt: null });
  }
  if (id === 'demo-media-2') {
    return NextResponse.json({ url: '/assets/photos/nasi-rames.jpg', expiresAt: null });
  }

  const adminClient = await createAdminClient();
  if (!adminClient) {
    return NextResponse.json({ code: 'NOT_FOUND', message: 'Media storage belum aktif' }, { status: 404 });
  }

  // Verify that media is referenced in a published revision or published gallery
  const { data: menuMedia } = await adminClient
    .from('menu_entry_media')
    .select(`
      id,
      media_id,
      menu_entries!inner (
        id,
        menu_revisions!inner (
          id,
          state
        )
      )
    `)
    .eq('media_id', id)
    .eq('menu_entries.menu_revisions.state', 'published')
    .maybeSingle();

  const { data: galleryMedia } = await adminClient
    .from('gallery_items')
    .select('id, media_id, published')
    .eq('media_id', id)
    .eq('published', true)
    .maybeSingle();

  if (!menuMedia && !galleryMedia) {
    // If not published, reject unauthorized access to draft media
    return NextResponse.json(
      { code: 'FORBIDDEN', message: 'Foto draf tidak dapat diakses publik' },
      { status: 403 }
    );
  }

  // Create signed URL for 10 minutes (600 seconds)
  const { data: variant } = await adminClient
    .from('media_variants')
    .select('storage_path')
    .eq('media_id', id)
    .order('width', { ascending: false })
    .limit(1)
    .maybeSingle();

  const path = variant?.storage_path || `${id}.webp`;

  const { data: signed, error: signError } = await adminClient.storage
    .from('menu-web')
    .createSignedUrl(path, 600);

  if (signError || !signed?.signedUrl) {
    return NextResponse.json({ code: 'NOT_FOUND', message: 'Gagal membuat URL media' }, { status: 404 });
  }

  return NextResponse.json({
    url: signed.signedUrl,
    expiresAt: new Date(Date.now() + 600000).toISOString(),
  });
}

