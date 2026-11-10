import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Steps a counter through `steps`, waiting `ms` on each one. With reduced
 * motion enabled it never advances on its own and reports `reduced`.
 *
 * Optional controls for interactive versions:
 * - `select(i)` jumps to a step and restarts its timer (`run` changes, so a
 *   progress bar keyed on it starts over).
 * - `togglePaused()` stops and resumes the cycle; the time left on the step is
 *   kept, so a CSS bar paused with `animation-play-state` stays in sync.
 * - `chosen` is true once a visitor has picked a step themselves.
 */
export function useProcessCycle(steps: { ms: number }[]) {
  const [step, setStep] = useState(0);
  const [run, setRun] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Time left on the current step after a pause; null means "start fresh".
  const pending = useRef<number | null>(null);
  const clock = useRef({ started: 0, duration: 0 });

  useEffect(() => {
    if (reduced || paused) return;
    const duration = pending.current ?? steps[step].ms;
    clock.current = { started: performance.now(), duration };
    const timer = window.setTimeout(() => {
      pending.current = null;
      setStep((current) => (current + 1) % steps.length);
    }, duration);
    return () => window.clearTimeout(timer);
  }, [step, run, paused, reduced, steps]);

  const select = useCallback((index: number) => {
    pending.current = null;
    setStep(index);
    setRun((current) => current + 1);
  }, []);

  const togglePaused = useCallback(() => {
    if (!paused) {
      const { started, duration } = clock.current;
      pending.current = Math.max(0, duration - (performance.now() - started));
    }
    setPaused(!paused);
  }, [paused]);

  return { step, reduced, run, paused, chosen: run > 0, select, togglePaused };
}
