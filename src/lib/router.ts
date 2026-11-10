import { useSyncExternalStore } from 'react';

// A tiny History API router. It is enough for "/" and "/cases/:slug" and avoids
// a dependency. Production hosting needs a fallback to index.html for these paths.

export const withBase = (path: string) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;

function subscribe(onChange: () => void) {
  window.addEventListener('popstate', onChange);
  return () => window.removeEventListener('popstate', onChange);
}

export function usePath() {
  return useSyncExternalStore(
    subscribe,
    () => window.location.pathname.slice(import.meta.env.BASE_URL.replace(/\/$/, '').length) || '/',
    () => '/',
  );
}

export function navigate(to: string) {
  window.history.pushState(null, '', withBase(to));
  window.dispatchEvent(new PopStateEvent('popstate'));
  const hash = new URL(to, window.location.href).hash.slice(1);
  window.scrollTo({ top: 0, behavior: 'instant' });
  if (!hash) return;
  // A link like "/#cases": wait for the new page to render, then jump to it.
  requestAnimationFrame(() =>
    requestAnimationFrame(() =>
      document
        .getElementById(decodeURIComponent(hash))
        ?.scrollIntoView({ block: 'start', behavior: 'instant' }),
    ),
  );
}
