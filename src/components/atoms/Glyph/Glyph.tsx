import './Glyph.css';

export type GlyphTone = 'blue' | 'green' | 'tomato' | 'amber';

/** A small status ring. Decorative, so it is hidden from assistive tech. */
export function Glyph({ tone }: { tone: GlyphTone }) {
  return <span className={`glyph glyph--${tone}`} aria-hidden="true" />;
}
