import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Trash2, X } from 'lucide-react';
import { useExitAnimation } from '@/lib/useExitAnimation';

type Props = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  open,
  title,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: Props) {
  const { mounted, exiting } = useExitAnimation(open, 250);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onCancel]);

  if (!mounted || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm ${exiting ? 'animate-fade-out-backdrop' : 'animate-fade-up'}`}
        onClick={onCancel}
      />

      {/* Card */}
      <div className={`relative w-full max-w-md glass-strong rounded-3xl p-6 sm:p-8 border border-white/15 ${exiting ? 'animate-fade-out' : 'animate-fade-up'}`}>
        {/* Close */}
        <button
          type="button"
          onClick={onCancel}
          aria-label={cancelLabel}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title */}
        <h2 className="font-display text-xl sm:text-2xl font-bold text-center mb-3 text-white">
          {title}
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-[15px] text-slate-300 text-center leading-relaxed mb-7">
          {description}
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl text-sm font-semibold border border-white/10 text-slate-200 hover:bg-white/5 transition"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
            }}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition btn-gradient"
          >
            <Trash2 className="w-4 h-4 text-white" />
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
