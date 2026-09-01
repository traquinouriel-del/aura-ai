import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Sparkles, X, UserPlus, LogIn } from 'lucide-react';
import { useSettings } from '@/lib/settings';
import { translate, type TranslationKey } from '@/lib/i18n';
import { useExitAnimation } from '@/lib/useExitAnimation';

type Props = {
  onSignUp: () => void;
  onLogin: () => void;
};

const DISMISS_KEY = 'aura.engagement_dismissed_at';
const THREE_MINUTES_MS = 3 * 60 * 1000;
const ONE_HOUR_MS = 60 * 60 * 1000;

export default function EngagementPopup({ onSignUp, onLogin }: Props) {
  const { language } = useSettings();
  const t = (k: TranslationKey) => translate(language, k);
  const [visible, setVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let dismissedAt: number | null = null;
    try {
      const raw = localStorage.getItem(DISMISS_KEY);
      if (raw) dismissedAt = parseInt(raw, 10);
    } catch {
      /* ignore */
    }

    if (dismissedAt && Date.now() - dismissedAt < ONE_HOUR_MS) return;

    const start = Date.now();
    const interval = setInterval(() => {
      if (Date.now() - start >= THREE_MINUTES_MS) {
        setVisible(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const close = () => {
    setVisible(false);
    try {
      localStorage.setItem(DISMISS_KEY, Date.now().toString());
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    if (!visible) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) close();
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [visible]);

  const { mounted, exiting } = useExitAnimation(visible, 250);

  if (!mounted || typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className={`absolute inset-0 bg-black/70 backdrop-blur-sm ${exiting ? 'animate-fade-out-backdrop' : 'animate-fade-up'}`} />
      <div
        ref={cardRef}
        className={`relative w-full max-w-md glass-strong rounded-2xl p-6 sm:p-8 shadow-2xl ${exiting ? 'animate-fade-out' : 'animate-fade-up'}`}
      >
        <button
          onClick={close}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition"
          aria-label={t('common.close')}
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-aura-gradient flex items-center justify-center mx-auto mb-4 shadow-lg shadow-aura-slate/30">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <h2 className="font-display text-2xl font-bold text-white mb-2">
            {t('popup.title')}
          </h2>
          <p className="text-sm text-slate-400 mb-6 max-w-sm mx-auto">
            {t('popup.subtitle')}
          </p>

          <div className="space-y-3">
            <button
              onClick={() => { close(); onSignUp(); }}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white btn-gradient transition hover:scale-[1.02] active:scale-[0.98]"
            >
              <UserPlus className="w-4 h-4" />
              {t('popup.createAccount')}
            </button>
            <button
              onClick={() => { close(); onLogin(); }}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white bg-white/5 border border-white/10 hover:bg-white/10 transition"
            >
              <LogIn className="w-4 h-4" />
              {t('popup.login')}
            </button>
            <button
              onClick={close}
              className="w-full py-2 text-sm text-slate-400 hover:text-slate-300 transition"
            >
              {t('popup.continueGuest')}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
