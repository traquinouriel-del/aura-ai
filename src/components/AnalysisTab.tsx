import { useRef, useState, useEffect, useCallback, useMemo, memo } from 'react';
import { Sparkles, Wand2, ImagePlus, X, MessageSquareText, Trash2, ShieldAlert, SlidersHorizontal } from 'lucide-react';
import type { Context, ResponseOption, Tone } from '@/types';
import { CONTEXTS } from '@/types';
import ContextGrid from './ContextGrid';
import ToneSelector from './ToneSelector';
import ResponseCards from './ResponseCards';
import SmartTextarea from './SmartTextarea';
import ConfirmModal from './ConfirmModal';
import { useSettings } from '@/lib/settings';
import { translate, type TranslationKey } from '@/lib/i18n';
import { useAntiFlood } from '@/lib/useAntiFlood';

type Intensity = 'fraca' | 'media' | 'forte';

type Props = {
  userId: string | null;
  onGenerated: (entry: {
    context: string;
    tone: string;
    input: string;
    output: string;
  }) => void;
};

const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];
const MAX_IMAGE_BYTES = 8 * 1024 * 1024;

type UploadedImage = { data: string; mimeType: string; name: string };

function formStorageKey(userId: string | null): string {
  return `aura_form_state_${userId ?? 'guest'}`;
}

type PersistedForm = {
  contextId: string | null;
  tone: Tone;
  customTone: string;
  customContext: string;
  input: string;
};

function loadFormState(userId: string | null): Partial<PersistedForm> {
  try {
    const raw = localStorage.getItem(formStorageKey(userId));
    if (raw) return JSON.parse(raw) as Partial<PersistedForm>;
  } catch {
    /* ignore */
  }
  return {};
}

