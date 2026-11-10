import type { ReactNode } from 'react';
import { Label } from '../../atoms/Label/Label';
import './SectionHead.css';

type SectionHeadProps = {
  id: string;
  kicker: string;
  first: string;
  second: string;
  /** Optional action aligned to the right, such as a link. */
  children?: ReactNode;
};

/** Two-tone heading: Ink first line, Ash second line. */
export function SectionHead({
  id,
  kicker,
  first,
  second,
  children,
}: SectionHeadProps) {
  return (
    <div className="section-head">
      <div>
        <Label>{kicker}</Label>
        <h2 id={id}>
          {first} <span className="muted">{second}</span>
        </h2>
      </div>
      {children}
    </div>
  );
}
