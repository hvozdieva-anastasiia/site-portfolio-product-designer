import { useEffect, useRef, useState, type ReactNode } from 'react';
import './RiveSlot.css';

// Minimal typings for the parts of the Rive canvas runtime we use.
type RiveInstance = {
  play(names?: string | string[]): void;
  stop(names?: string | string[]): void;
  pause(): void;
  resizeDrawingSurfaceToCanvas(): void;
  cleanup(): void;
};
type RiveLib = {
  Rive: new (options: {
    src: string;
    canvas: HTMLCanvasElement;
    artboard?: string;
    autoplay: boolean;
    layout?: unknown;
    onLoad?: () => void;
    onLoadError?: () => void;
  }) => RiveInstance;
  Layout: new (options: { fit: unknown; alignment: unknown }) => unknown;
  Fit: { Contain: unknown };
  Alignment: { Center: unknown };
  RuntimeLoader: {
    setWasmUrl(url: string): void;
    setWasmFallbackUrl?(url: string): void;
  };
};

// The runtime and WASM are self-hosted in public/rive/, built from the same
// version as the .riv, and loaded only when a character is about to be seen.
let runtime: Promise<RiveLib> | undefined;

function loadRuntime() {
  runtime ??= new Promise<RiveLib>((resolve, reject) => {
    const settle = () => {
      const lib = (window as unknown as { rive: RiveLib }).rive;
      lib.RuntimeLoader.setWasmUrl(`${import.meta.env.BASE_URL}rive/rive.wasm`);
      lib.RuntimeLoader.setWasmFallbackUrl?.(`${import.meta.env.BASE_URL}rive/rive_fallback.wasm`);
      resolve(lib);
    };
    if ((window as unknown as { rive?: RiveLib }).rive) return settle();
    const script = document.createElement('script');
    script.src = `${import.meta.env.BASE_URL}rive/rive.js`;
    script.async = true;
    script.onload = settle;
    script.onerror = () => {
      runtime = undefined;
      reject(new Error('Rive runtime failed to load'));
    };
    document.head.appendChild(script);
  });
  return runtime;
}

type RiveSlotProps = {
  /** Path to the .riv file. */
  src: string;
  artboard: string;
  /** State machine to play. Changing it switches the clip without a reload. */
  machine: string;
  /** Accessible description of the animation. */
  label: string;
  /** Reports when the animation is ready or the static fallback is needed. */
  onLoadResult?: (loaded: boolean) => void;
  /** Static illustration, shown until the animation is ready or if it fails. */
  children: ReactNode;
};

export function RiveSlot({
  src,
  artboard,
  machine,
  label,
  onLoadResult,
  children,
}: RiveSlotProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const instanceRef = useRef<RiveInstance | null>(null);
  const wantedRef = useRef(machine);
  const playingRef = useRef('');
  const visibleRef = useRef(false);
  const [near, setNear] = useState(false);
  const [ready, setReady] = useState(false);

  // Always remember the latest requested clip for the load callback.
  useEffect(() => {
    wantedRef.current = machine;
  }, [machine]);

  // Start loading once the slot is close to the viewport; pause when it is not
  // on screen, so off-screen characters cost nothing.
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting || entry.boundingClientRect.top < 1200) {
          setNear(true);
        }
        const instance = instanceRef.current;
        if (!instance) return;
        if (entry.isIntersecting) {
          if (playingRef.current !== wantedRef.current) instance.stop();
          instance.play(wantedRef.current);
          playingRef.current = wantedRef.current;
        } else {
          instance.pause();
        }
      },
      { rootMargin: '400px 0px' },
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  // Create the Rive instance once.
  useEffect(() => {
    if (!near) return;
    let cancelled = false;
    let instance: RiveInstance | undefined;
    const canvas = canvasRef.current;
    loadRuntime()
      .then((lib) => {
        if (cancelled || !canvas) return;
        instance = new lib.Rive({
          src,
          canvas,
          artboard,
          autoplay: false,
          layout: new lib.Layout({
            fit: lib.Fit.Contain,
            alignment: lib.Alignment.Center,
          }),
          onLoad: () => {
            if (cancelled) return;
            instance?.resizeDrawingSurfaceToCanvas();
            instanceRef.current = instance ?? null;
            instance?.play(wantedRef.current);
            playingRef.current = wantedRef.current;
            setReady(true);
            onLoadResult?.(true);
          },
          onLoadError: () => {
            if (!cancelled) onLoadResult?.(false);
          },
        });
      })
      .catch(() => {
        if (!cancelled) onLoadResult?.(false);
      });
    const observer = new ResizeObserver(() =>
      instance?.resizeDrawingSurfaceToCanvas(),
    );
    if (canvas) observer.observe(canvas);
    return () => {
      cancelled = true;
      observer.disconnect();
      instance?.cleanup();
      instanceRef.current = null;
    };
  }, [near, src, artboard, onLoadResult]);

  // Switch clips on the same canvas.
  useEffect(() => {
    const instance = instanceRef.current;
    if (!ready || !instance || !visibleRef.current) return;
    if (playingRef.current === machine) return;
    instance.stop();
    instance.play(machine);
    playingRef.current = machine;
  }, [machine, ready]);

  return (
    <div className="rive-slot" ref={hostRef}>
      <div hidden={ready}>{children}</div>
      <canvas
        ref={canvasRef}
        className="rive-canvas"
        hidden={!ready}
        role="img"
        aria-label={label}
      />
    </div>
  );
}
