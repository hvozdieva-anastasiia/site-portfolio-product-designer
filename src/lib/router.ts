import { useSyncExternalStore } from 'react';

// A tiny History API router. It is enough for "/" and "/cases/:slug" and avoids
// a dependency. Production hosting needs a fallback to index.html for these paths.

export const withBase = (path: string) =>
  `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;

function subscribe(onChange: () => void) {
  window.addEventListener('popstate', onChange);
  return () => window.removeEventListener('popstate', onChange);
}

export function usePath() {
  return useSyncExternalStore(
    subscribe,
    () =>
      window.location.pathname.slice(
        import.meta.env.BASE_URL.replace(/\/$/, '').length,
      ) || '/',
    () => '/',
  );
}

export function navigate(to: string) {
  const target = new URL(withBase(to), window.location.href);
  const samePage = target.pathname === window.location.pathname;
  window.history.pushState(null, '', withBase(to));
  window.dispatchEvent(new PopStateEvent('popstate'));
  const hash = decodeURIComponent(target.hash.slice(1));
  if (samePage) {
    // Still on this page: slide to the section (or back to the top). The
    // behavior comes from CSS, so reduced-motion visitors get an instant jump.
    if (hash) {
      document.getElementById(hash)?.scrollIntoView({ block: 'start' });
    } else {
      window.scrollTo({ top: 0 });
    }
    return;
  }
  window.scrollTo({ top: 0, behavior: 'instant' });
  if (!hash) return;
  // A link like "/#cases": wait for the new page to render, then jump to it.
  requestAnimationFrame(() =>
    requestAnimationFrame(() =>
      document
        .getElementById(hash)
        ?.scrollIntoView({ block: 'start', behavior: 'instant' }),
    ),
  );
}
