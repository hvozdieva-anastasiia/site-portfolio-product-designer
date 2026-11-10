import type { ReactNode } from 'react';
import './OutcomeLine.css';

/** One quiet fact, optionally led by a highlighted value. */
export function OutcomeLine({
  value,
  children,
}: {
  value?: string;
  children: ReactNode;
}) {
  return (
    <p className="outcome">
      {value !== undefined && <strong>{value}</strong>} {children}
    </p>
  );
}
