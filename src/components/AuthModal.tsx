import { useMemo, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Mail, Lock, Sparkles, AlertCircle, Loader2, KeyRound, User } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useSettings } from '@/lib/settings';
import { translate, type TranslationKey } from '@/lib/i18n';
import { useExitAnimation } from '@/lib/useExitAnimation';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmailFormat(email: string): boolean {
  return EMAIL_RE.test(email.trim());
}

function getDeviceFingerprint(): string {
  const KEY = 'aura_device_fp';
  let fp = localStorage.getItem(KEY);
  if (!fp) {
    const components = [
      navigator.userAgent,
      navigator.language,
      screen.width + 'x' + screen.height,
      new Date().getTimezoneOffset().toString(),
      Math.random().toString(36).slice(2),
    ];
    fp = components.join('|');
    localStorage.setItem(KEY, fp);
  }
  return fp;
}

async function checkDeviceLimit(): Promise<{ allowed: boolean; count: number }> {
  try {
    const fp = getDeviceFingerprint();
    const { count } = await supabase
      .from('device_registrations')
      .select('id', { count: 'exact', head: true })
      .eq('device_fingerprint', fp);
    return { allowed: (count ?? 0) < 3, count: count ?? 0 };
  } catch {
    return { allowed: true, count: 0 };
  }
}

async function recordDeviceRegistration(userId: string): Promise<void> {
  try {
    const fp = getDeviceFingerprint();
    await supabase.from('device_registrations').insert({
      device_fingerprint: fp,
      user_id: userId,
      user_agent: navigator.userAgent,
    });
  } catch {
    // best-effort
  }
}

type Props = {
  open: boolean;
  initialMode: 'login' | 'signup';
  onClose: () => void;
  onAuthed: () => void;
};

