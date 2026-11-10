import type { ArticleArtKind } from '../../../content/types';
import { Glyph } from '../../atoms/Glyph/Glyph';
import { Skeleton } from '../../atoms/Skeleton/Skeleton';
import './ArticleArt.css';

/** Small skeleton illustrations that stand in for an article's cover. */
export function ArticleArt({ kind }: { kind: ArticleArtKind }) {
  return (
    <div className="mini-art" aria-hidden="true">
      {kind === 'questions' && (
        <div className="mini-doc mini-ask">
          <div className="ask-bubble">
            <span className="ask-mark">?</span>
            <Skeleton w="70%" tone="blue" />
          </div>
          <div className="ask-bubble">
            <span className="ask-mark">?</span>
            <Skeleton w="55%" />
          </div>
          <div className="ask-bubble ask-bubble--dim">
            <span className="ask-mark">?</span>
            <Skeleton w="80%" />
          </div>
          <div className="ask-frame" />
        </div>
      )}
      {kind === 'crowded' && (
        <div className="mini-doc mini-crowd">
          <div className="crowd-phone">
            <Skeleton w="40%" h={7} tone="ink" />
            <div className="crowd-promo" />
            <div className="crowd-row">
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="crowd-promo crowd-promo--b" />
            <div className="crowd-main">
              <Glyph tone="tomato" />
              <Skeleton w="55%" tone="tomato" />
            </div>
          </div>
        </div>
      )}
      {kind === 'hiring' && (
        <div className="mini-doc mini-stages">
          {[
            ['done', 70],
            ['done', 55],
            ['fail', 80],
            ['', 45],
          ].map(([state, w], i) => (
            <div className={`stage stage--${state || 'todo'}`} key={i}>
              <span className="stage-dot" />
              <Skeleton
                w={`${w}%`}
                tone={state === 'fail' ? 'tomato' : undefined}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
