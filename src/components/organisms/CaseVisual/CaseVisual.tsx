import { useState } from 'react';
import type { Case } from '../../../content/types';
import { CaseArt } from '../../illustrations/CaseArt/CaseArt';
import './CaseVisual.css';

/**
 * The real Behance cover when it loads, otherwise the illustration. Covers are
 * hotlinked from Behance's CDN; for a production site, export them into
 * public/cases/ and point `cover` at those files.
 */
export function CaseVisual({
  cover,
  coverAlt,
  art,
}: Pick<Case, 'cover' | 'coverAlt' | 'art'>) {
  const [failed, setFailed] = useState(false);
  if (failed || !cover) return <CaseArt kind={art} />;
  return (
    <div className="art art--cover">
      <div className="art-glow" aria-hidden="true" />
      <img
        src={cover}
        alt={coverAlt}
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