export default function AuthModal({ open, initialMode, onClose, onAuthed }: Props) {
  const { language } = useSettings();
  const t = useMemo(() => (k: TranslationKey) => translate(language, k), [language]);
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [emailTouched, setEmailTouched] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordValid, setPasswordValid] = useState(true);

  useEffect(() => {
    if (open) setMode(initialMode);
  }, [open, initialMode]);

  const { mounted, exiting } = useExitAnimation(open, 250);

  if (!mounted || typeof document === 'undefined') return null;

  const reset = () => {
    setEmail('');
    setPassword('');
    setFirstName('');
    setError(null);
    setFieldError(null);
    setEmailTouched(false);
    setEmailValid(true);
    setPasswordTouched(false);
    setPasswordValid(true);
    setLoading(false);
  };

  const close = () => {
    reset();
    onClose();
  };

  const validateEmail = (value: string): string | null => {
    if (!value.trim()) return t('auth.errorEmpty');
    if (!isValidEmailFormat(value)) return t('auth.errorInvalidEmail');
    return null;
  };

  const validatePassword = (value: string): string | null => {
    if (!value) return t('auth.errorEmpty');
    if (value.length < 6) return t('auth.errorPasswordShort');
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFieldError(null);
    setEmailTouched(true);
    setPasswordTouched(true);

    const emailErr = validateEmail(email);
    if (emailErr) {
      setEmailValid(false);
      setFieldError(emailErr);
      return;
    }
    setEmailValid(true);

    const passErr = validatePassword(password);
    if (passErr) {
      setPasswordValid(false);
      setFieldError(passErr);
      return;
    }
    setPasswordValid(true);

    setLoading(true);
    try {
      if (mode === 'signup') {
        const { allowed } = await checkDeviceLimit();
        if (!allowed) {
          setError(t('auth.errorDeviceLimit'));
          return;
        }

        const { data: existing } = await supabase
          .from('profiles')
          .select('id')
          .eq('email', email.trim().toLowerCase())
          .maybeSingle();

        if (existing) {
          setError(t('auth.errorAlreadyRegistered'));
          return;
        }

        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              first_name: firstName.trim() || null,
              display_name: firstName.trim() || null,
            },
          },
        });

        if (signUpError) {
          const msg = signUpError.message.toLowerCase();
          if (msg.includes('already') || msg.includes('registered')) {
            setError(t('auth.errorAlreadyRegistered'));
          } else if (msg.includes('rate') || msg.includes('limit')) {
            setError(t('auth.errorTooMany'));
          } else {
            setError(signUpError.message);
          }
          return;
        }

        if (signUpData.user) {
          // Capture referral code from URL if present
          try {
            const urlParams = new URLSearchParams(window.location.search);
            const refCode = urlParams.get('ref');
            let referredById: string | null = null;
            if (refCode) {
              const { data: inviter } = await supabase
                .from('profiles')
                .select('id')
                .eq('referral_code', refCode)
                .maybeSingle();
              if (inviter) referredById = inviter.id;
            }
            await supabase.from('profiles').upsert({
              id: signUpData.user.id,
              email: email.trim().toLowerCase(),
              display_name: firstName.trim() || null,
              first_name: firstName.trim() || null,
              referral_code: signUpData.user.id.slice(0, 8),
              referred_by: referredById,
            }, { onConflict: 'id' });
            if (referredById) {
              await supabase.from('aura_invite_shares').update({
                invitee_id: signUpData.user.id,
                joined_at: new Date().toISOString(),
              }).eq('inviter_id', referredById).is('invitee_id', null).limit(1);
            }
          } catch { /* ignore referral errors */ }

          await recordDeviceRegistration(signUpData.user.id);

          // Cache profile immediately
          try {
            const cacheKey = `aura_profile_${signUpData.user.id}`;
            const cachedProfile = {
              id: signUpData.user.id,
              email: email.trim(),
              display_name: firstName.trim() || null,
              first_name: firstName.trim() || null,
              phone: null,
              pin_hash: null,
              theme: 'dark' as const,
              language: language,
            };
            localStorage.setItem(cacheKey, JSON.stringify(cachedProfile));
          } catch { /* ignore */ }
        }

        // Sign in immediately after signup
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (signInError) {
          setError(signInError.message);
          return;
        }

        reset();
        onAuthed();
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (signInError) {
          const msg = signInError.message.toLowerCase();
          if (msg.includes('invalid') || msg.includes('credentials')) {
            setError(t('auth.errorInvalidCredentials'));
          } else if (msg.includes('email') && msg.includes('confirm')) {
            setError(t('auth.errorEmailNotConfirmed'));
          } else if (msg.includes('rate') || msg.includes('limit')) {
            setError(t('auth.errorTooMany'));
          } else {
            setError(signInError.message);
          }
          return;
        }
        reset();
        onAuthed();
      }
    } catch {
      setError(t('auth.errorGeneric'));
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode(mode === 'signup' ? 'login' : 'signup');
    setError(null);
    setFieldError(null);
    setEmailTouched(false);
    setEmailValid(true);
    setPasswordTouched(false);
    setPasswordValid(true);
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className={`absolute inset-0 bg-black/70 backdrop-blur-sm ${exiting ? 'animate-fade-out-backdrop' : 'animate-fade-up'}`} onClick={close} />
      <div className={`relative w-full max-w-md glass-strong rounded-2xl p-6 sm:p-8 ${exiting ? 'animate-fade-out' : 'animate-fade-up'}`}>
        <button
          onClick={close}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition"
          aria-label={t('common.close')}
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-aura-gradient flex items-center justify-center mx-auto mb-3 shadow-lg shadow-aura-slate/30">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="font-display text-2xl font-bold text-white">
            {mode === 'signup' ? t('auth.signupTitle') : t('auth.loginTitle')}
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            {mode === 'signup' ? t('auth.signupSubtitle') : t('auth.loginSubtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder={t('auth.firstNamePlaceholder')}
                required
                autoFocus
                className="w-full bg-ink-800/60 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-aura-slate/50 focus:ring-2 focus:ring-aura-slate/20 transition"
              />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => {
                const val = e.target.value;
                setEmail(val);
                if (emailTouched) {
                  const err = validateEmail(val);
                  setEmailValid(!err);
                }
              }}
              onBlur={() => {
                setEmailTouched(true);
                if (email.trim()) {
                  const err = validateEmail(email);
                  setEmailValid(!err);
                }
              }}
              placeholder={t('auth.emailPlaceholder')}
              autoComplete="email"
              required
              className={`w-full bg-ink-800/60 border rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 transition ${
                emailTouched && !emailValid
                  ? 'border-red-500/50 focus:border-red-500/70 focus:ring-red-500/20'
                  : 'border-white/10 focus:border-aura-slate/50 focus:ring-aura-slate/20'
              }`}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="password"
              value={password}
              onChange={(e) => {
                const val = e.target.value;
                setPassword(val);
                if (passwordTouched) {
                  const err = validatePassword(val);
                  setPasswordValid(!err);
                }
              }}
              onBlur={() => {
                setPasswordTouched(true);
                const err = validatePassword(password);
                setPasswordValid(!err);
              }}
              placeholder={t('auth.passwordPlaceholder')}
              autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
              required
              className={`w-full bg-ink-800/60 border rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 transition ${
                passwordTouched && !passwordValid
                  ? 'border-red-500/50 focus:border-red-500/70 focus:ring-red-500/20'
                  : 'border-white/10 focus:border-aura-slate/50 focus:ring-aura-slate/20'
              }`}
            />
          </div>
          {fieldError && (
            <p className="text-xs text-red-400 -mt-2 ml-1">{fieldError}</p>
          )}
          {emailTouched && !emailValid && !fieldError && (
            <p className="text-xs text-red-400 -mt-2 ml-1">{t('auth.errorInvalidEmail')}</p>
          )}
          {passwordTouched && !passwordValid && !fieldError && (
            <p className="text-xs text-red-400 -mt-2 ml-1">{t('auth.errorPasswordShort')}</p>
          )}
          {error && !fieldError && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm text-red-200">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white btn-gradient disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {t('auth.processing')}
              </>
            ) : (
              <>
                <KeyRound className="w-4 h-4" />
                {mode === 'signup' ? t('auth.signup') : t('auth.login')}
              </>
            )}
          </button>
        </form>

        <p className="text-center text-sm text-slate-400 mt-4">
          {mode === 'signup' ? t('auth.haveAccount') : t('auth.noAccount')}{' '}
          <button
            onClick={switchMode}
            className="text-aura-zinc hover:text-aura-slate font-medium transition"
          >
            {mode === 'signup' ? t('auth.login') : t('auth.signup')}
          </button>
        </p>
      </div>
    </div>,
    document.body,
  );
}
