import { useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark';

const KEY = 'theme';
const COLORS: Record<Theme, string> = { light: '#ffffff', dark: '#0c0c0d' };
const listeners = new Set<() => void>();

// The first value is applied by a small inline script in index.html, before
// paint, so the page never flashes the wrong theme.
function read(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', COLORS[theme]);
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    /* private mode: the choice just won't persist */
  }
  listeners.forEach((listener) => listener());
}

export function toggleTheme() {
  setTheme(read() === 'dark' ? 'light' : 'dark');
}

export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, read, () => 'light');
}
