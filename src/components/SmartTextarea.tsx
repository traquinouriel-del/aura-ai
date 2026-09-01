import { useCallback, useEffect, useRef, useState } from 'react';
import { Trash2, ClipboardPaste } from 'lucide-react';

type Props = {
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
  className?: string;
  clearLabel?: string;
  pasteLabel?: string;
  maxLength?: number;
};

export default function SmartTextarea({
  value,
  onChange,
  rows = 6,
  placeholder,
  className,
  clearLabel,
  pasteLabel,
  maxLength = 800,
}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [pasteError, setPasteError] = useState<string | null>(null);

  const autoGrow = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 600)}px`;
  }, []);

  useEffect(() => { autoGrow(); }, [value, autoGrow]);

  const handleClear = useCallback(() => {
    onChange('');
    requestAnimationFrame(() => textareaRef.current?.focus());
  }, [onChange]);

  const handlePaste = useCallback(async () => {
    setPasteError(null);
    try {
      if (navigator.clipboard?.readText) {
        const text = await navigator.clipboard.readText();
        if (text.trim()) {
          onChange(text);
          requestAnimationFrame(() => textareaRef.current?.focus());
        }
        return;
      }
    } catch {
      // Fall through to execCommand fallback
    }

    // Fallback: execCommand('paste') — works in some browsers
    const el = textareaRef.current;
    if (el) {
      const prev = el.value;
      el.focus();
      const ok = document.execCommand('paste');
      if (ok && el.value !== prev) {
        onChange(el.value);
        return;
      }
    }

    // If both methods fail, instruct the user
    setPasteError('paste-fallback');
  }, [onChange]);

  const hasValue = value.trim().length > 0;
  const charCount = value.length;
  const showCounter = charCount > maxLength * 0.8;
  const isAtLimit = charCount >= maxLength;

  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        maxLength={maxLength}
        className={className ?? 'w-full min-h-[160px] bg-ink-800/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-aura-slate/50 focus:ring-2 focus:ring-aura-slate/20 transition resize-none overflow-y-auto'}
      />
      <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5">
        <button
          type="button"
          onClick={handlePaste}
          title={pasteLabel ?? 'Paste'}
          aria-label={pasteLabel ?? 'Paste'}
          className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-white/[0.06] border border-white/10 text-slate-400 hover:text-aura-slate hover:bg-aura-slate/15 hover:border-aura-slate/30 transition"
        >
          <ClipboardPaste className="w-3.5 h-3.5" />
        </button>
        {hasValue && (
          <button
            type="button"
            onClick={handleClear}
            title={clearLabel}
            aria-label={clearLabel}
            className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-white/[0.06] border border-white/10 text-slate-400 hover:text-red-300 hover:bg-red-500/15 hover:border-red-500/30 transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
      {showCounter && (
        <div
          className={`absolute bottom-2.5 left-3 text-[11px] font-medium tabular-nums pointer-events-none transition-opacity ${
            isAtLimit ? 'text-red-400' : 'text-slate-500'
          }`}
        >
          {charCount}/{maxLength}
        </div>
      )}
      {pasteError === 'paste-fallback' && (
        <p className="text-xs text-slate-500 mt-1.5">
          {pasteLabel ?? 'Paste'} — use Ctrl+V / long-press to paste manually.
        </p>
      )}
    </div>
  );
}
