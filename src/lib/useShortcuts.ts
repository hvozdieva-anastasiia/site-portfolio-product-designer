import { useEffect } from 'react';

type Shortcuts = Record<string, () => void>;

/**
 * Single-key shortcuts such as C or D. They are ignored while typing, inside
 * dialogs and with any modifier key held.
 */
export function useShortcuts(shortcuts: Shortcuts) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest('input, textarea, select, dialog, [contenteditable]'))
        return;
      const action = shortcuts[event.key.toLowerCase()];
      if (!action) return;
      event.preventDefault();
      action();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [shortcuts]);
}
