import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { supabase } from '@/lib/supabase';

export type ThemeMode = 'dark' | 'light';
export type Language = 'pt' | 'en' | 'es' | 'fr' | 'de';

type SettingsState = {
  theme: ThemeMode;
  language: Language;
  setTheme: (t: ThemeMode) => void;
  toggleTheme: () => void;
  setLanguage: (l: Language) => void;
};

const SETTINGS_PREFIX = 'aura_user_settings_';
const LAST_THEME_KEY = 'aura_last_theme';

const DEFAULT_THEME: ThemeMode = 'dark';
const DEFAULT_LANGUAGE: Language = 'pt';

const LANG_COUNTRY_MAP: Record<string, Language> = {
  pt: 'pt', 'pt-pt': 'pt', 'pt-ao': 'pt', 'pt-br': 'pt',
  en: 'en', 'en-us': 'en', 'en-gb': 'en',
  es: 'es', 'es-es': 'es', 'es-mx': 'es', 'es-ar': 'es',
  fr: 'fr', 'fr-fr': 'fr',
  de: 'de', 'de-de': 'de', 'de-at': 'de',
};

const COUNTRY_LANG_MAP: Record<string, Language> = {
  PT: 'pt', AO: 'pt', BR: 'pt',
  US: 'en', GB: 'en', AU: 'en', CA: 'en', IE: 'en',
  ES: 'es', MX: 'es', AR: 'es', CO: 'es', CL: 'es', PE: 'es',
  FR: 'fr', BE: 'fr', CH: 'fr',
  DE: 'de', AT: 'de',
};

function detectBrowserLanguage(): Language {
  try {
    const navLang = (navigator.language || '').toLowerCase();
    if (navLang) {
      const key = navLang in LANG_COUNTRY_MAP ? navLang : navLang.split('-')[0];
      const mapped = LANG_COUNTRY_MAP[key] ?? LANG_COUNTRY_MAP[navLang.split('-')[0] ?? ''];
      if (mapped) return mapped;
    }
    const navLangs = navigator.languages ?? [];
    for (const l of navLangs) {
      const key = l.toLowerCase();
      const mapped = LANG_COUNTRY_MAP[key] ?? LANG_COUNTRY_MAP[key.split('-')[0] ?? ''];
      if (mapped) return mapped;
    }
  } catch { /* ignore */ }
  return DEFAULT_LANGUAGE;
}

let ipLangCache: Language | null = null;
let ipLangPromise: Promise<Language | null> | null = null;

function detectIPLanguage(): Promise<Language | null> {
  if (ipLangCache !== null) return Promise.resolve(ipLangCache);
  if (ipLangPromise) return ipLangPromise;
  ipLangPromise = (async () => {
    try {
      const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(3000) });
      if (!res.ok) return null;
      const data = await res.json() as { country_code?: string; country?: string };
      const cc = (data.country_code ?? data.country ?? '').toUpperCase();
      const mapped = cc ? COUNTRY_LANG_MAP[cc] ?? null : null;
      if (mapped) ipLangCache = mapped;
      return mapped;
    } catch {
      return null;
    }
  })();
  return ipLangPromise;
}

// eslint-disable-next-line react-refresh/only-export-components
export async function detectInitialLanguage(): Promise<Language> {
  const browser = detectBrowserLanguage();
  if (browser !== DEFAULT_LANGUAGE) return browser;
  const ip = await detectIPLanguage();
  if (ip) return ip;
  return DEFAULT_LANGUAGE;
}

// eslint-disable-next-line react-refresh/only-export-components
export function detectBrowserLanguageSync(): Language {
  return detectBrowserLanguage();
}

const SettingsContext = createContext<SettingsState | null>(null);

function storageKey(userId: string | null): string {
  return `${SETTINGS_PREFIX}${userId ?? 'guest'}`;
}

type StoredSettings = {
  theme: ThemeMode;
  language: Language;
};

function loadFromLocalStorage(userId: string | null): { theme: ThemeMode; language: Language } {
  try {
    const raw = localStorage.getItem(storageKey(userId));
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<StoredSettings>;
      const theme = parsed.theme === 'light' || parsed.theme === 'dark' ? parsed.theme : DEFAULT_THEME;
      const language =
        parsed.language === 'pt' || parsed.language === 'en' || parsed.language === 'es' ||
        parsed.language === 'fr' || parsed.language === 'de'
          ? parsed.language
          : DEFAULT_LANGUAGE;
      return { theme, language };
    }
  } catch {
    /* ignore */
  }
  return { theme: DEFAULT_THEME, language: DEFAULT_LANGUAGE };
}

