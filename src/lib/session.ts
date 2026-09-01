import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

// Keys that are purely session-level (not per-user persistent data).
// These are cleared on logout. Per-user data (settings, history, profile cache,
// conversations, form drafts) is keyed by userId and MUST survive logout so
// that re-login restores the exact state.
const SESSION_ONLY_KEYS = [
  'aura.auth',
];

// Per-user prefixes (aura_user_settings_, aura.history., aura.generation_count.,
// aura_profile_, aura.conversation., aura.active_conversation_id, aura_form_state_)
// are intentionally NOT removed during sign-out — they are keyed by userId and
// must survive logout so re-login restores the exact state.

function clearAuraLocalStorage(): void {
  try {
    // Only remove session-only keys — never per-user persistent data.
    for (const key of SESSION_ONLY_KEYS) {
      localStorage.removeItem(key);
    }
  } catch {
    /* ignore */
  }
}

function clearAuraSessionStorage(): void {
  try {
    sessionStorage.clear();
  } catch {
    /* ignore */
  }
}

export async function performFullSignOut(): Promise<void> {
  clearAuraLocalStorage();
  clearAuraSessionStorage();
  await supabase.auth.signOut();
}

export function handleSessionChange(
  newSession: Session | null,
  callbacks: {
    onSignOut: () => void;
    onSignIn: (session: Session) => void;
  },
): void {
  if (!newSession?.user) {
    callbacks.onSignOut();
  } else {
    callbacks.onSignIn(newSession);
  }
}
