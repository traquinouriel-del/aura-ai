type Props = {
  className?: string;
};

export default function AuraLogo({ className = 'w-5 h-5' }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="aura-logo-grad" x1="4" y1="2" x2="28" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f1f5f9" />
          <stop offset="0.5" stopColor="#94a3b8" />
          <stop offset="1" stopColor="#475569" />
        </linearGradient>
        <radialGradient id="aura-logo-glow" cx="16" cy="16" r="14" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Subtle glow */}
      <circle cx="16" cy="16" r="14" fill="url(#aura-logo-glow)" />

      {/* Stylized 'A' — geometric, minimalist */}
      <path
        d="M16 4 L26 28 L21.5 28 L19.3 22.5 L12.7 22.5 L10.5 28 L6 28 L16 4 Z"
        fill="url(#aura-logo-grad)"
      />
      {/* Inner cut to create the 'A' counter */}
      <path
        d="M16 13.5 L18.2 19 L13.8 19 L16 13.5 Z"
        fill="#0a0a0f"
      />
    </svg>
  );
}
