import { useCallback, useRef } from 'react';
import { X } from 'lucide-react';

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
  clearLabel?: string;
  type?: string;
  maxLength?: number;
};

export default function ClearableInput({
  value,
  onChange,
  placeholder,
  className,
  clearLabel,
  type = 'text',
  maxLength = 120,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClear = useCallback(() => {
    onChange('');
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [onChange]);

  const hasValue = value.trim().length > 0;

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        style={hasValue ? { paddingRight: '2.5rem' } : undefined}
        className={
          className ??
          'w-full bg-ink-800/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-aura-slate/50 focus:ring-2 focus:ring-aura-slate/20 transition'
        }
      />
      {hasValue && (
        <button
          type="button"
          onClick={handleClear}
          title={clearLabel}
          aria-label={clearLabel}
          className="absolute bottom-2 right-2.5 inline-flex items-center justify-center w-6 h-6 rounded-lg bg-white/[0.06] border border-white/10 text-slate-400 hover:text-red-300 hover:bg-red-500/15 hover:border-red-500/30 transition"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}
