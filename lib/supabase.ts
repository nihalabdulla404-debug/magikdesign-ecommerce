import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Initialize Supabase Client
export const supabase = (supabaseUrl && !supabaseUrl.includes('your-supabase'))
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Checks if Supabase is properly configured with live URL and Key.
 */
export const isSupabaseConfigured = (): boolean => {
  return !!supabase;
};
