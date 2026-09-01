import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import TopNav from '@/components/TopNav';
import AnalysisTab from '@/components/AnalysisTab';
import ImproveTab from '@/components/ImproveTab';
import TipsTab from '@/components/TipsTab';
import ProfileTab from '@/components/ProfileTab';
import AuthModal from '@/components/AuthModal';
import WelcomeModal from '@/components/WelcomeModal';
import PinGate from '@/components/PinGate';
import EngagementPopup from '@/components/EngagementPopup';
import ShareGatePopup from '@/components/ShareGatePopup';
import { SettingsProvider, useSettings } from '@/lib/settings';
import { translate } from '@/lib/i18n';
import { updateSEO, type PageArea } from '@/lib/seo';
import type { TabId, HistoryEntry } from '@/types';
import { supabase, type Profile } from '@/lib/supabase';
import AdminPanel from '@/components/AdminPanel';
import { isAdmin } from '@/lib/adminAccess';
import { performFullSignOut } from '@/lib/session';
import { trackSiteVisit } from '@/lib/visitTracker';
import LandingPage from '@/components/LandingPage';
import AuraLogo from '@/components/AuraLogo';
import { Sparkles, ArrowRight } from 'lucide-react';

const HISTORY_STORAGE_BASE = 'aura.history.';
const GEN_COUNT_KEY_BASE = 'aura.generation_count.';
const LANDING_WELCOME_SEEN = 'aura.landing_welcome_seen';

function historyKey(userId: string | null): string {
  return `${HISTORY_STORAGE_BASE}${userId ?? 'guest'}`;
}

function genCountKey(userId: string | null): string {
  return `${GEN_COUNT_KEY_BASE}${userId ?? 'guest'}`;
}

function loadHistory(userId: string | null): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(historyKey(userId));
    return raw ? (JSON.parse(raw) as HistoryEntry[]) : [];
  } catch {
    return [];
  }
}

function loadGenCount(userId: string | null): number {
  try {
    const raw = localStorage.getItem(genCountKey(userId));
    return raw ? parseInt(raw, 10) : 0;
  } catch {
    return 0;
  }
}

type LandingState = 'landing' | 'entering' | 'app';

