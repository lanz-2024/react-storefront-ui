import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Returns `true` when the user has requested reduced motion via OS/browser settings.
 * Components should use this to disable or simplify animations.
 *
 * @example
 * const reduceMotion = useReducedMotion();
 * const duration = reduceMotion ? 0 : 300;
 */
export function useReducedMotion(): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    // SSR-safe: default to false when window is unavailable
    if (typeof window === 'undefined') return false;
    return window.matchMedia(QUERY).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia(QUERY);
    setMatches(mql.matches);

    const onChange = (e: MediaQueryListEvent): void => setMatches(e.matches);
    mql.addEventListener('change', onChange);

    return () => mql.removeEventListener('change', onChange);
  }, []);

  return matches;
}
