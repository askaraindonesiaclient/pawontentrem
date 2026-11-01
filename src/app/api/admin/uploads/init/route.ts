import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ code: 'UNAUTHENTICATED', message: 'Silakan login terlebih dahulu' }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from('admin_profiles')
      .select('active')
      .eq('user_id', user.id)
      .maybeSingle();

    if (!profile || !profile.active) {
      return NextResponse.json({ code: 'FORBIDDEN', message: 'Akses ditolak' }, { status: 403 });
    }

    const body = await request.json();
    const { name, declaredBytes, mime } = body;

    // Check size limit: 15MB
    if (declaredBytes && declaredBytes > 15 * 1024 * 1024) {
      return NextResponse.json(
        { code: 'FILE_TOO_LARGE', message: 'Ukuran foto maksimal 15 MB' },
        { status: 413 }
      );
    }

    // Allowed mime types
    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];
    if (mime && !allowedMimes.includes(mime.toLowerCase())) {
      return NextResponse.json(
        { code: 'UNSUPPORTED_MEDIA', message: 'Format foto harus JPEG, PNG, WebP, atau HEIC' },
        { status: 415 }
      );
    }

    const mediaId = crypto.randomUUID();
    const originalPath = `${user.id}/${mediaId}-${name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

    const adminClient = await createAdminClient();
    if (!adminClient) {
      // In local/demo mode without admin secrets
      return NextResponse.json({
        uploadId: mediaId,
        mediaId,
        signedUploadUrl: null,
        message: 'Storage backend belum dikonfigurasi',
      });
    }

    // Insert pending media asset
    await adminClient.from('media_assets').insert({
      id: mediaId,
      owner_id: user.id,
      original_path: originalPath,
      status: 'pending',
    });

    const { data: uploadSlot, error: uploadError } = await adminClient.storage
      .from('menu-originals')
      .createSignedUploadUrl(originalPath);

    if (uploadError || !uploadSlot) {
      return NextResponse.json(
        { code: 'TEMPORARY_ERROR', message: 'Gagal membuat slot unggah' },
        { status: 503 }
      );
    }

    return NextResponse.json({
      uploadId: mediaId,
      mediaId,
      originalPath,
      signedUploadUrl: uploadSlot.signedUrl,
      token: uploadSlot.token,
    });
  } catch {
    return NextResponse.json(
      { code: 'TEMPORARY_ERROR', message: 'Terjadi kesalahan sistem' },
      { status: 500 }
    );
  }
}

