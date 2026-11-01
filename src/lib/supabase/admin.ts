import 'server-only';
import { createClient } from '@supabase/supabase-js';
import { getRuntimeEnv } from '../cloudflare/context';

export async function createAdminClient() {
  const env = await getRuntimeEnv();

  const supabaseUrl =
    env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    'https://yysctpfwpoxgspusdyta.supabase.co';
  const secretKey =
    env.SUPABASE_SECRET_KEY ||
    env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!secretKey) {
    return null;
  }

  return createClient(supabaseUrl, secretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
