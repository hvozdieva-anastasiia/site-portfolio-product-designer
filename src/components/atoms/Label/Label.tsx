import type { ReactNode } from 'react';
import './Label.css';

/** The small uppercase caption. Use `legend` inside a fieldset. */
export function Label({
  as: Tag = 'p',
  children,
}: {
  as?: 'p' | 'legend';
  children: ReactNode;
}) {
  return <Tag className="label">{children}</Tag>;
}
