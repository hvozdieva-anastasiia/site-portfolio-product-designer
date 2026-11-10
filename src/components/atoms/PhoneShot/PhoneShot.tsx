import type { CSSProperties } from 'react';
import type { Screen } from '../../../content/types';
import './PhoneShot.css';

/** Tallest frame shown: about an iPhone screen. Longer screens are cut at the bottom. */
const MAX_RATIO = 2.17;

type PhoneShotProps = Screen & {
  /** The first screens on a page load at once; the rest wait for the scroll. */
  loading?: 'lazy' | 'eager';
};

/** One app screen in a rounded device frame, always top-aligned. */
export function PhoneShot({
  src,
  alt,
  width,
  height,
  loading = 'lazy',
}: PhoneShotProps) {
  const ratio = Math.min(height / width, MAX_RATIO);
  return (
    <div
      className="phone-shot"
      style={{ '--phone-shot-ratio': `1 / ${ratio}` } as CSSProperties}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
      />
    </div>
  );
}
