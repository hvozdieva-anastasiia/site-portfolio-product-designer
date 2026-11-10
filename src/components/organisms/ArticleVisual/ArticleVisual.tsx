import { useState } from 'react';
import type { Article } from '../../../content/types';
import { ArticleArt } from '../../illustrations/ArticleArt/ArticleArt';
import './ArticleVisual.css';

/** The real article cover when it loads, otherwise the illustration. */
export function ArticleVisual({
  cover,
  coverAlt,
  art,
}: Pick<Article, 'cover' | 'coverAlt' | 'art'>) {
  const [failed, setFailed] = useState(false);
  if (failed || !cover) return <ArticleArt kind={art} />;
  return (
    <div className="mini-art mini-art--cover">
      <img
        src={cover}
        alt={coverAlt}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
