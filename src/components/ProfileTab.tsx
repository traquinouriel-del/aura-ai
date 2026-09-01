import { useEffect, useState, useCallback, useMemo } from 'react';
import {
  UserCircle,
  Mail,
  Lock,
  Heart,
  Plus,
  Trash2,
  Pencil,
  Loader2,
  AlertCircle,
  Moon,
  Sun,
  Globe,
  X,
  Brain,
  Lightbulb,
  Wand2,
  Shield,
  Share2,
  Check,
  Link2,
  MessageCircle,
  Send,
  Instagram,
} from 'lucide-react';
import type { Session } from '@supabase/supabase-js';
import { supabase, type Profile } from '@/lib/supabase';
import { useSettings, type Language, type ThemeMode } from '@/lib/settings';
import { translate, LANGUAGES, type TranslationKey } from '@/lib/i18n';
import { setPin, clearPin } from '@/lib/pin';
import { SHARE_URL } from '@/lib/config';
import { copyToClipboard } from '@/lib/clipboard';
import ConfirmModal from './ConfirmModal';

type Suitor = {
  id: string;
  name: string;
  notes: string | null;
  status: string;
  created_at: string;
};

type Props = {
  session: Session | null;
  profile: Profile | null;
  onLogin: () => void;
  onSignUp: () => void;
  onProfileUpdate?: (patch: Partial<Profile>) => void;
};

const STATUS_KEYS: Record<string, TranslationKey> = {
  a_falar: 'profile.statusTalking',
  a_flertar: 'profile.statusFlirting',
  encontros: 'profile.statusDating',
  fria: 'profile.statusCold',
  conquistada: 'profile.statusWon',
  perdida: 'profile.statusLost',
};

const STATUS_VALUES = ['a_falar', 'a_flertar', 'encontros', 'fria', 'conquistada', 'perdida'];