function saveToLocalStorage(userId: string | null, settings: StoredSettings) {
  try {
    localStorage.setItem(storageKey(userId), JSON.stringify(settings));
    localStorage.setItem(LAST_THEME_KEY, settings.theme);
  } catch {
    /* ignore */
  }
}

function applyThemeClass(theme: ThemeMode) {
  const root = document.documentElement;
  root.classList.remove('theme-dark', 'theme-light');
  root.classList.add('theme-' + theme);
}

function coerceTheme(v: unknown): ThemeMode {
  return v === 'light' || v === 'dark' ? (v as ThemeMode) : DEFAULT_THEME;
}

function coerceLanguage(v: unknown): Language {
  return v === 'pt' || v === 'en' || v === 'es' || v === 'fr' || v === 'de' ? (v as Language) : DEFAULT_LANGUAGE;
}

export function SettingsProvider({
  children,
  userId,
}: {
  children: ReactNode;
  userId: string | null;
}) {
  const [theme, setThemeState] = useState<ThemeMode>(() => loadFromLocalStorage(userId).theme);
  const [language, setLanguageState] = useState<Language>(() => loadFromLocalStorage(userId).language);
  const dbSyncedRef = useRef(false);
  const autoDetectRef = useRef(false);

  useLayoutEffect(() => {
    applyThemeClass(theme);
  }, [theme]);

  useEffect(() => {
    if (autoDetectRef.current) return;
    autoDetectRef.current = true;
    const hasStoredPref = (() => {
      try {
        const raw = localStorage.getItem(storageKey(userId));
        if (!raw) return false;
        const parsed = JSON.parse(raw) as Partial<StoredSettings>;
        return parsed?.language != null;
      } catch { return false; }
    })();
    if (!hasStoredPref) {
      let cancelled = false;
      void detectInitialLanguage().then((detected) => {
        if (!cancelled) {
          setLanguageState((prev) => (prev === detected ? prev : detected));
        }
      });
      return () => { cancelled = true; };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    if (!userId) {
      dbSyncedRef.current = false;
      const local = loadFromLocalStorage(null);
      setThemeState(local.theme);
      setLanguageState(local.language);
      applyThemeClass(local.theme);
      return;
    }

    let cancelled = false;
    dbSyncedRef.current = false;

    (async () => {
      const { data } = await supabase
        .from('profiles')
        .select('theme, language')
        .eq('id', userId)
        .maybeSingle();

      if (cancelled) return;

      const dbTheme = data?.theme ? coerceTheme(data.theme) : null;
      const dbLanguage = data?.language ? coerceLanguage(data.language) : null;

      const local = loadFromLocalStorage(userId);
      const nextTheme = dbTheme ?? local.theme;
      const nextLanguage = dbLanguage ?? local.language;

      setThemeState((prev) => prev === nextTheme ? prev : nextTheme);
      setLanguageState((prev) => prev === nextLanguage ? prev : nextLanguage);
      applyThemeClass(nextTheme);

      dbSyncedRef.current = true;
    })();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  const persistLocal = useCallback(
    (next: StoredSettings) => {
      saveToLocalStorage(userId, next);
    },
    [userId],
  );

  const persistToDB = useCallback(
    (next: StoredSettings) => {
      if (userId && dbSyncedRef.current) {
        void supabase
          .from('profiles')
          .update({
            theme: next.theme,
            language: next.language,
          })
          .eq('id', userId);
      }
    },
    [userId],
  );

  const setTheme = useCallback((t: ThemeMode) => {
    setThemeState(t);
    persistLocal({ theme: t, language });
    persistToDB({ theme: t, language });
  }, [language, persistLocal, persistToDB]);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      persistLocal({ theme: next, language });
      persistToDB({ theme: next, language });
      return next;
    });
  }, [language, persistLocal, persistToDB]);

  const setLanguage = useCallback((l: Language) => {
    setLanguageState(l);
    persistLocal({ theme, language: l });
    persistToDB({ theme, language: l });
  }, [theme, persistLocal, persistToDB]);

  const value = useMemo<SettingsState>(
    () => ({ theme, language, setTheme, toggleTheme, setLanguage }),
    [theme, language, setTheme, toggleTheme, setLanguage],
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSettings(): SettingsState {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}
