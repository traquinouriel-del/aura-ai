import { memo, useMemo } from 'react';
import { Smile, Flame, Zap, SlidersHorizontal, HeartPulse, type LucideIcon } from 'lucide-react';
import type { Tone } from '@/types';
import type { Language } from '@/lib/settings';
import { translate, type TranslationKey } from '@/lib/i18n';
import ClearableInput from './ClearableInput';

type Props = {
  value: Tone;
  onChange: (t: Tone) => void;
  customTone: string;
  onCustomToneChange: (v: string) => void;
  language: Language;
};

const OPTIONS: { id: Tone; labelKey: TranslationKey; icon: LucideIcon; color: string }[] = [
  { id: 'divertido', labelKey: 'tone.divertido', icon: Smile, color: 'text-amber-300' },
  { id: 'provocador', labelKey: 'tone.provocador', icon: Flame, color: 'text-orange-400' },
  { id: 'direto', labelKey: 'tone.direto', icon: Zap, color: 'text-sky-300' },
  { id: 'picante', labelKey: 'tone.picante', icon: HeartPulse, color: 'text-red-500' },
  { id: 'outro', labelKey: 'tone.outro', icon: SlidersHorizontal, color: 'text-aura-zinc' },
];

function ToneSelector({ value, onChange, customTone, onCustomToneChange, language }: Props) {
  const t = useMemo(() => (k: TranslationKey) => translate(language, k), [language]);
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.18em] text-slate-400 mb-3">{t('gen.toneLabel')}</p>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {OPTIONS.map((o) => {
          const Icon = o.icon;
          const isActive = value === o.id;
          return (
            <button
              type="button"
              key={o.id}
              onClick={() => onChange(o.id)}
              className={`group relative flex flex-col items-center justify-center gap-2 py-4 rounded-2xl border transition-all duration-300 ${
                isActive
                  ? 'border-aura-slate/60 bg-aura-slate/15 glow-select'
                  : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20'
              }`}
            >
              <Icon
                className={`w-6 h-6 transition-transform duration-300 group-hover:scale-110 ${
                  isActive ? o.color : 'text-slate-300'
                }`}
              />
              <span
                className={`text-sm font-medium ${
                  isActive ? 'text-white' : 'text-slate-300'
                }`}
              >
                {t(o.labelKey)}
              </span>
              {isActive && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-aura-zinc shadow shadow-aura-zinc/50" />
              )}
            </button>
          );
        })}
      </div>

      {value === 'outro' && (
        <div className="mt-3 animate-fade-up">
          <ClearableInput
            value={customTone}
            onChange={onCustomToneChange}
            placeholder={t('tone.customPlaceholder')}
            clearLabel={t('common.clear')}
          />
        </div>
      )}
    </div>
  );
}

export default memo(ToneSelector);