export default function ProfileTab({ session, profile, onLogin, onSignUp, onProfileUpdate }: Props) {
  const { theme, language, setTheme, setLanguage } = useSettings();
  const t = useMemo(() => (k: TranslationKey) => translate(language, k), [language]);

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [savingAccount, setSavingAccount] = useState(false);
  const [accountMsg, setAccountMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  const [suitors, setSuitors] = useState<Suitor[]>([]);
  const [loadingSuitors, setLoadingSuitors] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [suitorName, setSuitorName] = useState('');
  const [suitorNotes, setSuitorNotes] = useState('');
  const [suitorStatus, setSuitorStatus] = useState('a_falar');
  const [suitorSaving, setSuitorSaving] = useState(false);

  const [pretendenteName, setPretendenteName] = useState('');
  const [pretendenteVinculo, setPretendenteVinculo] = useState('');
  const [pretendenteLoading, setPretendenteLoading] = useState(false);
  const [pretendenteError, setPretendenteError] = useState<string | null>(null);
  const [savedReports, setSavedReports] = useState<Array<{ id: string; name: string; vinculo: string | null; perfil_psicologico: string | null; dicas_abordagem: string | null; created_at: string }>>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // PIN state
  const [pinEnabled, setPinEnabled] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [pinSaving, setPinSaving] = useState(false);
  const [pinMsg, setPinMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  useEffect(() => {
    if (!session?.user) {
      setPinEnabled(false);
      return;
    }
    supabase
      .from('profiles')
      .select('pin_hash')
      .eq('id', session.user.id)
      .maybeSingle()
      .then(({ data }) => {
        setPinEnabled(!!data?.pin_hash);
      });
  }, [session]);

  useEffect(() => {
    setFirstName(profile?.first_name ?? '');
    setEmail(profile?.email ?? session?.user?.email ?? '');
  }, [profile, session]);

  const loadSuitors = useCallback(async () => {
    if (!session?.user) {
      setSuitors([]);
      setLoadingSuitors(false);
      return;
    }
    setLoadingSuitors(true);
    const query = supabase
      .from('suitors')
      .select('id, name, notes, status, created_at')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });
    const timeout = new Promise<{ data: null; error: { message: string } }>((resolve) =>
      setTimeout(() => resolve({ data: null, error: { message: 'timeout' } }), 5000)
    );
    const { data, error } = await Promise.race([query, timeout]);
    if (!error && data) setSuitors(data as Suitor[]);
    setLoadingSuitors(false);
  }, [session]);

  useEffect(() => {
    void loadSuitors();
  }, [loadSuitors]);

  const handleSaveAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setAccountMsg(null);
    if (!session?.user) return;
    setSavingAccount(true);
    try {
      const trimmedName = firstName.trim();
      const profilePatch = trimmedName
        ? { display_name: trimmedName, first_name: trimmedName }
        : {};
      supabase
        .from('profiles')
        .update(profilePatch)
        .eq('id', session.user.id)
        .then(({ error: profError }) => {
          if (profError) {
            setAccountMsg({ type: 'err', text: profError.message });
          } else {
            const patch = profilePatch;
            try {
              const cacheKey = `aura_profile_${session.user.id}`;
              const cached = localStorage.getItem(cacheKey);
              if (cached) {
                const parsed = JSON.parse(cached);
                Object.assign(parsed, patch);
                localStorage.setItem(cacheKey, JSON.stringify(parsed));
              }
            } catch { /* ignore */ }
            onProfileUpdate?.(patch);
          }
        });

      if (newPassword) {
        if (newPassword.length < 6) {
          setAccountMsg({ type: 'err', text: t('profile.errorPasswordShort') });
          setSavingAccount(false);
          return;
        }
        const { error: pwError } = await supabase.auth.updateUser({ password: newPassword });
        if (pwError) throw pwError;
        setNewPassword('');
      }

      setAccountMsg({ type: 'ok', text: t('profile.saved') });
    } catch (err) {
      setAccountMsg({
        type: 'err',
        text: err instanceof Error ? err.message : t('profile.errorGeneric'),
      });
    } finally {
      setSavingAccount(false);
    }
  };

  const resetSuitorForm = () => {
    setSuitorName('');
    setSuitorNotes('');
    setSuitorStatus('a_falar');
    setEditingId(null);
    setShowForm(false);
  };

  const handleSavePin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) return;
    setPinMsg(null);

    if (!/^\d{4}$/.test(newPin)) {
      setPinMsg({ type: 'err', text: t('profile.pinErrorDigits') });
      return;
    }
    if (newPin !== confirmPin) {
      setPinMsg({ type: 'err', text: t('profile.pinErrorMatch') });
      return;
    }

    setPinSaving(true);
    try {
      const ok = await setPin(session.user.id, newPin);
      if (ok) {
        setPinEnabled(true);
        setNewPin('');
        setConfirmPin('');
        setPinMsg({ type: 'ok', text: t('profile.pinSaved') });
      } else {
        setPinMsg({ type: 'err', text: t('profile.errorGeneric') });
      }
    } catch {
      setPinMsg({ type: 'err', text: t('profile.errorGeneric') });
    } finally {
      setPinSaving(false);
    }
  };

  const handleClearPin = async () => {
    if (!session?.user) return;
    setPinSaving(true);
    setPinMsg(null);
    try {
      const ok = await clearPin(session.user.id);
      if (ok) {
        setPinEnabled(false);
        setNewPin('');
        setConfirmPin('');
        setPinMsg({ type: 'ok', text: t('profile.pinRemoved') });
      } else {
        setPinMsg({ type: 'err', text: t('profile.errorGeneric') });
      }
    } finally {
      setPinSaving(false);
    }
  };

  const handleSaveSuitor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user || !suitorName.trim()) return;
    setSuitorSaving(true);
    try {
      if (editingId) {
        const { error } = await supabase
          .from('suitors')
          .update({
            name: suitorName.trim(),
            notes: suitorNotes.trim() || null,
            status: suitorStatus,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('suitors').insert({
          user_id: session.user.id,
          name: suitorName.trim(),
          notes: suitorNotes.trim() || null,
          status: suitorStatus,
        });
        if (error) throw error;
      }
      resetSuitorForm();
      void loadSuitors();
    } catch (err) {
      setAccountMsg({
        type: 'err',
        text: err instanceof Error ? err.message : t('profile.errorGeneric'),
      });
    } finally {
      setSuitorSaving(false);
    }
  };

  const handleEditSuitor = (s: Suitor) => {
    setEditingId(s.id);
    setSuitorName(s.name);
    setSuitorNotes(s.notes ?? '');
    setSuitorStatus(s.status);
    setShowForm(true);
  };

  const handleDeleteSuitor = async (id: string) => {
    const { error } = await supabase.from('suitors').delete().eq('id', id);
    if (!error) setSuitors((prev) => prev.filter((s) => s.id !== id));
  };

  const handleGenerateReport = async () => {
    if (!pretendenteName.trim()) return;
    setPretendenteLoading(true);
    setPretendenteError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setPretendenteError(translate(language, 'sedux.engineBuilding'));
    } catch {
      setPretendenteError(translate(language, 'sedux.engineBuilding'));
    } finally {
      setPretendenteLoading(false);
    }
  };

  const loadSavedReports = useCallback(() => {
    if (!session?.user) {
      setSavedReports([]);
      return;
    }
    supabase
      .from('pretendente_reports')
      .select('id, name, vinculo, perfil_psicologico, dicas_abordagem, created_at')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })
      .limit(20)
      .then(({ data }) => {
        if (data) setSavedReports(data as typeof savedReports);
      });
  }, [session]);

  useEffect(() => {
    loadSavedReports();
  }, [loadSavedReports]);

  const handleLoadReport = (report: typeof savedReports[number]) => {
    setPretendenteName(report.name);
    setPretendenteVinculo(report.vinculo ?? '');
  };

  const handleDeleteReport = async (id: string) => {
    await supabase.from('pretendente_reports').delete().eq('id', id);
    setSavedReports((prev) => prev.filter((r) => r.id !== id));
  };

  if (!session) {
    return (
      <div className="max-w-md mx-auto text-center py-16 animate-fade-up">
        <div className="w-14 h-14 rounded-2xl bg-aura-gradient flex items-center justify-center mx-auto mb-4 shadow-lg shadow-aura-slate/30">
          <UserCircle className="w-7 h-7 text-white" />
        </div>
        <h2 className="font-display text-2xl font-bold text-white mb-2">{t('profile.title')}</h2>
        <p className="text-slate-400 text-sm mb-6">{t('profile.subtitle')}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onLogin}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-slate-200 bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] transition"
          >
            {t('nav.entrar')}
          </button>
          <button
            onClick={onSignUp}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white btn-gradient transition"
          >
            {t('nav.criarConta')}
          </button>
        </div>

        <AppearanceAndLanguage
          theme={theme}
          setTheme={setTheme}
          language={language}
          setLanguage={setLanguage}
          t={t}
          userId={null}
        />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8 animate-fade-up">
      <div className="text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
          <span className="text-white">{t('profile.title').split(' & ')[0]} </span>
          <span className="text-gradient">& {t('profile.title').split(' & ')[1]}</span>
        </h2>
        <p className="text-slate-400 mt-2 text-sm">{t('profile.subtitle')}</p>
      </div>

      {/* Account */}
      <section className="glass rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-6">
          <UserCircle className="w-5 h-5 text-aura-slate" />
          <h3 className="font-display font-semibold text-white text-lg">{t('profile.account')}</h3>
        </div>
        <form onSubmit={handleSaveAccount} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-[0.16em] text-slate-400 mb-1.5">
              {t('profile.name')}
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder={t('auth.firstNamePlaceholder')}
              className="w-full bg-ink-800/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-aura-slate/50 focus:ring-2 focus:ring-aura-slate/20 transition"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-[0.16em] text-slate-400 mb-1.5">
              {t('profile.email')}
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                value={email}
                disabled
                className="w-full bg-white/[0.02] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-400 cursor-not-allowed"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-[0.16em] text-slate-400 mb-1.5">
              {t('profile.changePassword')}
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder={t('profile.newPassword')}
                autoComplete="new-password"
                className="w-full bg-ink-800/60 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-aura-slate/50 focus:ring-2 focus:ring-aura-slate/20 transition"
              />
            </div>
          </div>

          {accountMsg && (
            <div
              className={`flex items-start gap-2 p-3 rounded-xl ${
                accountMsg.type === 'ok'
                  ? 'bg-emerald-500/10 border border-emerald-500/30'
                  : 'bg-red-500/10 border border-red-500/30'
              }`}
            >
              {accountMsg.type === 'ok' ? (
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              )}
              <p className={`text-sm ${accountMsg.type === 'ok' ? 'text-emerald-200' : 'text-red-200'}`}>
                {accountMsg.text}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={savingAccount}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white btn-gradient disabled:opacity-50 transition"
          >
            {savingAccount ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            {savingAccount ? t('profile.saving') : t('profile.save')}
          </button>
        </form>
      </section>

      {/* PIN de 4 Dígitos */}
      <section className="glass rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-5 h-5 text-aura-slate" />
          <h3 className="font-display font-semibold text-white text-lg">{t('profile.pinTitle')}</h3>
          {pinEnabled && (
            <span className="ml-auto px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
              {t('profile.pinActive')}
            </span>
          )}
        </div>
        <p className="text-sm text-slate-400 mb-6">{t('profile.pinSubtitle')}</p>

        {pinEnabled ? (
          <div className="space-y-4">
            <p className="text-sm text-slate-300">{t('profile.pinEnabledDesc')}</p>
            <button
              type="button"
              onClick={handleClearPin}
              disabled={pinSaving}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-red-300 bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 transition disabled:opacity-50"
            >
              {pinSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
              {t('profile.pinRemove')}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSavePin} className="space-y-3">
            <div>
              <label className="block text-xs uppercase tracking-[0.16em] text-slate-400 mb-1.5">
                {t('profile.pinNew')}
              </label>
              <input
                type="password"
                inputMode="numeric"
                value={newPin}
                onChange={(e) => setNewPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="••••"
                maxLength={4}
                className="w-32 bg-ink-800/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white text-center tracking-[0.5em] placeholder:text-slate-600 focus:outline-none focus:border-aura-slate/50 focus:ring-2 focus:ring-aura-slate/20 transition"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.16em] text-slate-400 mb-1.5">
                {t('profile.pinConfirm')}
              </label>
              <input
                type="password"
                inputMode="numeric"
                value={confirmPin}
                onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="••••"
                maxLength={4}
                className="w-32 bg-ink-800/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white text-center tracking-[0.5em] placeholder:text-slate-600 focus:outline-none focus:border-aura-slate/50 focus:ring-2 focus:ring-aura-slate/20 transition"
              />
            </div>
            {pinMsg && (
              <div
                className={`flex items-start gap-2 p-3 rounded-xl ${
                  pinMsg.type === 'ok'
                    ? 'bg-emerald-500/10 border border-emerald-500/30'
                    : 'bg-red-500/10 border border-red-500/30'
                }`}
              >
                {pinMsg.type === 'ok' ? (
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                )}
                <p className={`text-sm ${pinMsg.type === 'ok' ? 'text-emerald-200' : 'text-red-200'}`}>
                  {pinMsg.text}
                </p>
              </div>
            )}
            <button
              type="submit"
              disabled={pinSaving || newPin.length !== 4}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white btn-gradient disabled:opacity-50 transition"
            >
              {pinSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />}
              {pinSaving ? t('profile.saving') : t('profile.pinSave')}
            </button>
          </form>
        )}
      </section>

      {/* Suitors */}
      <section className="glass rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-2">
          <Heart className="w-5 h-5 text-aura-zinc" />
          <h3 className="font-display font-semibold text-white text-lg">{t('profile.suitors')}</h3>
        </div>
        <p className="text-sm text-slate-400 mb-6">{t('profile.suitorsSubtitle')}</p>

        {!showForm && (
          <button
            onClick={() => {
              resetSuitorForm();
              setShowForm(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white btn-gradient transition mb-6"
          >
            <Plus className="w-4 h-4" />
            {t('profile.addSuitor')}
          </button>
        )}

        {showForm && (
          <form
            onSubmit={handleSaveSuitor}
            className="glass-soft rounded-xl p-5 mb-6 space-y-4 animate-fade-up"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-white">
                {editingId ? t('profile.editSuitor') : t('profile.addSuitor')}
              </span>
              <button
                type="button"
                onClick={resetSuitorForm}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <input
              type="text"
              value={suitorName}
              onChange={(e) => setSuitorName(e.target.value)}
              placeholder={t('profile.suitorName')}
              required
              className="w-full bg-ink-800/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-aura-zinc/50 focus:ring-2 focus:ring-aura-zinc/20 transition"
            />
            <textarea
              value={suitorNotes}
              onChange={(e) => setSuitorNotes(e.target.value)}
              placeholder={t('profile.suitorNotes')}
              rows={3}
              className="w-full bg-ink-800/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-aura-zinc/50 focus:ring-2 focus:ring-aura-zinc/20 transition resize-none"
            />
            <div>
              <label className="block text-xs uppercase tracking-[0.16em] text-slate-400 mb-1.5">
                {t('profile.suitorStatus')}
              </label>
              <select
                value={suitorStatus}
                onChange={(e) => setSuitorStatus(e.target.value)}
                className="w-full bg-ink-800/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-aura-zinc/50 focus:ring-2 focus:ring-aura-zinc/20 transition"
              >
                {STATUS_VALUES.map((s) => (
                  <option key={s} value={s} className="bg-ink-800 text-white">
                    {translate(language, STATUS_KEYS[s])}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              disabled={suitorSaving}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white btn-gradient disabled:opacity-50 transition"
            >
              {suitorSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              {editingId ? t('profile.save') : t('profile.saveSuitor')}
            </button>
          </form>
        )}

        {loadingSuitors ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-5 h-5 animate-spin text-aura-slate" />
          </div>
        ) : suitors.length === 0 ? (
          <p className="text-center py-8 text-slate-500 text-sm">{t('profile.noSuitors')}</p>
        ) : (
          <div className="space-y-4">
            {suitors.map((s) => (
              <div
                key={s.id}
                className="glass-soft rounded-xl p-4 flex flex-col sm:flex-row sm:items-start gap-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-white text-sm">{s.name}</p>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-aura-slate/15 text-aura-slate border border-aura-slate/20">
                      {translate(language, STATUS_KEYS[s.status] ?? 'profile.statusTalking')}
                    </span>
                  </div>
                  {s.notes && <p className="text-sm text-slate-300 whitespace-pre-wrap">{s.notes}</p>}
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handleEditSuitor(s)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition"
                    aria-label={t('profile.editSuitor')}
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => void handleDeleteSuitor(s.id)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-red-300 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition"
                    aria-label={t('profile.deleteSuitor')}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Relatório da Pretendente */}
      <section className="glass rounded-2xl p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-1">
          <Brain className="w-5 h-5 text-aura-slate" />
          <h3 className="font-display font-semibold text-white text-lg">{t('gen.pretendenteTitle')}</h3>
        </div>
        <p className="text-sm text-slate-400 mb-4">{t('gen.pretendenteSubtitle')}</p>

        <div className="grid sm:grid-cols-2 gap-3 mb-4">
          <input
            type="text"
            value={pretendenteName}
            onChange={(e) => setPretendenteName(e.target.value)}
            placeholder={t('gen.pretendenteName')}
            className="w-full bg-ink-800/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-aura-zinc/50 focus:ring-2 focus:ring-aura-zinc/20 transition"
          />
          <input
            type="text"
            value={pretendenteVinculo}
            onChange={(e) => setPretendenteVinculo(e.target.value)}
            placeholder={t('gen.pretendenteVinculo')}
            className="w-full bg-ink-800/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-aura-zinc/50 focus:ring-2 focus:ring-aura-zinc/20 transition"
          />
        </div>

        <button
          onClick={handleGenerateReport}
          disabled={pretendenteLoading || !pretendenteName.trim()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white btn-gradient disabled:opacity-50 transition"
        >
          {pretendenteLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
          {pretendenteLoading ? t('gen.generating') : t('gen.pretendenteGenerate')}
        </button>

        {pretendenteError && (
          <div className="mt-4 flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <p className="text-sm text-red-200">{pretendenteError}</p>
          </div>
        )}

        {savedReports.length > 0 && (
          <div className="mt-4">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400 mb-2">{t('gen.savedReports')}</p>
            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              {savedReports.map((r) => (
                <div key={r.id} className="flex items-center gap-2 glass-soft rounded-lg p-2.5 group">
                  <button
                    onClick={() => handleLoadReport(r)}
                    className="flex-1 text-left min-w-0"
                  >
                    <p className="text-sm text-slate-200 truncate">{r.name}</p>
                    <p className="text-[10px] text-slate-500">{new Date(r.created_at).toLocaleDateString(language === 'pt' ? 'pt-PT' : language === 'en' ? 'en-US' : language === 'es' ? 'es-ES' : language === 'fr' ? 'fr-FR' : 'de-DE')}</p>
                  </button>
                  <button
                    onClick={() => handleDeleteReport(r.id)}
                    className="opacity-0 group-hover:opacity-100 transition text-slate-500 hover:text-red-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <AppearanceAndLanguage
        theme={theme}
        setTheme={setTheme}
        language={language}
        setLanguage={setLanguage}
        t={t}
        userId={session?.user?.id ?? null}
      />

      {/* Danger Zone */}
      <section className="glass rounded-2xl p-5 sm:p-6 border-red-500/20">
        <div className="flex items-center gap-2 mb-1">
          <AlertCircle className="w-5 h-5 text-red-400" />
          <h3 className="font-display font-semibold text-white text-lg">{t('profile.dangerZone')}</h3>
        </div>
        <p className="text-sm text-slate-400 mb-4">{t('profile.dangerZoneSubtitle')}</p>
        <button
          type="button"
          onClick={() => setShowDeleteModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-red-300 bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 transition"
        >
          <Trash2 className="w-4 h-4" />
          {t('profile.deleteAllData')}
        </button>
      </section>

      <ConfirmModal
        open={showDeleteModal}
        title={t('modal.deleteAllTitle')}
        description={t('modal.deleteAllDescription')}
        confirmLabel={t('modal.confirmDelete')}
        cancelLabel={t('modal.cancel')}
        onConfirm={() => {
          setShowDeleteModal(false);
          try {
            const uid = session?.user?.id;
            if (uid) {
              localStorage.removeItem(`aura_user_settings_${uid}`);
              localStorage.removeItem(`aura.history.${uid}`);
              localStorage.removeItem(`aura.generation_count.${uid}`);
              localStorage.removeItem(`aura_profile_${uid}`);
              localStorage.removeItem(`aura_form_state_${uid}`);
              const convPrefix = `aura.conversation.${uid}.`;
              const activeConvKey = `aura.active_conversation_id_${uid}`;
              localStorage.removeItem(activeConvKey);
              for (let i = localStorage.length - 1; i >= 0; i--) {
                const k = localStorage.key(i);
                if (k && k.startsWith(convPrefix)) localStorage.removeItem(k);
              }
            }
            localStorage.removeItem('aura.auth');
            sessionStorage.clear();
          } catch {
            /* ignore */
          }
          setTimeout(() => window.location.reload(), 200);
        }}
        onCancel={() => setShowDeleteModal(false)}
      />

    </div>
  );
}

function AppearanceAndLanguage({
  theme,
  setTheme,
  language,
  setLanguage,
  t,
  userId,
}: {
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  language: Language;
  setLanguage: (l: Language) => void;
  t: (k: TranslationKey) => string;
  userId: string | null;
}) {
  return (
    <>
      {/* Share SEDUX */}
      <ShareAuraSection language={language} t={t} userId={userId} />

      {/* Appearance */}
      <section className="glass rounded-2xl p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-1">
          {theme === 'dark' ? <Moon className="w-5 h-5 text-aura-slate" /> : <Sun className="w-5 h-5 text-aura-zinc" />}
          <h3 className="font-display font-semibold text-white text-lg">{t('profile.appearance')}</h3>
        </div>
        <p className="text-sm text-slate-400 mb-4">{t('profile.appearanceSubtitle')}</p>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setTheme('dark')}
            className={`flex items-center gap-3 p-4 rounded-xl border transition ${
              theme === 'dark'
                ? 'border-aura-zinc/50 bg-aura-zinc/10 shadow-lg shadow-aura-zinc/15'
                : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.06]'
            }`}
          >
            <Moon className="w-5 h-5 text-aura-slate" />
            <span className="text-sm font-semibold text-white">{t('profile.darkMode')}</span>
          </button>
          <button
            onClick={() => setTheme('light')}
            className={`flex items-center gap-3 p-4 rounded-xl border transition ${
              theme === 'light'
                ? 'border-aura-zinc/50 bg-aura-zinc/10 shadow-lg shadow-aura-zinc/15'
                : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.06]'
            }`}
          >
            <Sun className="w-5 h-5 text-aura-zinc" />
            <span className="text-sm font-semibold text-white">{t('profile.lightMode')}</span>
          </button>
        </div>
      </section>

      {/* Language */}
      <section className="glass rounded-2xl p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-1">
          <Globe className="w-5 h-5 text-aura-slate" />
          <h3 className="font-display font-semibold text-white text-lg">{t('profile.language')}</h3>
        </div>
        <p className="text-sm text-slate-400 mb-4">{t('profile.languageSubtitle')}</p>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
          {LANGUAGES.map((l) => (
            <button
              key={l.id}
              onClick={() => setLanguage(l.id)}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition ${
                language === l.id
                  ? 'border-aura-zinc/50 bg-aura-zinc/10 shadow-lg shadow-aura-zinc/15'
                  : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.06]'
              }`}
            >
              <span className="text-xs font-bold tracking-wider text-aura-slate">{l.flag}</span>
              <span className="text-sm font-semibold text-white">{l.label}</span>
            </button>
          ))}
        </div>
      </section>
    </>
  );
}

function ShareAuraSection({ language, t, userId }: { language: Language; t: (k: TranslationKey) => string; userId: string | null }) {
  const [copied, setCopied] = useState(false);
  const [igNotice, setIgNotice] = useState(false);
  const [referralCount, setReferralCount] = useState(0);
  const [inviteUrl, setInviteUrl] = useState(SHARE_URL);

  const REQUIRED_SHARES = 10;

  useEffect(() => {
    if (!userId) {
      setInviteUrl(SHARE_URL);
      return;
    }
    const code = userId.slice(0, 8);
    setInviteUrl(`${SHARE_URL}/?ref=${code}`);

    const fetchCount = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('referral_count')
        .eq('id', userId)
        .maybeSingle();
      if (data?.referral_count !== undefined) setReferralCount(data.referral_count);
    };
    fetchCount();

    const channel = supabase
      .channel('profile-referral-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, (payload) => {
        if (payload.new && (payload.new as { id?: string }).id === userId) {
          const newCount = (payload.new as { referral_count?: number }).referral_count;
          if (typeof newCount === 'number') setReferralCount(newCount);
        }
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'aura_invite_shares' }, () => fetchCount())
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  const shareText = translate(language, 'profile.shareText');
  const shareTextWa = translate(language, 'profile.shareTextWa');
  const shareTitle = 'SEDUX';
  const fullShareString = `${shareText} ${inviteUrl}`;
  const waShareString = `${shareTextWa} ${inviteUrl}`;

  const handleShare = async () => {
    if (typeof navigator === 'undefined') return;
    if (navigator.share) {
      try {
        await navigator.share({ title: shareTitle, text: shareText, url: inviteUrl });
        return;
      } catch {
        /* user cancelled — fall through to copy */
      }
    }
    try {
      await navigator.clipboard.writeText(fullShareString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — no action */
    }
  };

  const openIntent = (url: string) => {
    if (typeof window === 'undefined') return;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleInstagram = async () => {
    const ok = await copyToClipboard(fullShareString);
    if (ok) {
      setIgNotice(true);
      setTimeout(() => setIgNotice(false), 3500);
    }
    openIntent(igUrl);
  };

  const waUrl = `https://wa.me/?text=${encodeURIComponent(waShareString)}`;
  const tgUrl = `https://t.me/share/url?url=${encodeURIComponent(inviteUrl)}&text=${encodeURIComponent(shareText)}`;
  const igUrl = 'https://www.instagram.com/';

  const progress = Math.min(Math.round((referralCount / REQUIRED_SHARES) * 100), 100);

  return (
    <section className="mb-8">
      <div className="rounded-2xl p-6 bg-white/[0.03] border border-white/10 shadow-lg shadow-black/5 backdrop-blur-sm theme-aware-card">
        <div className="flex items-center gap-2 mb-2">
          <Share2 className="w-4 h-4 text-aura-zinc" />
          <h3 className="font-display font-semibold text-white text-lg theme-aware-heading">{t('profile.shareTitle')}</h3>
        </div>
        <p className="text-sm text-slate-400 mb-5">{t('profile.shareSubtitle')}</p>

        {/* Invite progress bar */}
        <div className="mb-5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>{t('shareGate.progress')}</span>
            <span className="font-semibold text-aura-zinc">{referralCount}/{REQUIRED_SHARES}</span>
          </div>
          <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-aura-gradient transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <button
          onClick={handleShare}
          className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white btn-gradient transition hover:scale-[1.01] active:scale-[0.99]"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              {t('profile.shareCopied')}
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4" />
              {t('profile.shareButton')}
            </>
          )}
        </button>
        <div className="mt-3 grid grid-cols-3 gap-3">
          <button
            onClick={() => openIntent(waUrl)}
            className="inline-flex flex-col items-center justify-center gap-1 py-2.5 rounded-xl text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500/20 transition"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </button>
          <button
            onClick={() => openIntent(tgUrl)}
            className="inline-flex flex-col items-center justify-center gap-1 py-2.5 rounded-xl text-xs font-medium bg-sky-500/10 text-sky-500 border border-sky-500/20 hover:bg-sky-500/20 transition"
          >
            <Send className="w-4 h-4" />
            Telegram
          </button>
          <button
            onClick={handleInstagram}
            className="inline-flex flex-col items-center justify-center gap-1 py-2.5 rounded-xl text-xs font-medium bg-zinc-500/10 text-zinc-500 border border-zinc-500/20 hover:bg-zinc-500/20 transition"
          >
            <Instagram className="w-4 h-4" />
            Instagram
          </button>
        </div>
        {igNotice && (
          <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-500/10 border border-zinc-500/30 text-xs text-zinc-300 animate-fade-up">
            <Check className="w-3.5 h-3.5 shrink-0" />
            {t('profile.instagramCopied')}
          </div>
        )}
        <button
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(inviteUrl);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            } catch {
              /* ignore */
            }
          }}
          className="mt-3 w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 transition"
        >
          <Link2 className="w-3.5 h-3.5" />
          {copied ? t('profile.shareCopied') : t('profile.copyDirectLink')}
        </button>
      </div>
    </section>
  );
}
