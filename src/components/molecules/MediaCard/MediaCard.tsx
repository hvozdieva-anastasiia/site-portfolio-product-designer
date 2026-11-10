import type { ReactNode } from 'react';
import './MediaCard.css';

type MediaCardProps = {
  href: string;
  /** The picture or illustration at the top of the card. */
  media: ReactNode;
  meta: string;
  title: string;
  text?: string;
  linkLabel: string;
};

/** A card that links out to an article or a video. */
export function MediaCard({
  href,
  media,
  meta,
  title,
  text,
  linkLabel,
}: MediaCardProps) {
  return (
    <a className="media-card" href={href} target="_blank" rel="noreferrer">
      {media}
      <span className="media-meta">{meta}</span>
      <span className="media-title">{title}</span>
      {text && <span className="media-text">{text}</span>}
      <span className="media-link">
        {linkLabel} <span aria-hidden="true">↗</span>
      </span>
    </a>
  );
}
