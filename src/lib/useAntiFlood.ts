import { useState, useCallback, useRef, useEffect } from 'react';
import { useSettings } from '@/lib/settings';
import { translate } from '@/lib/i18n';

const COOLDOWN_MS = 2500;

export function useAntiFlood() {
  const { language } = useSettings();
  const [isBlocked, setIsBlocked] = useState(false);
  const [cooldownLabel, setCooldownLabel] = useState('');
  const lastActionRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const registerAction = useCallback((): boolean => {
    const now = Date.now();
    const elapsed = now - lastActionRef.current;
    if (elapsed < COOLDOWN_MS) {
      const remaining = Math.ceil((COOLDOWN_MS - elapsed) / 1000);
      setIsBlocked(true);
      setCooldownLabel(translate(language, 'antiflood.cooldown').replace('{s}', String(remaining)));
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        const rem = Math.ceil((COOLDOWN_MS - (Date.now() - lastActionRef.current)) / 1000);
        if (rem <= 0) {
          setIsBlocked(false);
          setCooldownLabel('');
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
        } else {
          setCooldownLabel(translate(language, 'antiflood.cooldown').replace('{s}', String(rem)));
        }
      }, 1000);
      return false;
    }
    lastActionRef.current = now;
    return true;
  }, [language]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return { registerAction, isBlocked, cooldownLabel };
}
