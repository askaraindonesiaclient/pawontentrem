import { createClient } from '@/lib/supabase/server';
import { getWibDateString } from '@/lib/time/wib';
import { TodayMenuResponse } from '@/types';
import { DEMO_MENU_ITEMS } from './demo-data';

export async function getTodayMenu(): Promise<TodayMenuResponse> {
  const serviceDate = getWibDateString();
  const serverNow = new Date().toISOString();

  try {
    const supabase = await createClient();

    // 1. Try RPC function
    const { data: rpcData, error: rpcError } = await supabase.rpc('get_today_published_menu');

    if (!rpcError && rpcData) {
      return rpcData as TodayMenuResponse;
    }

    // 2. Fallback query direct tables
    const { data: dayData, error: dayError } = await supabase
      .from('menu_days')
      .select(`
        id,
        service_date,
        published_revision_id,
        updated_at,
        menu_revisions!published_revision_same_day (
          id,
          version,
          published_at,
          menu_entries (
            id,
            name,
            category,
            price_rupiah,
            price_mode,
            price_unit,
            availability,
            sort_order,
            hidden,
            menu_entry_media (
              id,
              media_id,
              sort_order,
              focal_x,
              focal_y,
              alt
            )
          )
        )
      `)
      .eq('service_date', serviceDate)
      .maybeSingle();

    if (dayError || !dayData || !dayData.published_revision_id) {
      // In demo mode, provide demo items
      if (process.env.APP_MODE === 'demo') {
        return {
          serverNow,
          serviceDate,
          status: 'published',
          publicationId: 'demo-revision-id',
          publishedAt: serverNow,
          updatedAt: serverNow,
          items: DEMO_MENU_ITEMS,
        };
      }

      return {
        serverNow,
        serviceDate,
        status: 'not_published',
        items: [],
      };
    }

    const rev = Array.isArray(dayData.menu_revisions)
      ? dayData.menu_revisions[0]
      : dayData.menu_revisions;

    const entries = (rev?.menu_entries || [])
      .filter((e: any) => !e.hidden)
      .sort((a: any, b: any) => a.sort_order - b.sort_order)
      .map((e: any) => ({
        id: e.id,
        name: e.name,
        category: e.category,
        priceRupiah: e.price_rupiah,
        priceMode: e.price_mode,
        priceUnit: e.price_unit,
        availability: e.availability,
        sortOrder: e.sort_order,
        media: (e.menu_entry_media || []).map((m: any) => ({
          id: m.id,
          mediaId: m.media_id,
          focalX: m.focal_x,
          focalY: m.focal_y,
          alt: m.alt,
        })),
      }));

    return {
      serverNow,
      serviceDate,
      status: 'published',
      publicationId: rev?.id,
      publishedAt: rev?.published_at,
      updatedAt: dayData.updated_at,
      items: entries,
    };
  } catch {
    // If Supabase connection fails or not configured
    if (process.env.APP_MODE === 'demo') {
      return {
        serverNow,
        serviceDate,
        status: 'published',
        publicationId: 'demo-revision-id',
        publishedAt: serverNow,
        items: DEMO_MENU_ITEMS,
      };
    }

    return {
      serverNow,
      serviceDate,
      status: 'not_published',
      items: [],
    };
  }
}
