import { type RefObject, useEffect } from 'react';

/**
 * Fires `handler` when a click or touch event occurs outside `ref`.
 * Useful for dismissing dropdowns, modals, and popovers.
 *
 * @param ref - Ref to the element to track
 * @param handler - Callback fired when a click outside is detected
 * @param enabled - Whether the listener is active (default: true)
 */
export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent) => void,
  enabled = true,
): void {
  useEffect(() => {
    if (!enabled) return;

    const listener = (event: MouseEvent | TouchEvent): void => {
      const el = ref.current;
      if (!el || el.contains(event.target as Node)) return;
      handler(event);
    };

    // Use capture phase so the click reaches this listener before React's synthetic events
    document.addEventListener('mousedown', listener, true);
    document.addEventListener('touchstart', listener, true);

    return () => {
      document.removeEventListener('mousedown', listener, true);
      document.removeEventListener('touchstart', listener, true);
    };
  }, [ref, handler, enabled]);
}
