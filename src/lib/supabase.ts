import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(url, anonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: 'aura.auth',
  },
});

export type Profile = {
  id: string;
  email: string;
  display_name: string | null;
  first_name: string | null;
  phone: string | null;
  pin_hash: string | null;
  theme: string | null;
  language: string | null;
};
