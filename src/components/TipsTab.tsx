import { useMemo, useState } from 'react';
import {
  Lightbulb,
  Heart,
  Brain,
  MessageCircle,
  Sparkles,
  ChevronDown,
  RefreshCw,
  Copy,
  Check,
  Loader2,
  type LucideIcon,
} from 'lucide-react';
import { CANTADAS, CATEGORIES, type CantadaCategory, type Cantada } from '@/data/cantadas';
import { copyToClipboard } from '@/lib/clipboard';
import { useSettings } from '@/lib/settings';
import { translate, type TranslationKey } from '@/lib/i18n';

type TipId = 'curiosidade' | 'espelho' | 'nao-fechar' | 'tensao' | 'autenticidade' | 'tempo';

type Tip = {
  id: TipId;
  titleKey: TranslationKey;
  categoryKey: TranslationKey;
  summaryKey: TranslationKey;
  bodyKey: TranslationKey;
  icon: LucideIcon;
  categoryFilter: TranslationKey;
};

const TIPS: Tip[] = [
  { id: 'curiosidade', titleKey: 'tip.curiosidade.title', categoryKey: 'tip.curiosidade.category', summaryKey: 'tip.curiosidade.summary', bodyKey: 'tip.curiosidade.body', icon: Sparkles, categoryFilter: 'tips.categoryPsychology' },
  { id: 'espelho', titleKey: 'tip.espelho.title', categoryKey: 'tip.espelho.category', summaryKey: 'tip.espelho.summary', bodyKey: 'tip.espelho.body', icon: Heart, categoryFilter: 'tips.categoryConnection' },
  { id: 'nao-fechar', titleKey: 'tip.nao-fechar.title', categoryKey: 'tip.nao-fechar.category', summaryKey: 'tip.nao-fechar.summary', bodyKey: 'tip.nao-fechar.body', icon: MessageCircle, categoryFilter: 'tips.categoryConversation' },
  { id: 'tensao', titleKey: 'tip.tensao.title', categoryKey: 'tip.tensao.category', summaryKey: 'tip.tensao.summary', bodyKey: 'tip.tensao.body', icon: Brain, categoryFilter: 'tips.categoryPsychology' },
  { id: 'autenticidade', titleKey: 'tip.autenticidade.title', categoryKey: 'tip.autenticidade.category', summaryKey: 'tip.autenticidade.summary', bodyKey: 'tip.autenticidade.body', icon: Lightbulb, categoryFilter: 'tips.categoryMindset' },
  { id: 'tempo', titleKey: 'tip.tempo.title', categoryKey: 'tip.tempo.category', summaryKey: 'tip.tempo.summary', bodyKey: 'tip.tempo.body', icon: MessageCircle, categoryFilter: 'tips.categoryConversation' },
];

const TIP_CATEGORY_FILTERS: TranslationKey[] = [
  'tips.categoryAll',
  'tips.categoryPsychology',
  'tips.categoryConnection',
  'tips.categoryConversation',
  'tips.categoryMindset',
];

const CANTADA_CATEGORY_KEYS: Record<CantadaCategory, TranslationKey> = {
  'Divertidas': 'cat.Divertidas',
  'Fofas': 'cat.Fofas',
  'Confiantes': 'cat.Confiantes',
  'Criativas': 'cat.Criativas',
  'Inteligentes': 'cat.Inteligentes',
  'Elogios': 'cat.Elogios',
  'Elogios 2.0': 'cat.Elogios2',
  'Românticas': 'cat.Românticas',
  'Sedutoras': 'cat.Sedutoras',
  'Provocadoras': 'cat.Provocadoras',
  'Tentação': 'cat.Tentação',
  'Picantes': 'cat.Picantes',
};

