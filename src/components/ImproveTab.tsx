import { useRef, useState, useEffect, useMemo } from 'react';
import { Wand, Sparkles, Copy, Check, AlertTriangle, Loader2, ArrowRight, RefreshCw, Trash2, SlidersHorizontal, ShieldAlert } from 'lucide-react';
import { useAntiFlood } from '@/lib/useAntiFlood';
import { copyToClipboard } from '@/lib/clipboard';
import { useSettings } from '@/lib/settings';
import { translate, type TranslationKey } from '@/lib/i18n';
import SmartTextarea from './SmartTextarea';
import ClearableInput from './ClearableInput';
import ConfirmModal from './ConfirmModal';

type LengthMode = 'curta' | 'media' | 'longa';

type ImproveOption = {
  id: string;
  label: string;
  text: string;
};

const GOAL_KEYS: TranslationKey[] = [
  'goal.confident',
  'goal.funny',
  'goal.flirty',
  'goal.mysterious',
  'goal.natural',
  'goal.casual',
  'goal.picante',
];

const LENGTHS: { id: LengthMode; key: TranslationKey }[] = [
  { id: 'curta', key: 'length.curta' },
  { id: 'media', key: 'length.media' },
  { id: 'longa', key: 'length.longa' },
];

export default function ImproveTab() {
  const { language } = useSettings();
  const antiFlood = useAntiFlood();
  const t = useMemo(() => (k: TranslationKey) => translate(language, k), [language]);
  const [original, setOriginal] = useState('');
  const [goal, setGoal] = useState('');
  const [options, setOptions] = useState<ImproveOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showClearModal, setShowClearModal] = useState(false);
  const [lengthMenu, setLengthMenu] = useState(false);
  const [lengthMode, setLengthMode] = useState<LengthMode>('media');
  const lengthMenuRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lengthMenu) return;
    const handler = (e: MouseEvent) => {
      if (lengthMenuRef.current && !lengthMenuRef.current.contains(e.target as Node)) {
        setLengthMenu(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [lengthMenu]);

  const handleImprove = async () => {
    setError(null);
    if (!original.trim()) {
      setError(t('improve.errorEmpty'));
      return;
    }
    if (!antiFlood.registerAction()) return;
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setOptions([{
        id: 'placeholder',
        label: translate(language, 'sedux.enginePlaceholder'),
        text: translate(language, 'sedux.engineBuilding'),
      }]);
    } catch {
      setError(translate(language, 'sedux.engineBuilding'));
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (opt: ImproveOption) => {
    const ok = await copyToClipboard(opt.text);
    if (ok) {
      setCopiedId(opt.id);
      setTimeout(() => setCopiedId(null), 1600);
    }
  };

  useEffect(() => {
    if (!loading && options.length > 0 && outputRef.current) {
      outputRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [options, loading]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Clear-all */}
      <div className="flex justify-end mb-2">
        <button
          type="button"
          onClick={() => setShowClearModal(true)}
          title={t('common.clearAll')}
          aria-label={t('common.clearAll')}
          className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-slate-500 hover:text-red-300 hover:bg-red-500/10 transition"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <div className="text-center mb-8 animate-fade-up">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-slate-300 mb-4">
          <Wand className="w-3.5 h-3.5 text-aura-zinc" />
          {t('improve.badge')}
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
          <span className="text-white">{t('improve.titleA')}</span>
          <span className="text-gradient">{t('improve.titleB')}</span>
        </h1>
        <p className="text-slate-400 mt-3 max-w-xl mx-auto">{t('improve.subtitle')}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="space-y-5">
          <div className="glass rounded-2xl p-5 sm:p-6 space-y-5 animate-fade-up">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400 mb-3">
                {t('improve.messageLabel')}
              </p>
              <SmartTextarea
                value={original}
                onChange={setOriginal}
                rows={6}
                placeholder={t('improve.messagePlaceholder')}
                clearLabel={t('common.clear')}
                pasteLabel={t('common.paste')}
              />
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400 mb-3">
                {t('improve.goalLabel')}
              </p>
              <ClearableInput
                value={goal}
                onChange={setGoal}
                placeholder={t('improve.goalPlaceholder')}
                clearLabel={t('common.clear')}
              />
              <div className="flex flex-wrap gap-2 mt-3">
                {GOAL_KEYS.map((gk) => {
                  const label = t(gk);
                  return (
                    <button
                      type="button"
                      key={gk}
                      onClick={() => setGoal(label)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition ${
                        goal === label
                          ? 'border-aura-zinc/50 bg-aura-zinc/15 text-white'
                          : 'border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/[0.06]'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <button
            onClick={handleImprove}
            disabled={loading || !original.trim() || antiFlood.isBlocked}
            className="w-full inline-flex items-center justify-center gap-2.5 py-4 rounded-2xl text-base font-semibold text-white btn-gradient disabled:opacity-50 disabled:cursor-not-allowed transition animate-fade-up"
          >
            {antiFlood.isBlocked ? (
              <>
                <ShieldAlert className="w-5 h-5" />
                {antiFlood.cooldownLabel}
              </>
            ) : loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {t('improving')}
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                {t('improve.button')}
              </>
            )}
          </button>
        </div>

        {/* Output */}
        <div ref={outputRef} className="lg:sticky lg:top-24 self-start scroll-mt-24">
          <div className="glass rounded-2xl p-5 sm:p-6 animate-fade-up min-h-[260px]">
            <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
              <div className="flex items-center gap-2.5 shrink-0">
                <span className="w-2 h-2 rounded-full bg-aura-zinc animate-pulse-soft" />
                <h3 className="font-display font-semibold text-white">{t('improve.outputTitle')}</h3>
              </div>
              <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
                {/* Length selector */}
                <div className="relative" ref={lengthMenuRef}>
                  <button
                    type="button"
                    onClick={() => setLengthMenu(!lengthMenu)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    {t('cantadas.outras')}
                    {lengthMode !== 'media' && (
                      <span className="text-[10px] text-aura-zinc">· {t(LENGTHS.find((l) => l.id === lengthMode)!.key)}</span>
                    )}
                  </button>
                  {lengthMenu && (
                    <div className="absolute right-0 top-full mt-1 z-50 w-44 max-w-[calc(100vw-2rem)] rounded-xl p-1.5 shadow-xl animate-fade-up bg-ink-900/95 border border-white/15 backdrop-blur-xl">
                      <p className="text-[10px] uppercase tracking-[0.14em] text-slate-400 px-2 py-1">{t('improve.length')}</p>
                      {LENGTHS.map((l) => (
                        <button
                          key={l.id}
                          type="button"
                          onClick={() => { setLengthMode(l.id); setLengthMenu(false); }}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
                            lengthMode === l.id
                              ? 'text-aura-slate bg-aura-slate/15'
                              : 'text-slate-200 hover:bg-aura-slate/10'
                          }`}
                        >
                          {t(l.key)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {options.length > 0 && !loading && !error && (
                  <button
                    type="button"
                    onClick={handleImprove}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    {t('responses.regenerate')}
                  </button>
                )}
              </div>
            </div>

            <div className="min-h-[160px]">
              {loading && options.length === 0 && (
                <div className="flex flex-col items-center justify-center py-10 gap-4">
                  <div className="relative w-12 h-12">
                    <div className="absolute inset-0 rounded-full border-2 border-aura-slate/20" />
                    <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-aura-zinc border-r-aura-slate animate-spin-slow" />
                  </div>
                  <p className="text-sm text-slate-400 animate-pulse-soft">{t('improve.refining')}</p>
                </div>
              )}

              {loading && options.length > 0 && (
                <div className="space-y-3 opacity-60">
                  {options.map((opt) => (
                    <div key={opt.id} className="rounded-xl p-4 glass-soft">
                      <div className="flex items-center gap-2 mb-2">
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-aura-zinc" />
                        <span className="text-xs text-slate-400">{t('improve.refining')}</span>
                      </div>
                      <p className="text-sm text-slate-100 leading-relaxed whitespace-pre-wrap break-words">
                        {opt.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {!loading && error && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                  <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-300">{t('common.errorTitle')}</p>
                    <p className="text-sm text-red-200/80 mt-0.5">{error}</p>
                  </div>
                </div>
              )}

              {options.length > 0 && !error && (
                <div className="space-y-3">
                  {options.map((opt, index) => {
                    const copied = copiedId === opt.id;
                    const isIdeal = index === 0;
                    return (
                      <div
                        key={opt.id}
                        className={`rounded-xl p-4 transition group ${
                          isIdeal
                            ? 'bg-aura-gradient/10 border border-aura-zinc/40 shadow-lg shadow-aura-zinc/10'
                            : 'glass-soft hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2 flex-wrap min-w-0">
                          <div className="flex items-center gap-2 flex-wrap min-w-0">
                            {isIdeal ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-semibold text-white btn-gradient max-w-full">
                                <Sparkles className="w-3 h-3 shrink-0" />
                                <span className="truncate">{opt.label}</span>
                              </span>
                            ) : (
                              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-aura-slate/15 text-aura-slate border border-aura-slate/20 max-w-full truncate">
                                {opt.label}
                              </span>
                            )}
                          </div>
                          {!loading && (
                            <button
                              type="button"
                              onClick={() => handleCopy(opt)}
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
                                copied
                                  ? 'text-white btn-gradient'
                                  : 'text-slate-300 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08]'
                              }`}
                            >
                              {copied ? <Check className="w-3.5 h-3.5 shrink-0" /> : <Copy className="w-3.5 h-3.5 shrink-0" />}
                              {copied ? t('common.copied') : t('common.copy')}
                            </button>
                          )}
                        </div>
                        <p className="text-sm text-slate-100 leading-relaxed whitespace-pre-wrap break-words">
                          {opt.text}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}

              {!loading && !error && options.length === 0 && (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-3">
                    <ArrowRight className="w-5 h-5 text-slate-500" />
                  </div>
                  <p className="text-sm text-slate-500">{t('improve.emptyOutput')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        open={showClearModal}
        title={t('modal.clearTitle')}
        description={t('modal.clearDescription')}
        confirmLabel={t('modal.confirmClear')}
        cancelLabel={t('modal.cancel')}
        onConfirm={() => {
          setShowClearModal(false);
          setTimeout(() => {
            setOriginal('');
            setGoal('');
            setOptions([]);
            setError(null);
          }, 50);
        }}
        onCancel={() => setShowClearModal(false)}
      />
    </div>
  );
}
