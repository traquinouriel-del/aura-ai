import { useMemo, useState } from 'react';
import { Copy, Check, Sparkles, RefreshCw, AlertTriangle } from 'lucide-react';
import type { ResponseOption } from '@/types';
import { copyToClipboard } from '@/lib/clipboard';
import { type Language } from '@/lib/settings';
import { translate, type TranslationKey } from '@/lib/i18n';

type Props = {
  options: ResponseOption[];
  loading: boolean;
  streaming?: boolean;
  ocrLoading?: boolean;
  ocrElapsed?: number;
  error: string | null;
  onRegenerate: () => void;
  canRegenerate: boolean;
  language: Language;
  onCopyOption?: (opt: ResponseOption) => void;
};

export default function ResponseCards({ options, loading, streaming, error, onRegenerate, canRegenerate, language, onCopyOption }: Props) {
  const t = useMemo(() => (k: TranslationKey) => translate(language, k), [language]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (opt: ResponseOption) => {
    const ok = await copyToClipboard(opt.text);
    if (ok) {
      setCopiedId(opt.style);
      setTimeout(() => setCopiedId(null), 1600);
      onCopyOption?.(opt);
    }
  };

  return (
    <div className="glass rounded-2xl p-4 sm:p-6 animate-fade-up">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-aura-zinc animate-pulse-soft" />
          <h3 className="font-display font-semibold text-white">{t('responses.title')}</h3>
        </div>
        {options.length > 0 && !loading && !error && (
          <button
            type="button"
            onClick={onRegenerate}
            disabled={!canRegenerate}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition disabled:opacity-40"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            {t('responses.regenerate')}
          </button>
        )}
      </div>

      <div className="min-h-[160px]">
        {loading && !streaming && options.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 gap-4">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full border-2 border-aura-slate/20" />
              <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-aura-zinc border-r-aura-slate animate-spin-slow" />
            </div>
            <p className="text-sm text-slate-400 animate-pulse-soft">
              {t('responses.composing')}
            </p>
          </div>
        )}

        {loading && !streaming && options.length > 0 && (
          <div className="space-y-3 opacity-60">
            {options.map((opt) => (
              <div key={opt.style} className="rounded-xl p-4 glass-soft">
                <p className="text-sm text-slate-100 leading-relaxed whitespace-pre-wrap break-words">
                  {opt.text}
                </p>
              </div>
            ))}
          </div>
        )}

        {!loading && !streaming && error && (
          <div className="rounded-xl border border-red-500/40 bg-gradient-to-br from-red-500/15 to-red-500/5 p-4 sm:p-5 animate-fade-up">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-red-300">{t('error.cardTitle')}</p>
                <p className="text-sm text-red-200/80 mt-1 leading-relaxed">{error}</p>
                <div className="mt-4 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onRegenerate}
                    disabled={!canRegenerate}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-red-500/80 hover:bg-red-500 transition disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    {t('error.retry')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {!loading && !streaming && !error && options.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5 text-slate-500" />
            </div>
            <p className="text-sm text-slate-500">{t('responses.empty')}</p>
          </div>
        )}

        {((!loading && !streaming) || streaming) && !error && options.length > 0 && (
          <div className="space-y-3">
            {options.map((opt, index) => {
              const copied = copiedId === opt.style;
              const isIdeal = index === 0;
              return (
                <div
                  key={opt.style}
                  className={`rounded-xl p-4 transition group relative ${
                    isIdeal
                      ? 'bg-aura-gradient/10 border border-aura-zinc/40 shadow-lg shadow-aura-zinc/10'
                      : 'glass-soft hover:border-white/20'
                  } ${streaming ? 'animate-fade-up' : ''}`}
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
                      {isIdeal && (
                        <span className="text-[10px] uppercase tracking-[0.14em] text-aura-zinc/80">
                          {t('style.recommended')}
                        </span>
                      )}
                    </div>
                    {!streaming && (
                      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 flex-wrap justify-end">
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
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-slate-100 leading-relaxed whitespace-pre-wrap break-words">
                    {opt.text}
                    {streaming && opt.text.length > 0 && (
                      <span className="inline-block w-1.5 h-4 ml-0.5 bg-aura-zinc/70 animate-pulse-soft align-text-bottom" />
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