export default function App() {
  const [tab, setTab] = useState<TabId>('gerador');
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [pinUnlocked, setPinUnlocked] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [, setHistory] = useState<HistoryEntry[]>(() => loadHistory(null));
  const [welcomeOpen, setWelcomeOpen] = useState(false);
  const [generationCount, setGenerationCount] = useState<number>(() => loadGenCount(null));
  const [landingState, setLandingState] = useState<LandingState>('landing');
  const [showLandingWelcome, setShowLandingWelcome] = useState(false);

  useEffect(() => {
    let mounted = true;
    let lastSessionKey: string | null = null;

    trackSiteVisit();

    const applySession = async (newSession: Session | null) => {
      if (!mounted) return;
      const key = newSession?.user?.id ?? null;
      if (key === lastSessionKey) return;
      lastSessionKey = key;
      setSession(newSession);
      setPinUnlocked(false);
      if (newSession?.user) {
        setLandingState('app');
        const cacheKey = `aura_profile_${newSession.user.id}`;
        try {
          const cached = localStorage.getItem(cacheKey);
          if (cached && mounted) {
            const cachedProfile = JSON.parse(cached) as Profile;
            setProfile(cachedProfile);
          }
        } catch { /* ignore */ }

        const profilePromise = supabase
          .from('profiles')
          .select('id, email, display_name, first_name, phone, pin_hash, theme, language')
          .eq('id', newSession.user.id)
          .maybeSingle();
        const timeoutPromise = new Promise<{ data: null; error: null }>((resolve) =>
          setTimeout(() => resolve({ data: null, error: null }), 8000)
        );
        const { data: prof } = await Promise.race([profilePromise, timeoutPromise]).catch(() => ({ data: null, error: null }));
        if (prof && mounted) {
          setProfile(prof as Profile | null);
          try {
            localStorage.setItem(cacheKey, JSON.stringify(prof));
          } catch { /* ignore */ }
        }
        setHistory(loadHistory(newSession.user.id));
        setGenerationCount(loadGenCount(newSession.user.id));
      } else {
        setProfile(null);
        setHistory(loadHistory(null));
        setGenerationCount(loadGenCount(null));
      }
    };

    supabase.auth.getSession().then(({ data }) => {
      void applySession(data.session);
      try {
        if (!localStorage.getItem('aura.welcome_seen')) setWelcomeOpen(true);
      } catch { /* ignore */ }
    });

    const { data: sub } = supabase.auth.onAuthStateChange((event, newSession) => {
      if (event === 'TOKEN_REFRESHED' || event === 'INITIAL_SESSION' || event === 'USER_UPDATED') return;
      void applySession(newSession);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const openLogin = useCallback(() => {
    setAuthMode('login');
    setAuthOpen(true);
  }, []);
  const openSignUp = useCallback(() => {
    setAuthMode('signup');
    setAuthOpen(true);
  }, []);

  const handleSignOut = useCallback(async () => {
    await performFullSignOut();
    setProfile(null);
    setPinUnlocked(false);
    setHistory(loadHistory(null));
    setGenerationCount(loadGenCount(null));
    setTab('gerador');
    setLandingState('landing');
  }, []);

  const addHistory = useCallback((entry: {
    context: string;
    tone: string;
    input: string;
    output: string;
  }) => {
    const item: HistoryEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      createdAt: Date.now(),
      ...entry,
    };
    setHistory((prev) => {
      const next = [item, ...prev].slice(0, 50);
      try {
        localStorage.setItem(historyKey(session?.user?.id ?? null), JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
    setGenerationCount((prev) => {
      const next = prev + 1;
      try {
        localStorage.setItem(genCountKey(session?.user?.id ?? null), String(next));
      } catch { /* ignore */ }
      return next;
    });
  }, [session?.user?.id]);

  const user = useMemo(() =>
    session?.user
      ? {
          displayName: profile?.display_name ?? null,
          firstName: profile?.first_name ?? null,
        }
      : null,
    [session?.user, profile?.display_name, profile?.first_name]
  );

  const enterApp = useCallback(() => {
    if (session?.user) {
      setLandingState('app');
      setTab('gerador');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setLandingState('entering');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setLandingState('app');
      setTab('gerador');
      try {
        if (!localStorage.getItem(LANDING_WELCOME_SEEN)) {
          localStorage.setItem(LANDING_WELCOME_SEEN, '1');
          setShowLandingWelcome(true);
        }
      } catch { /* ignore */ }
    }, 500);
  }, [session?.user]);

  const dismissLandingWelcome = useCallback(() => {
    setShowLandingWelcome(false);
  }, []);

  const showApp = landingState === 'app' || (!!session?.user && landingState !== 'landing');
  const showLanding = landingState === 'landing' || landingState === 'entering';

  return (
    <SettingsProvider userId={session?.user?.id ?? null}>
      <SEOManager tab={tab} area={showApp ? undefined : 'landing'} />
      <div className="min-h-screen relative">
        {/* Landing → App transition glow */}
        {landingState === 'entering' && (
          <div className="fixed inset-0 z-50 pointer-events-none animate-aura-glow">
            <div className="absolute inset-0 bg-gradient-to-b from-aura-slate/20 via-transparent to-transparent" />
          </div>
        )}

        {showLanding && (
          <div className={landingState === 'entering' ? 'animate-aura-enter' : ''}>
            <LandingPage
              onTryNow={enterApp}
              onLogin={openLogin}
              onSignUp={openSignUp}
            />
          </div>
        )}

        {showApp && (
          <>
            <TopNav
              active={tab}
              onChange={setTab}
              user={user}
              onLogin={openLogin}
              onSignUp={openSignUp}
              onSignOut={handleSignOut}
              onHome={() => {
                setTab('gerador');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <main className="py-6">
              <div className={profile?.pin_hash && !pinUnlocked ? 'pointer-events-none opacity-40 select-none blur-sm' : ''}>
                <div className={tab === 'gerador' ? 'block' : 'hidden'}>
                  <AnalysisTab key={session?.user?.id ?? 'guest'} userId={session?.user?.id ?? null} onGenerated={addHistory} />
                </div>
                <div className={tab === 'melhorar' ? 'block' : 'hidden'}>
                  <ImproveTab />
                </div>
                <div className={tab === 'dicas' ? 'block' : 'hidden'}>
                  <TipsTab />
                </div>
                <div className={tab === 'perfil' ? 'block' : 'hidden'}>
                  <ProfileTab
                    key={session?.user?.id ?? 'guest'}
                    session={session}
                    profile={profile}
                    onLogin={openLogin}
                    onSignUp={openSignUp}
                    onProfileUpdate={(patch) => setProfile((prev) => prev ? { ...prev, ...patch } : prev)}
                  />
                </div>
              </div>
            </main>

            <Footer />
          </>
        )}

        {/* Landing welcome overlay */}
        {showLandingWelcome && (
          <LandingWelcomeOverlay onContinue={dismissLandingWelcome} />
        )}

        {isAdmin(profile?.email ?? session?.user?.email, profile?.phone ?? session?.user?.phone) && <AdminPanel />}

        {!session?.user && (
          <WelcomeModal
            open={welcomeOpen}
            onClose={() => setWelcomeOpen(false)}
            onSignUp={openSignUp}
            onLogin={openLogin}
          />
        )}

        {!session?.user && (
          <EngagementPopup onSignUp={openSignUp} onLogin={openLogin} />
        )}

        <ShareGatePopup generationCount={generationCount} userId={session?.user?.id ?? null} />

        <AuthModal
          open={authOpen}
          initialMode={authMode}
          onClose={() => setAuthOpen(false)}
          onAuthed={() => {
            setAuthOpen(false);
            setWelcomeOpen(false);
            setTab('gerador');
            setLandingState('app');
          }}
        />

        {session?.user && profile && (
          <PinGate
            profile={profile}
            onUnlocked={() => setPinUnlocked(true)}
            onSignOut={handleSignOut}
          />
        )}
      </div>
    </SettingsProvider>
  );
}

function LandingWelcomeOverlay({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/80 backdrop-blur-xl">
      <div className="text-center px-6 animate-welcome-in">
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 rounded-2xl bg-aura-gradient blur-xl opacity-50" />
          <div className="relative w-16 h-16 rounded-2xl bg-aura-gradient flex items-center justify-center shadow-lg shadow-aura-slate/40">
            <AuraLogo className="w-8 h-8" />
          </div>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-slate-300 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-aura-zinc" />
          AI-powered replies
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
          Welcome to Aura.
        </h2>
        <p className="text-slate-400 max-w-sm mx-auto mb-8">
          Your next conversation starts here.
        </p>
        <button
          onClick={onContinue}
          className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl text-base font-semibold text-white btn-gradient transition-all duration-300 hover:scale-[1.02]"
        >
          Get started
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

function Footer() {
  const { language } = useSettings();
  return (
    <footer className="max-w-6xl mx-auto px-6 py-8 text-center">
      <p className="text-xs text-slate-600">{translate(language, 'footer.text')}</p>
    </footer>
  );
}

function SEOManager({ tab, area: override }: { tab: TabId; area?: 'landing' }) {
  const { language } = useSettings();
  useEffect(() => {
    const area: PageArea = override === 'landing' ? 'public' : tab === 'perfil' ? 'private' : 'public';
    updateSEO(language, area);
  }, [language, tab, override]);
  return null;
}
