import type { ReactNode } from 'react';
import './MediaGrid.css';

/** A three-column list of cards that collapses to one column on small screens. */
export function MediaGrid({ children }: { children: ReactNode }) {
  return <ul className="triple">{children}</ul>;
}
