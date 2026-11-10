import type { ArticleArtKind } from '../../../content/types';
import { Glyph } from '../../atoms/Glyph/Glyph';
import { Skeleton } from '../../atoms/Skeleton/Skeleton';
import './ArticleArt.css';

// Each preview plays out the article's thesis. Questions fills a vague
// brief's gaps before the frame fills; an audit strips a crowded home
// screen down to the user's task; the scorecard quietly outgrows the brief.

function Questions() {
  return (
    <>
      <div className="mini-doc mini-quest">
        <div className="q-top">
          <div className="q-brief">
            <span className="q-who" />
            <div className="q-lines">
              <Skeleton w="82%" h={7} tone="ink" />
              <div className="q-gaps">
                <span className="q-miss" />
                <span className="q-miss" />
                <Skeleton w="34%" />
              </div>
              <Skeleton w="55%" />
            </div>
          </div>
          <div className="q-pair">
            <div className="q-bubble q-bubble--q">
              <span className="q-mark">?</span>
              <Skeleton w={56} tone="blue" />
            </div>
            <div className="q-bubble q-bubble--a">
              <span className="q-who q-who--s" />
              <Skeleton w={42} />
            </div>
            <div className="q-bubble q-bubble--q q-bubble--dim">
              <span className="q-mark">?</span>
              <Skeleton w={36} tone="blue" />
            </div>
          </div>
        </div>
        <div className="q-frame">
          <Skeleton w="34%" h={7} tone="ink" />
          <div className="q-cells">
            <Skeleton h={26} tone="blue" />
            <span className="q-slot" />
            <span className="q-slot q-slot--next" />
          </div>
          <div className="q-cells">
            <Skeleton h={16} />
            <span className="q-slot q-slot--s" />
            <Skeleton h={16} />
          </div>
        </div>
      </div>
      <div className="art-note art-note--tr">
        <Glyph tone="blue" /> answer 2 of 3
      </div>
    </>
  );
}

function Crowded() {
  return (
    <>
      <div className="mini-doc mini-audit">
        <div className="au-phone">
          <span className="au-notch" />
          <div className="au-promo">
            <i className="au-dot au-dot--t" />
          </div>
          <div className="au-apps">
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="au-task">
            <Skeleton w="58%" />
          </div>
          <div className="au-promo au-promo--s">
            <i className="au-dot au-dot--a" />
          </div>
          <div className="au-strip">
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className="au-audit">
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
            <path
              d="M1 6h14m0 0-4.5-4.5M15 6l-4.5 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
          audit
        </div>
        <div className="au-phone au-phone--clean">
          <span className="au-notch" />
          <div className="au-gone" />
          <div className="au-main">
            <Skeleton w="52%" h={7} tone="ink" />
            <Skeleton w="80%" h={9} tone="blue" />
          </div>
          <div className="au-gone au-gone--s" />
          <div className="au-gone au-gone--s" />
        </div>
      </div>
      <div className="art-note art-note--tr">
        <Glyph tone="tomato" /> every block is a team's metric
      </div>
    </>
  );
}

function Hiring() {
  return (
    <>
      <div className="mini-doc mini-score">
        <div className="sc-card">
          <div className="sc-col">
            <span className="sc-label">In the brief</span>
            <span className="sc-item">
              <i className="sc-tick" />
              <Skeleton w="78%" />
            </span>
            <span className="sc-item">
              <i className="sc-tick" />
              <Skeleton w="62%" />
            </span>
            <span className="sc-item">
              <i className="sc-tick" />
              <Skeleton w="70%" />
            </span>
          </div>
          <div className="sc-col">
            <span className="sc-label">Scored on</span>
            <span className="sc-item">
              <i className="sc-tick sc-tick--ok" />
              <Skeleton w="74%" />
            </span>
            <span className="sc-item">
              <i className="sc-tick sc-tick--ok" />
              <Skeleton w="58%" />
            </span>
            <span className="sc-item">
              <i className="sc-tick sc-tick--ok" />
              <Skeleton w="68%" />
            </span>
            <span className="sc-item sc-item--flag">
              <i className="sc-tick sc-tick--q">?</i>
              <Skeleton w="72%" tone="tomato" />
            </span>
            <span className="sc-item sc-item--flag">
              <i className="sc-tick sc-tick--q">?</i>
              <Skeleton w="54%" tone="tomato" />
            </span>
          </div>
        </div>
        <div className="sc-alt">
          <Glyph tone="green" /> live session · 45 min
        </div>
      </div>
      <div className="art-note art-note--bl">
        <Glyph tone="tomato" /> scored 5 · stated 3
      </div>
    </>
  );
}

/** Small skeleton illustrations that stand in for an article's cover. */
export function ArticleArt({ kind }: { kind: ArticleArtKind }) {
  return (
    <div className={`mini-art mini-art--${kind}`} aria-hidden="true">
      {kind === 'questions' && <Questions />}
      {kind === 'crowded' && <Crowded />}
      {kind === 'hiring' && <Hiring />}
    </div>
  );
}
