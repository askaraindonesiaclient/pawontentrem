import { getCloudflareContext } from '@opennextjs/cloudflare';

export async function getRuntimeEnv(): Promise<Partial<CloudflareEnv>> {
  try {
    const cf = await getCloudflareContext({ async: true });
    return (cf?.env as Partial<CloudflareEnv>) || {};
  } catch {
    return {
      SUPABASE_URL: process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
      SUPABASE_PUBLISHABLE_KEY: process.env.SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
      SUPABASE_SECRET_KEY: process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY,
      RESTAURANT_TIMEZONE: process.env.RESTAURANT_TIMEZONE || 'Asia/Jakarta',
      APP_MODE: process.env.APP_MODE || 'production',
      SITE_URL: process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL,
    };
  }
}
