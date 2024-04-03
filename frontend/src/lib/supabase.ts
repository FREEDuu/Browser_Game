import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'


export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)

export interface SupabaseClientAuth {
    auth: {
      signIn: (data: { email: string; password: string }) => Promise<{ user: any; error: Error }>;
    };
  }