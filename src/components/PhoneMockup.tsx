import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  floating?: boolean;
  delay?: number;
};

export default function PhoneMockup({ children, className = '', floating = false, delay = 0 }: Props) {
  return (
    <div
      className={`relative ${floating ? 'animate-float' : ''} ${className}`}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    >
      {/* Glow behind phone */}
      <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-b from-aura-slate/10 to-transparent blur-2xl pointer-events-none" />

      {/* Phone frame */}
      <div className="relative w-[260px] sm:w-[280px] mx-auto">
        <div className="relative rounded-[2.2rem] border border-white/15 bg-ink-900 p-2 shadow-2xl shadow-black/60">
          {/* Screen */}
          <div className="rounded-[1.8rem] overflow-hidden bg-ink-800 border border-white/5">
            {/* Notch */}
            <div className="relative h-6 bg-ink-900 flex items-center justify-center">
              <div className="w-20 h-4 rounded-b-xl bg-ink-900 border-x border-b border-white/10" />
            </div>
            {/* Content */}
            <div className="px-3 py-3 min-h-[420px] max-h-[480px] overflow-hidden">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
