import { supabase } from './supabase';

const _PIN_CACHE_KEY = 'aura_pin_hash_cache';
const PIN_CACHE_PREFIX = 'aura_pin_hash_';

async function sha256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

function getCachedHash(userId: string): string | null {
  try {
    const val = localStorage.getItem(PIN_CACHE_PREFIX + userId);
    return val ?? null;
  } catch {
    return null;
  }
}

function setCachedHash(userId: string, hash: string): void {
  try {
    localStorage.setItem(PIN_CACHE_PREFIX + userId, hash);
  } catch {
    // ignore storage errors
  }
}

function clearCachedHash(userId: string): void {
  try {
    localStorage.removeItem(PIN_CACHE_PREFIX + userId);
  } catch {
    // ignore storage errors
  }
}

export async function setPin(userId: string, pin: string): Promise<boolean> {
  if (!/^\d{4}$/.test(pin)) return false;
  const hash = await sha256(`aura-pin:${pin}`);
  // Optimistically cache the hash so the UI can proceed instantly
  setCachedHash(userId, hash);
  // Fire-and-forget the DB update — don't block the UI
  supabase
    .from('profiles')
    .update({ pin_hash: hash, pin_updated_at: new Date().toISOString() })
    .eq('id', userId)
    .then(({ error }) => {
      if (error) {
        console.error('[pin] setPin DB error:', error.message);
        clearCachedHash(userId);
      }
    });
  return true;
}

export async function clearPin(userId: string): Promise<boolean> {
  clearCachedHash(userId);
  // Fire-and-forget — don't block UI
  supabase
    .from('profiles')
    .update({ pin_hash: null, pin_updated_at: new Date().toISOString() })
    .eq('id', userId)
    .then(({ error }) => {
      if (error) console.error('[pin] clearPin DB error:', error.message);
    });
  return true;
}

export async function verifyPin(userId: string, pin: string): Promise<boolean> {
  if (!/^\d{4}$/.test(pin)) return false;

  const inputHash = await sha256(`aura-pin:${pin}`);

  // Try cached hash first for instant unlock
  const cachedHash = getCachedHash(userId);
  if (cachedHash && inputHash === cachedHash) {
    // Still sync with server in background
    supabase
      .from('profiles')
      .select('pin_hash')
      .eq('id', userId)
      .maybeSingle()
      .then(({ data }) => {
        if (data?.pin_hash) setCachedHash(userId, data.pin_hash);
      });
    return true;
  }

  // Online verification with timeout
  const { data, error } = await Promise.race([
    supabase
      .from('profiles')
      .select('pin_hash')
      .eq('id', userId)
      .maybeSingle(),
    new Promise<{ data: null; error: { message: string } }>((resolve) =>
      setTimeout(() => resolve({ data: null, error: { message: 'timeout' } }), 5000)
    ),
  ]);

  if (!error && data) {
    if (data.pin_hash) {
      setCachedHash(userId, data.pin_hash);
      return inputHash === data.pin_hash;
    }
    clearCachedHash(userId);
    return true;
  }

  // Offline or query failed: fall back to cached hash
  if (cachedHash) {
    return inputHash === cachedHash;
  }

  return false;
}

export async function hasPinConfigured(email: string): Promise<boolean> {
  const { data } = await supabase
    .from('profiles')
    .select('pin_hash')
    .eq('email', email.trim().toLowerCase())
    .maybeSingle();
  return !!data?.pin_hash;
}

export async function sendPinRecoveryEmail(email: string): Promise<boolean> {
  try {
    const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-aura-otp`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ email: email.trim(), shouldCreateUser: false }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function sendPinRecoverySms(phone: string): Promise<boolean> {
  try {
    const { error } = await supabase.auth.signInWithOtp({
      phone: phone.trim(),
      options: { shouldCreateUser: false },
    });
    return !error;
  } catch {
    return false;
  }
}

// Preload cache when profile is available (call after login)
export async function preloadPinCache(userId: string): Promise<void> {
  const { data } = await supabase
    .from('profiles')
    .select('pin_hash')
    .eq('id', userId)
    .maybeSingle();
  if (data?.pin_hash) {
    setCachedHash(userId, data.pin_hash);
  }
}
