import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Lock, Loader2, AlertCircle, ShieldCheck, LogOut, KeyRound } from 'lucide-react';
import { supabase, type Profile } from '@/lib/supabase';
import { verifyPin, setPin as setUserPin } from '@/lib/pin';
import { useSettings } from '@/lib/settings';
import { translate, type TranslationKey } from '@/lib/i18n';
import { useExitAnimation } from '@/lib/useExitAnimation';

type Props = {
  profile: Profile | null;
  onUnlocked: () => void;
  onSignOut: () => void;
};

export default function PinGate({ profile, onUnlocked, onSignOut }: Props) {
  const { language } = useSettings();
  const t = useMemo(() => (k: TranslationKey) => translate(language, k), [language]);
  const [open, setOpen] = useState(false);
  const [pin, setPin] = useState('');
  // setPin (state) vs setUserPin (lib) — renamed to avoid shadowing
  const [confirmPin, setConfirmPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);
  const [mode, setMode] = useState<'verify' | 'setup'>('verify');
  const inputRef = useRef<HTMLInputElement>(null);
  const unlockedRef = useRef(false);

  const requiresPin = !!profile;

  const unlock = useCallback(() => {
    unlockedRef.current = true;
    setOpen(false);
    setPin('');
    setConfirmPin('');
    setError(null);
    onUnlocked();
  }, [onUnlocked]);

  const lock = useCallback(() => {
    if (!requiresPin) return;
    unlockedRef.current = false;
    setOpen(true);
    setPin('');
    setConfirmPin('');
    setError(null);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [requiresPin]);

  useEffect(() => {
    let mounted = true;
    setChecking(true);
    if (!requiresPin || !profile) {
      setChecking(false);
      unlock();
      return;
    }
    // PIN is optional — only lock if the user already has a pin_hash
    if (profile.pin_hash) {
      setChecking(false);
      setMode('verify');
      lock();
      return () => { mounted = false; };
    }

    // No pin_hash in cache — check DB with 3s timeout
    const queryPromise = supabase
      .from('profiles')
      .select('pin_hash')
      .eq('id', profile.id)
      .maybeSingle();
    const timeoutPromise = new Promise<{ data: null; error: null }>((resolve) =>
      setTimeout(() => resolve({ data: null, error: null }), 3000)
    );
    Promise.race([queryPromise, timeoutPromise])
      .then(({ data }) => {
        if (!mounted) return;
        setChecking(false);
        if (data?.pin_hash) {
          setMode('verify');
          lock();
        } else {
          unlock();
        }
      })
      .catch(() => {
        if (!mounted) return;
        setChecking(false);
        unlock();
      });
    return () => { mounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.id, profile?.pin_hash]);

  // Re-lock on visibility change removed: in iframe/preview environments
  // visibilitychange fires spuriously and constantly re-locks the app,
  // making the UI permanently unclickable. The gate still locks on initial
  // load and whenever the profile changes — which covers the real use case.

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    if (!/^\d{4}$/.test(pin)) {
      setError(t('pin.errorWrong'));
      return;
    }
    setLoading(true);
    setError(null);
    try {
      if (mode === 'setup') {
        if (pin !== confirmPin) {
          setError(t('pin.errorMismatch'));
          setConfirmPin('');
          setTimeout(() => inputRef.current?.focus(), 50);
          return;
        }
        const ok = await setUserPin(profile.id, pin);
        if (ok) {
          unlock();
        } else {
          setError(t('pin.errorGeneric'));
        }
      } else {
        const ok = await verifyPin(profile.id, pin);
        if (ok) {
          unlock();
        } else {
          setError(t('pin.errorWrong'));
          setPin('');
          setTimeout(() => inputRef.current?.focus(), 50);
        }
      }
    } catch {
      setError(t('pin.errorGeneric'));
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = useCallback(async () => {
    onSignOut();
  }, [onSignOut]);

  const { mounted: pinMounted, exiting } = useExitAnimation(open, 250);

  if (checking) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-900">
        <Loader2 className="w-6 h-6 animate-spin text-aura-zinc" />
      </div>
    );
  }

  if (!pinMounted || typeof document === 'undefined') return null;

  const isSetup = mode === 'setup';

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className={`absolute inset-0 bg-black/80 backdrop-blur-md ${exiting ? 'animate-fade-out-backdrop' : 'animate-fade-up'}`} />
      <div className={`relative w-full max-w-sm glass-strong rounded-2xl p-6 sm:p-8 ${exiting ? 'animate-fade-out' : 'animate-fade-up'}`}>
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-aura-gradient flex items-center justify-center mx-auto mb-3 shadow-lg shadow-aura-slate/30">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <h2 className="font-display text-2xl font-bold text-white">
            {isSetup ? t('pin.setupTitle') : t('pin.verifyTitle')}
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            {isSetup ? t('pin.setupSubtitle') : t('pin.verifySubtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              ref={inputRef}
              type="tel"
              inputMode="numeric"
              pattern="\d{4}"
              maxLength={4}
              value={pin}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                setPin(val);
                if (error) setError(null);
              }}
              placeholder="••••"
              autoComplete="off"
              className="w-full bg-ink-800/60 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white text-center tracking-[0.5em] placeholder:text-slate-600 focus:outline-none focus:border-aura-slate/50 focus:ring-2 focus:ring-aura-slate/20 transition"
            />
          </div>

          {isSetup && (
            <div className="relative">
              <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="tel"
                inputMode="numeric"
                pattern="\d{4}"
                maxLength={4}
                value={confirmPin}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                  setConfirmPin(val);
                  if (error) setError(null);
                }}
                placeholder={t('pin.confirmPlaceholder')}
                autoComplete="off"
                className="w-full bg-ink-800/60 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white text-center tracking-[0.5em] placeholder:text-slate-600 focus:outline-none focus:border-aura-slate/50 focus:ring-2 focus:ring-aura-slate/20 transition"
              />
            </div>
          )}

          {error && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm text-red-200">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || pin.length !== 4 || (isSetup && confirmPin.length !== 4)}
            className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white btn-gradient disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {t('auth.processing')}
              </>
            ) : (
              isSetup ? t('pin.setupButton') : t('pin.confirm')
            )}
          </button>
        </form>

        <div className="mt-5 flex flex-col items-center gap-3">
          <p className="text-center text-xs text-slate-500">
            <Lock className="inline w-3 h-3 mr-1 -mt-0.5" />
            {isSetup ? t('pin.setupSubtitle') : t('pin.verifySubtitle')}
          </p>
          <button
            type="button"
            onClick={handleSignOut}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            {t('pin.signOut')}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