const CANTADA_BATCH = 12;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function TipsTab() {
  const { language } = useSettings();
  const t = useMemo(() => (k: TranslationKey) => translate(language, k), [language]);
  const [openId, setOpenId] = useState<TipId | null>(null);
  const [tipCategory, setTipCategory] = useState<TranslationKey>('tips.categoryAll');

  const [cantadaCategory, setCantadaCategory] = useState<'all' | CantadaCategory>('all');
  const [seed, setSeed] = useState(0);
  const [extraCards, setExtraCards] = useState<Cantada[]>([]);
  const [extraLoading, setExtraLoading] = useState(false);

  const filteredTips =
    tipCategory === 'tips.categoryAll'
      ? TIPS
      : TIPS.filter((tip) => tip.categoryFilter === tipCategory);

  const cantadaPool = useMemo(
    () =>
      cantadaCategory === 'all'
        ? CANTADAS
        : CANTADAS.filter((c) => c.category === cantadaCategory),
    [cantadaCategory],
  );

  const visibleCantadas = useMemo(() => {
    const shuffled = shuffle(cantadaPool);
    return shuffled.slice(0, Math.min(CANTADA_BATCH, shuffled.length));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cantadaPool, seed]);

  const handleGerarMais = () => {
    setSeed((s) => s + 1);
    setExtraCards([]);
  };

  const handleOutras = () => {
    setExtraLoading(true);
    const pool = cantadaCategory === 'all' ? CANTADAS : CANTADAS.filter((c) => c.category === cantadaCategory);
    const shuffled = shuffle(pool);
    const newCards = shuffled.slice(0, 10);
    if (newCards.length > 0) {
      setExtraCards((prev) => [...prev, ...newCards]);
    }
    setTimeout(() => setExtraLoading(false), 400);
  };

  const CANTADA_FILTERS: ('all' | CantadaCategory)[] = ['all', ...CATEGORIES];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* ── Articles section ── */}
      <div className="text-center mb-8 animate-fade-up">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-slate-300 mb-4">
          <Lightbulb className="w-3.5 h-3.5 text-aura-zinc" />
          {t('tips.badge')}
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
          <span className="text-white">{t('tips.titleA')}</span>
          <span className="text-gradient">{t('tips.titleB')}</span>
        </h1>
        <p className="text-slate-400 mt-3 max-w-xl mx-auto">{t('tips.subtitle')}</p>
      </div>

      {/* Tip category filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-6 animate-fade-up">
        {TIP_CATEGORY_FILTERS.map((c) => (
          <button
            key={c}
            onClick={() => setTipCategory(c)}
            className={`px-3.5 py-1.5 rounded-xl text-sm font-medium border transition ${
              tipCategory === c
                ? 'border-aura-zinc/50 bg-aura-zinc/15 text-white'
                : 'border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/[0.06]'
            }`}
          >
            {t(c)}
          </button>
        ))}
      </div>

      {/* Tips list */}
      <div className="space-y-4 mb-14">
        {filteredTips.map((tip) => {
          const Icon = tip.icon;
          const isOpen = openId === tip.id;
          return (
            <div
              key={tip.id}
              className={`glass rounded-2xl overflow-hidden transition-all duration-300 ${
                isOpen ? 'border-aura-slate/30' : ''
              }`}
            >
              <button
                onClick={() => setOpenId(isOpen ? null : tip.id)}
                className="w-full flex items-center gap-4 p-5 text-left hover:bg-white/[0.03] transition"
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition ${
                    isOpen ? 'bg-aura-gradient text-white' : 'bg-white/[0.06] text-slate-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] uppercase tracking-[0.16em] text-aura-slate">
                      {t(tip.categoryKey)}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-white text-base">{t(tip.titleKey)}</h3>
                  <p className="text-sm text-slate-400 mt-0.5 line-clamp-1">{t(tip.summaryKey)}</p>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-0 animate-fade-up">
                  <div className="pl-0 sm:pl-[60px]">
                    <div className="border-t border-white/10 pt-4">
                      {t(tip.bodyKey).split('\n\n').map((para, i) => (
                        <p
                          key={i}
                          className="text-sm text-slate-300 leading-relaxed mb-3 last:mb-0"
                        >
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Cantadas section ── */}
      <section className="scroll-mt-24">
        <div className="text-center mb-6 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-slate-300 mb-4">
            <Heart className="w-3.5 h-3.5 text-aura-zinc" />
            {translate(language, 'cantadas.badge', { n: CANTADAS.length })}
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
            <span className="text-white">{t('cantadas.titleA')}</span>
            <span className="text-gradient">{t('cantadas.titleB')}</span>
          </h2>
          <p className="text-slate-400 mt-2 max-w-xl mx-auto text-sm">{t('cantadas.subtitle')}</p>
        </div>

        {/* Gerar Mais + filters */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex justify-center sm:justify-start">
            <button
              onClick={handleGerarMais}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white btn-gradient transition shadow-lg shadow-aura-slate/25"
            >
              <RefreshCw className="w-4 h-4" />
              {t('cantadas.generateMore')}
            </button>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {CANTADA_FILTERS.map((f) => {
              const label =
                f === 'all' ? t('cantadas.filterAll') : t(CANTADA_CATEGORY_KEYS[f as CantadaCategory]);
              return (
                <button
                  key={f}
                  onClick={() => setCantadaCategory(f)}
                  className={`px-3.5 py-1.5 rounded-xl text-sm font-medium border transition ${
                    cantadaCategory === f
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

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {visibleCantadas.map((cantada) => (
            <CantadaCard
              key={`${seed}-${cantada.id}`}
              cantada={cantada}
              language={language}
            />
          ))}
          {extraCards.map((cantada, i) => (
            <CantadaCard
              key={`extra-${seed}-${i}-${cantada.id}`}
              cantada={cantada}
              language={language}
            />
          ))}
        </div>

        {/* Outras button */}
        <div className="flex justify-center mt-5">
          <button
            onClick={handleOutras}
            disabled={extraLoading}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-aura-zinc bg-aura-zinc/10 border border-aura-zinc/30 hover:bg-aura-zinc/20 transition disabled:opacity-50"
          >
            {extraLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {t('cantadas.outras')}
          </button>
        </div>

        {visibleCantadas.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-sm">{t('cantadas.empty')}</div>
        )}
      </section>
    </div>
  );
}

function CantadaCard({
  cantada,
  language,
}: {
  cantada: Cantada;
  language: import('@/lib/settings').Language;
}) {
  const t = useMemo(() => (k: TranslationKey) => translate(language, k), [language]);
  const [copied, setCopied] = useState(false);

  const fallbackText = cantada.text[language] ?? cantada.text.pt ?? cantada.text.en ?? cantada.text.es ?? Object.values(cantada.text)[0] ?? '';

  const handleCopy = async () => {
    const ok = await copyToClipboard(fallbackText);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    }
  };

  return (
    <div className="glass-soft rounded-2xl p-4 flex flex-col gap-3 hover:border-white/20 transition group overflow-hidden">
      <div className="flex items-center justify-between gap-2">
        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-aura-slate/15 text-aura-slate border border-aura-slate/20">
          {t(CANTADA_CATEGORY_KEYS[cantada.category])}
        </span>
        <Sparkles className="w-3.5 h-3.5 text-slate-600 group-hover:text-aura-zinc transition" />
      </div>
      <p className="text-sm text-slate-100 leading-relaxed flex-1 break-words overflow-hidden">
        {fallbackText}
      </p>
      <button
        onClick={handleCopy}
        className={`self-end inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
          copied
            ? 'text-white btn-gradient'
            : 'text-slate-300 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08]'
        }`}
      >
        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        {copied ? t('common.copied') : t('common.copy')}
      </button>
    </div>
  );
}
