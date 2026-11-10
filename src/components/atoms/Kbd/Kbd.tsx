import type { ReactNode } from 'react';
import './Kbd.css';

/** A keyboard-shortcut hint. Always decorative: the control carries aria-keyshortcuts. */
export function Kbd({ children }: { children: ReactNode }) {
  return <kbd aria-hidden="true">{children}</kbd>;
}
