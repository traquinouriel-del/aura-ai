import { useEffect, useState } from 'react';

/**
 * Delays unmount until exit animation completes.
 * Pass `open` (the visible state). Returns `mounted` (render or not)
 * and `exiting` (apply exit animation class).
 *
 * Usage:
 *   const { mounted, exiting } = useExitAnimation(open, 250);
 *   if (!mounted) return null;
 *   <div className={exiting ? 'animate-fade-out' : 'animate-fade-up'} />
 */
export function useExitAnimation(open: boolean, exitMs = 250): { mounted: boolean; exiting: boolean } {
  const [mounted, setMounted] = useState(open);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      setExiting(false);
    } else if (mounted) {
      setExiting(true);
      const timer = setTimeout(() => {
        setMounted(false);
        setExiting(false);
      }, exitMs);
      return () => clearTimeout(timer);
    }
  }, [open, exitMs, mounted]);

  return { mounted, exiting };
}
