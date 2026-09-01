import { supabase } from './supabase';

const VISITOR_KEY = 'aura_visitor_id';

export function getVisitorId(): string {
  let id = localStorage.getItem(VISITOR_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(VISITOR_KEY, id);
  }
  return id;
}

let tracked = false;

export async function trackSiteVisit(): Promise<void> {
  if (tracked) return;
  tracked = true;

  try {
    const { data: session } = await supabase.auth.getSession();
    const userId = session?.session?.user?.id ?? null;

    await supabase.from('site_visits').insert({
      visitor_id: getVisitorId(),
      user_id: userId,
      is_anonymous: !userId,
      user_agent: navigator.userAgent,
      referrer: document.referrer || null,
    });
  } catch {
    // silently ignore — visit tracking is best-effort
  }
}
