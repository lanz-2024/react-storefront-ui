import { type RefObject, useEffect } from 'react';

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  'details > summary',
  'audio[controls]',
  'video[controls]',
].join(', ');

/**
 * Traps keyboard focus within a container element when `active` is true.
 * Focuses the first focusable element on activation.
 * Tab and Shift+Tab wrap around within the trap boundary.
 *
 * @param ref - Ref to the container element that defines the trap boundary
 * @param active - Whether the focus trap is currently active
 */
export function useFocusTrap(ref: RefObject<HTMLElement | null>, active: boolean): void {
  useEffect(() => {
    if (!active || !ref.current) return;

    const el = ref.current;
    const getFocusable = (): HTMLElement[] =>
      Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)).filter(
        (node) => !node.closest('[hidden]') && !node.closest('[aria-hidden="true"]'),
      );

    // Focus first element on mount
    const focusable = getFocusable();
    const previouslyFocused = document.activeElement as HTMLElement | null;
    focusable[0]?.focus();

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key !== 'Tab') return;

      const current = getFocusable();
      if (current.length === 0) return;

      const first = current[0];
      const last = current[current.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first || !el.contains(document.activeElement)) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last || !el.contains(document.activeElement)) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    el.addEventListener('keydown', handleKeyDown);

    return () => {
      el.removeEventListener('keydown', handleKeyDown);
      // Restore focus to previously focused element when trap deactivates
      previouslyFocused?.focus?.();
    };
  }, [active, ref]);
}
