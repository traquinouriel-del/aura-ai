import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X, Share2, MessageCircle, Send, Instagram, Copy, Check } from 'lucide-react';
import { useSettings } from '@/lib/settings';
import { translate, type TranslationKey } from '@/lib/i18n';
import { supabase } from '@/lib/supabase';
import { copyToClipboard } from '@/lib/clipboard';
import { useExitAnimation } from '@/lib/useExitAnimation';
import { SHARE_URL } from '@/lib/config';

const SHARE_THRESHOLD = 4;
const REQUIRED_SHARES = 10;
const STORAGE_KEY = 'aura.share_gate';
const SHARED_CONTACTS_KEY = 'aura.shared_contacts';

type Props = {
  generationCount: number;
  userId: string | null;
};

export default function ShareGatePopup({ generationCount, userId }: Props) {
  const { language } = useSettings();
  const t = (k: TranslationKey) => translate(language, k);
  const [visible, setVisible] = useState(false);
  const [sharesCompleted, setSharesCompleted] = useState(0);
  const [copied, setCopied] = useState(false);
  const [inviteCode, setInviteCode] = useState<string>('');
  const [inviteUrl, setInviteUrl] = useState<string>('');
  const [sharedContacts, setSharedContacts] = useState<Set<string>>(new Set());
  const [dismissed, setDismissed] = useState(false);
  const prevCountRef = useRef<number>(generationCount);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setVisible(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [visible]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        setSharesCompleted(data.sharesCompleted ?? 0);
      }
      const contactsRaw = localStorage.getItem(SHARED_CONTACTS_KEY);
      if (contactsRaw) {
        setSharedContacts(new Set(JSON.parse(contactsRaw)));
      }
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    const prevCount = prevCountRef.current;
    prevCountRef.current = generationCount;
    if (
      generationCount > prevCount &&
      generationCount > 0 &&
      generationCount % SHARE_THRESHOLD === 0 &&
      sharesCompleted < REQUIRED_SHARES &&
      !dismissed
    ) {
      setVisible(true);
    }
  }, [generationCount, sharesCompleted, dismissed]);

  useEffect(() => {
    if (!userId) {
      const fallback = `guest-${Math.random().toString(36).slice(2, 10)}`;
      setInviteCode(fallback);
      setInviteUrl(`${SHARE_URL}/?ref=${fallback}`);
      return;
    }
    const code = userId.slice(0, 8);
    setInviteCode(code);
    setInviteUrl(`${SHARE_URL}/?ref=${code}`);
  }, [userId]);

  const recordShare = useCallback((platform: string, contactId?: string) => {
    if (contactId) {
      if (sharedContacts.has(contactId)) return;
      const nextContacts = new Set(sharedContacts);
      nextContacts.add(contactId);
      setSharedContacts(nextContacts);
      try {
        localStorage.setItem(SHARED_CONTACTS_KEY, JSON.stringify([...nextContacts]));
      } catch { /* ignore */ }
    }
    const next = Math.min(sharesCompleted + 1, REQUIRED_SHARES);
    setSharesCompleted(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ sharesCompleted: next }));
    } catch { /* ignore */ }
    if (userId) {
      supabase.from('aura_invite_shares').insert({
        inviter_id: userId,
        platform,
        invite_code: inviteCode,
      }).then(() => {});
    }
  }, [sharesCompleted, userId, inviteCode, sharedContacts]);

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`${t('profile.shareText')} ${inviteUrl}`);
    window.open(`https://wa.me/?text=${text}`, '_blank', 'noopener,noreferrer');
    recordShare('whatsapp', `wa-${Date.now()}`);
  };

  const handleTelegram = () => {
    const text = encodeURIComponent(t('profile.shareText'));
    window.open(`https://t.me/share/url?url=${encodeURIComponent(inviteUrl)}&text=${text}`, '_blank', 'noopener,noreferrer');
    recordShare('telegram', `tg-${Date.now()}`);
  };

  const handleInstagram = async () => {
    await copyToClipboard(`${t('profile.shareText')} ${inviteUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer');
    recordShare('instagram', `ig-${Date.now()}`);
  };

  const handleCopyLink = async () => {
    const ok = await copyToClipboard(inviteUrl);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      recordShare('copy', `copy-${Date.now()}`);
    }
  };

  const close = useCallback(() => {
    setVisible(false);
    setDismissed(true);
  }, []);
  void close;

  const canClose = true;
  const progress = Math.round((sharesCompleted / REQUIRED_SHARES) * 100);

  const { mounted, exiting } = useExitAnimation(visible, 250);

  if (!mounted || typeof document === 'undefined') return null;

  const platforms = [
    { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle, onClick: handleWhatsApp, color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
    { id: 'telegram', label: 'Telegram', icon: Send, onClick: handleTelegram, color: 'bg-sky-500/15 text-sky-400 border-sky-500/30' },
    { id: 'instagram', label: 'Instagram', icon: Instagram, onClick: handleInstagram, color: 'bg-zinc-500/15 text-zinc-400 border-zinc-500/30' },
    { id: 'copy', label: copied ? t('common.copied') : t('common.copy'), icon: copied ? Check : Copy, onClick: handleCopyLink, color: 'bg-aura-slate/15 text-aura-slate border-aura-slate/30' },
  ];

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className={`absolute inset-0 bg-black/80 backdrop-blur-md ${exiting ? 'animate-fade-out-backdrop' : 'animate-fade-up'}`} />
      <div
        ref={cardRef}
        className={`relative w-full max-w-lg glass-strong rounded-3xl p-6 sm:p-8 shadow-2xl border-aura-zinc/20 ${exiting ? 'animate-fade-out' : 'animate-fade-up'}`}
      >
        <button
          onClick={() => setVisible(false)}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition"
          aria-label={t('common.close')}
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-aura-gradient flex items-center justify-center mx-auto mb-4 shadow-lg shadow-aura-slate/30">
            <Share2 className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-display text-2xl font-bold text-white mb-2">
            {t('shareGate.title')}
          </h2>
          <p className="text-sm text-slate-400 mb-5 max-w-sm mx-auto">
            {t('shareGate.subtitle')}
          </p>

          <div className="mb-5">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>{t('shareGate.progress')}</span>
              <span className="font-semibold text-aura-zinc">{sharesCompleted}/{REQUIRED_SHARES}</span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-aura-gradient transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-5">
            {platforms.map((p) => {
              const Icon = p.icon;
              return (
                <button
                  key={p.id}
                  onClick={p.onClick}
                  className={`inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold border transition hover:scale-[1.02] active:scale-[0.98] ${p.color}`}
                >
                  <Icon className="w-4 h-4" />
                  {p.label}
                </button>
              );
            })}
          </div>

          <div className="rounded-xl bg-white/[0.03] border border-white/10 p-3 mb-4">
            <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1.5">{t('shareGate.yourLink')}</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-xs text-slate-300 truncate font-mono">{inviteUrl}</code>
              <button
                onClick={handleCopyLink}
                className="shrink-0 p-1.5 rounded-lg text-slate-400 hover:text-aura-zinc hover:bg-white/5 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {!canClose && (
            <p className="text-xs text-slate-500 flex items-center justify-center gap-1.5">
              {t('shareGate.locked')}
            </p>
          )}
          {canClose && (
            <p className="text-xs text-emerald-400 font-medium">
              {t('shareGate.unlocked')}
            </p>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
