import { memo, useMemo } from 'react';
import {
  Sparkles,
  HeartCrack,
  MessageSquare,
  Image,
  Coffee,
  MessagesSquare,
  Edit3,
  type LucideIcon,
} from 'lucide-react';
import type { Context } from '@/types';
import type { Language } from '@/lib/settings';
import { translate, type TranslationKey } from '@/lib/i18n';
import SmartTextarea from './SmartTextarea';

type Props = {
  contexts: Context[];
  selected: string | null;
  onSelect: (id: string) => void;
  customContext: string;
  onCustomContextChange: (v: string) => void;
  language: Language;
};

const ICONS: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  'heart-crack': HeartCrack,
  wink: MessageSquare,
  image: Image,
  coffee: Coffee,
  'messages-square': MessagesSquare,
  edit: Edit3,
};

function ContextGrid({ contexts, selected, onSelect, customContext, onCustomContextChange, language }: Props) {
  const t = useMemo(() => (k: TranslationKey) => translate(language, k), [language]);
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.18em] text-slate-400 mb-3">{t('gen.contextLabel')}</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 gap-y-5">
        {contexts.map((c) => {
          const Icon = ICONS[c.icon] ?? Sparkles;
          const isActive = selected === c.id;
          return (
            <button
              type="button"
              key={c.id}
              onClick={() => onSelect(c.id)}
              className={`group relative text-left p-4 rounded-2xl border transition-all duration-300 overflow-hidden ${
                isActive
                  ? 'border-aura-slate/50 bg-aura-slate/10 glow-select'
                  : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 transition ${
                  isActive
                    ? 'bg-aura-gradient text-white'
                    : 'bg-white/[0.06] text-slate-300 group-hover:text-white'
                }`}
              >
                <Icon className="w-4.5 h-4.5" />
              </div>
              <p className={`font-semibold text-sm ${isActive ? 'text-white' : 'text-slate-200'}`}>
                {translate(language, c.labelKey as TranslationKey)}
              </p>
              <p className="text-xs text-slate-400 mt-0.5 leading-snug">{translate(language, c.descKey as TranslationKey)}</p>
            </button>
          );
        })}
      </div>

      {selected === 'personalizado' && (
        <div className="mt-3 animate-fade-up">
          <SmartTextarea
            value={customContext}
            onChange={onCustomContextChange}
            rows={3}
            placeholder={t('gen.customContextPlaceholder')}
            clearLabel={t('common.clear')}
          />
        </div>
      )}
    </div>
  );
}

export default memo(ContextGrid);