function saveFormState(userId: string | null, state: PersistedForm) {
  try {
    localStorage.setItem(formStorageKey(userId), JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

function AnalysisTab({ userId, onGenerated }: Props) {
  const { language } = useSettings();
  const antiFlood = useAntiFlood();
  const t = useMemo(() => (k: TranslationKey) => translate(language, k), [language]);
  const persisted = useRef<Partial<PersistedForm>>(loadFormState(userId));
  const currentUserIdRef = useRef(userId);
  useEffect(() => { currentUserIdRef.current = userId; }, [userId]);
  const [contextId, setContextId] = useState<string | null>(persisted.current.contextId ?? CONTEXTS[0].id);
  const [tone, setTone] = useState<Tone>(persisted.current.tone ?? 'divertido');
  const [customTone, setCustomTone] = useState(persisted.current.customTone ?? '');
  const [customContext, setCustomContext] = useState(persisted.current.customContext ?? '');
  const [input, setInput] = useState(persisted.current.input ?? '');
  const [options, setOptions] = useState<ResponseOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [image, setImage] = useState<UploadedImage | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [intensity, setIntensity] = useState<Intensity>('media');
  const [showClearModal, setShowClearModal] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const selectedContext: Context | undefined = CONTEXTS.find((c) => c.id === contextId);
  const isCustomContext = selectedContext?.custom && !customContext.trim();

  useEffect(() => {
    saveFormState(currentUserIdRef.current, {
      contextId,
      tone,
      customTone,
      customContext,
      input,
    });
  }, [contextId, tone, customTone, customContext, input]);

  useEffect(() => {
    if (!loading && options.length > 0 && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [options, loading]);

  const handleContextSelect = useCallback((id: string) => setContextId(id), []);
  const handleToneChange = useCallback((t: Tone) => setTone(t), []);
  const handleCustomToneChange = useCallback((v: string) => setCustomTone(v), []);
  const handleCustomContextChange = useCallback((v: string) => setCustomContext(v), []);

  const handleFile = useCallback((file: File) => {
    setImageError(null);
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setImageError(t('gen.errorImageFormat'));
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setImageError(t('gen.errorImageSize'));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== 'string') return;
      const img = new Image();
      img.onload = () => {
        const MAX_WIDTH = 640;
        const scale = img.width > MAX_WIDTH ? MAX_WIDTH / img.width : 1;
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          const base64 = result.split(',')[1] ?? '';
          setImage({ data: base64, mimeType: 'image/jpeg', name: file.name });
          setImagePreview(result);
          return;
        }
        ctx.drawImage(img, 0, 0, w, h);
        const compressed = canvas.toDataURL('image/jpeg', 0.4);
        const base64 = compressed.split(',')[1] ?? '';
        setImage({ data: base64, mimeType: 'image/jpeg', name: file.name });
        setImagePreview(compressed);
      };
      img.onerror = () => setImageError(t('gen.errorImageRead'));
      img.src = result;
    };
    reader.onerror = () => setImageError(t('gen.errorImageRead'));
    reader.readAsDataURL(file);
  }, [t]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = '';
  }, [handleFile]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const clearImage = useCallback(() => {
    setImage(null);
    setImagePreview(null);
    setImageError(null);
  }, []);

  const runGenerate = useCallback(async () => {
    setError(null);
    if (!selectedContext) return;
    if (selectedContext.custom && !customContext.trim()) {
      setError(t('gen.errorNoContext'));
      return;
    }

    setLoading(true);
    setOptions([]);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      setOptions([{
        style: 'placeholder',
        label: translate(language, 'sedux.enginePlaceholder'),
        text: translate(language, 'sedux.engineBuilding'),
      }]);

      onGenerated({
        context: selectedContext.custom ? t('ctx.personalizado.label') : selectedContext.labelKey,
        tone: tone === 'outro' ? customTone.trim() || 'outro' : tone,
        input: input.trim(),
        output: translate(language, 'sedux.engineBuilding'),
      });
    } catch {
      setError(translate(language, 'sedux.engineBuilding'));
    } finally {
      setLoading(false);
    }
  }, [selectedContext, customContext, tone, customTone, input, t, onGenerated, language]);

  const handleGenerate = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!antiFlood.registerAction()) return;
    void runGenerate();
  }, [runGenerate, antiFlood]);

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
      {/* Hero */}
      <div className="text-center mb-8 animate-fade-up">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-slate-300 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-aura-zinc" />
          {t('gen.badge')}
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
          <span className="text-white">{t('gen.titleA')}</span>
          <span className="text-gradient">{t('gen.titleB')}</span>
        </h1>
        <p className="text-slate-400 mt-3 max-w-xl mx-auto">
          {t('gen.subtitle')}
        </p>
      </div>

      <form onSubmit={handleGenerate} className="grid lg:grid-cols-2 gap-6">
        {/* Left: controls */}
        <div className="space-y-6">
          <div className="glass rounded-2xl p-5 sm:p-6 space-y-6 animate-fade-up">
            <ContextGrid
              contexts={CONTEXTS}
              selected={contextId}
              onSelect={handleContextSelect}
              customContext={customContext}
              onCustomContextChange={handleCustomContextChange}
              language={language}
            />
            <ToneSelector
              value={tone}
              onChange={handleToneChange}
              customTone={customTone}
              onCustomToneChange={handleCustomToneChange}
              language={language}
            />

            {/* Intensity selector */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  {t('responses.intensity')}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {([
                  { id: 'fraca' as Intensity, key: 'intensity.fraca' as const },
                  { id: 'media' as Intensity, key: 'intensity.media' as const },
                  { id: 'forte' as Intensity, key: 'intensity.forte' as const },
                ]).map((opt) => {
                  const isActive = intensity === opt.id;
                  return (
                    <button
                      type="button"
                      key={opt.id}
                      onClick={() => setIntensity(opt.id)}
                      className={`py-3 rounded-xl border text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? 'border-aura-slate/60 bg-aura-slate/15 text-white glow-select'
                          : 'border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/[0.06] hover:border-white/20'
                      }`}
                    >
                      {t(opt.key)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main message input */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <MessageSquareText className="w-3.5 h-3.5 text-slate-400" />
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  {t('gen.messageLabel')}
                </p>
              </div>
              <SmartTextarea
                value={input}
                onChange={setInput}
                rows={6}
                placeholder={t('gen.messagePlaceholder')}
                clearLabel={t('common.clear')}
                pasteLabel={t('common.paste')}
              />
            </div>

            {/* Screenshot upload */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <ImagePlus className="w-3.5 h-3.5 text-slate-400" />
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  {t('gen.screenshotLabel')}
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPTED_TYPES.join(',')}
                onChange={handleFileInput}
                className="hidden"
              />

              {imagePreview ? (
                <div className="relative rounded-xl overflow-hidden border border-white/10 bg-ink-800/60">
                  <img
                    src={imagePreview}
                    alt={t('gen.screenshotAlt')}
                    className="w-full h-auto object-contain"
                  />
                  <div className="absolute top-2 right-2 flex items-center gap-2">
                    <button
                      onClick={clearImage}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-black/60 backdrop-blur text-white hover:bg-red-500/70 transition"
                      aria-label={t('gen.screenshotRemove')}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 px-3 py-2 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-xs text-slate-200 truncate">{image?.name}</p>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className="group cursor-pointer rounded-xl border-2 border-dashed border-white/15 bg-white/[0.02] hover:border-aura-slate/40 hover:bg-aura-slate/[0.05] transition p-6 text-center"
                >
                  <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-aura-slate/15 group-hover:border-aura-slate/30 transition">
                    <ImagePlus className="w-5 h-5 text-slate-400 group-hover:text-aura-slate transition" />
                  </div>
                  <p className="text-sm text-slate-300">
                    {t('gen.dropText')}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{t('gen.dropHint')}</p>
                </div>
              )}

              {imageError && (
                <p className="text-xs text-red-300 mt-2">{imageError}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !selectedContext || isCustomContext || antiFlood.isBlocked}
            className="group relative w-full inline-flex items-center justify-center gap-2.5 py-4 rounded-2xl text-base font-semibold text-white btn-gradient disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 animate-fade-up"
          >
            {antiFlood.isBlocked ? (
              <>
                <ShieldAlert className="w-5 h-5" />
                {antiFlood.cooldownLabel}
              </>
            ) : loading ? (
              <>
                <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin-slow" />
                {t('gen.generating')}
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                {t('gen.generate')}
              </>
            )}
          </button>
        </div>

        {/* Right: result */}
        <div ref={resultsRef} className="lg:sticky lg:top-24 self-start scroll-mt-24">
          <ResponseCards
            options={options}
            loading={loading}
            error={error}
            onRegenerate={() => runGenerate()}
            canRegenerate={!!selectedContext && !isCustomContext}
            language={language}
          />
        </div>
      </form>

      <ConfirmModal
        open={showClearModal}
        title={t('modal.clearTitle')}
        description={t('modal.clearDescription')}
        confirmLabel={t('modal.confirmClear')}
        cancelLabel={t('modal.cancel')}
        onConfirm={() => {
          setShowClearModal(false);
          setTimeout(() => {
            setInput('');
            setOptions([]);
            setError(null);
            setImage(null);
            setImagePreview(null);
            setImageError(null);
            setCustomContext('');
            setCustomTone('');
          }, 50);
        }}
        onCancel={() => setShowClearModal(false)}
      />
    </div>
  );
}

export default memo(AnalysisTab);
