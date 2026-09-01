import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Sparkles, X, UserPlus, LogIn } from 'lucide-react';
import { useSettings } from '@/lib/settings';
import { translate, type TranslationKey } from '@/lib/i18n';
import { useExitAnimation } from '@/lib/useExitAnimation';

type Props = {
  open: boolean;
  onClose: () => void;
  onSignUp: () => void;
  onLogin: () => void;
};

const SEEN_KEY = 'aura.welcome_seen';

export default function WelcomeModal({ open, onClose, onSignUp, onLogin }: Props) {
  const { language } = useSettings();
  const t = (k: TranslationKey) => translate(language, k);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    try {
      localStorage.setItem(SEEN_KEY, Date.now().toString());
    } catch {
      /* ignore */
    }
    const handleClickOutside = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) onClose();
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, onClose]);

  const { mounted, exiting } = useExitAnimation(open, 250);

  if (!mounted || typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className={`absolute inset-0 bg-black/70 backdrop-blur-sm ${exiting ? 'animate-fade-out-backdrop' : 'animate-fade-up'}`} />
      <div
        ref={cardRef}
        className={`relative w-full max-w-md glass-strong rounded-2xl p-6 sm:p-8 shadow-2xl ${exiting ? 'animate-fade-out' : 'animate-fade-up'}`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition"
          aria-label={t('common.close')}
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-aura-gradient flex items-center justify-center mx-auto mb-5 shadow-lg shadow-aura-slate/30">
            <Sparkles className="w-8 h-8 text-white" />
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-bold leading-tight text-white mb-3">
            {t('welcome.headline')}
          </h2>
          <p className="text-sm text-slate-400 mb-7 max-w-sm mx-auto leading-relaxed">
            {t('welcome.subtitle')}
          </p>

          <div className="space-y-3">
            <button
              onClick={() => { onClose(); onSignUp(); }}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-white btn-gradient transition hover:scale-[1.02] active:scale-[0.98]"
            >
              <UserPlus className="w-4 h-4" />
              {t('welcome.createAccount')}
            </button>
            <button
              onClick={() => { onClose(); onLogin(); }}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-white bg-white/5 border border-white/10 hover:bg-white/10 transition"
            >
              <LogIn className="w-4 h-4" />
              {t('welcome.login')}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
