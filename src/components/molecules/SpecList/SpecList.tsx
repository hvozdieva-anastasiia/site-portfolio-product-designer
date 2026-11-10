import type { ReactNode } from 'react';
import './SpecList.css';

/** A property sheet: hairline-separated rows of a label and its value. */
export function SpecList({ children }: { children: ReactNode }) {
  return <dl className="spec">{children}</dl>;
}

export function SpecRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="spec-row">
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
