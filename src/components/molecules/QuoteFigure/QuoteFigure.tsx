import type { ReactNode } from 'react';
import { Avatar } from '../../atoms/Avatar/Avatar';
import './QuoteFigure.css';

/** Longer recommendations get a smaller serif so every one fits its panel. */
function sizeClass(quote: string) {
  if (quote.length > 650) return ' quote--xl';
  if (quote.length > 320) return ' quote--long';
  return '';
}

type QuoteFigureProps = {
  quote: string;
  name: string;
  role: string;
  /** Small line under the role, such as how the author knows the person. */
  meta: string;
  /** Inactive quotes are hidden and inert; the parent decides which is active. */
  active: boolean;
  label: string;
  /** Extra content under the author, such as a link to the full text. */
  children?: ReactNode;
};

/** A centred serif quotation with its author. */
export function QuoteFigure({
  quote,
  name,
  role,
  meta,
  active,
  label,
  children,
}: QuoteFigureProps) {
  return (
    <figure
      className={`quote${sizeClass(quote)}`}
      data-active={active}
      inert={!active}
      aria-label={label}
    >
      <blockquote>“{quote}”</blockquote>
      <figcaption>
        <Avatar name={name} />
        <span className="quote-name">{name}</span>
        <span className="quote-role">{role}</span>
        <span className="quote-meta">{meta}</span>
        {children}
      </figcaption>
    </figure>
  );
}
