import { Wand2, Wand, Lightbulb, UserCircle, LogIn, UserRound, LogOut, Menu, X } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import type { TabId } from '@/types';
import { useSettings } from '@/lib/settings';
import { translate, type TranslationKey } from '@/lib/i18n';
import AuraLogo from './AuraLogo';

type Props = {
  active: TabId;
  onChange: (tab: TabId) => void;
  user: { displayName: string | null; firstName: string | null } | null;
  onLogin: () => void;
  onSignUp: () => void;
  onSignOut: () => void;
  onHome: () => void;
};

const TAB_DEFS: { id: TabId; tKey: TranslationKey; icon: typeof Wand2 }[] = [
  { id: 'gerador', tKey: 'nav.gerador', icon: Wand2 },
  { id: 'melhorar', tKey: 'nav.melhorar', icon: Wand },
  { id: 'dicas', tKey: 'nav.dicas', icon: Lightbulb },
  { id: 'perfil', tKey: 'nav.perfil', icon: UserCircle },
];

export default function TopNav({ active, onChange, user, onLogin, onSignUp, onSignOut, onHome }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { language } = useSettings();
  const TABS = useMemo(() => TAB_DEFS.map((t) => ({ id: t.id, label: translate(language, t.tKey), icon: t.icon })), [language]);

  // Close mobile menu whenever the user state changes (login, logout, account switch)
  useEffect(() => {
    setMenuOpen(false);
  }, [user]);

  // Close menu on Escape key
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-5">
        <div className="glass rounded-2xl px-4 sm:px-5 py-3 flex items-center gap-4">
          {/* Brand */}
          <button
            onClick={onHome}
            className="flex items-center gap-2.5 shrink-0 md:ml-2 group cursor-pointer"
            aria-label="Aura — início"
          >
            <div className="relative w-9 h-9 rounded-xl bg-aura-gradient flex items-center justify-center shadow-lg shadow-aura-slate/30 transition-transform group-hover:scale-105">
              <AuraLogo className="w-5 h-5" />
            </div>
            <div className="leading-tight text-left">
              <p className="font-display font-bold text-white text-base tracking-tight">Aura AI</p>
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">{translate(language, 'nav.brandTag')}</p>
            </div>
          </button>

          {/* Desktop tabs */}
          <nav className="ml-auto hidden md:flex items-center gap-1 bg-ink-800/50 border border-white/[0.06] rounded-xl p-1">
            {TABS.map((t) => {
              const Icon = t.icon;
              const isActive = active === t.id;
              return (
                <button
                  key={t.id}
                  data-tab={t.id}
                  onClick={() => onChange(t.id)}
                  className={`relative inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-lg bg-aura-gradient opacity-90 -z-10" />
                  )}
                  <Icon className="w-4 h-4" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Auth (desktop) */}
          <div className="hidden md:flex items-center gap-2 shrink-0 relative">
            {user ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="w-6 h-6 rounded-lg bg-aura-gradient flex items-center justify-center">
                    <UserRound className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-sm text-slate-200 max-w-[140px] truncate">
                    {user.firstName || user.displayName || translate(language, 'nav.user')}
                  </span>
                </div>
                <button
                  onClick={onSignOut}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium text-slate-300 bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] hover:text-white transition"
                >
                  <LogOut className="w-4 h-4" />
                  {translate(language, 'nav.sair')}
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={onLogin}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium text-slate-200 bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] transition"
                >
                  <LogIn className="w-4 h-4" />
                  {translate(language, 'nav.entrar')}
                </button>
                <button
                  onClick={onSignUp}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-semibold text-white btn-gradient transition"
                >
                  {translate(language, 'nav.criarConta')}
                </button>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="ml-auto md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-slate-300 bg-white/[0.04] border border-white/10"
            aria-label={translate(language, 'common.menu')}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile backdrop */}
        {menuOpen && (
          <div
            className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
        )}

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden fixed top-[76px] left-0 right-0 z-40 px-4 animate-fade-up">
            <div className="glass rounded-2xl p-3 space-y-2">
            {TABS.map((t) => {
              const Icon = t.icon;
              const isActive = active === t.id;
              return (
                <button
                  key={t.id}
                  data-tab={t.id}
                  onClick={() => {
                    onChange(t.id);
                    setMenuOpen(false);
                  }}
                  className={`w-full inline-flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? 'text-white bg-aura-gradient'
                      : 'text-slate-300 bg-white/[0.03] hover:bg-white/[0.06]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {t.label}
                </button>
              );
            })}
            <div className="pt-2 border-t border-white/10 space-y-2">
              {user ? (
                <>
                  <div className="flex items-center gap-2 px-3 py-2 text-sm text-slate-300">
                    <UserRound className="w-4 h-4 text-aura-zinc" />
                    {user.firstName || user.displayName || translate(language, 'nav.user')}
                  </div>
                  <button
                    onClick={() => {
                      onSignOut();
                      setMenuOpen(false);
                    }}
                    className="w-full inline-flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 bg-white/[0.03] hover:bg-white/[0.06] transition"
                  >
                    <LogOut className="w-4 h-4" />
                    {translate(language, 'nav.sair')}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      onLogin();
                      setMenuOpen(false);
                    }}
                    className="w-full inline-flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-200 bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] transition"
                  >
                    <LogIn className="w-4 h-4" />
                    {translate(language, 'nav.entrar')}
                  </button>
                  <button
                    onClick={() => {
                      onSignUp();
                      setMenuOpen(false);
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-white btn-gradient transition"
                  >
                    {translate(language, 'nav.criarConta')}
                  </button>
                </>
              )}
            </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
