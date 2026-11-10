import { useId, useState } from 'react';
import type { IceHypothesis } from '../../../content/types';
import { Button } from '../../atoms/Button/Button';
import './IceTable.css';

type IceTableProps = {
  items: IceHypothesis[];
  /** How many of the best-scored rows are marked as selected. */
  selected: number;
  /** Rows shown before "Show all". */
  initial?: number;
  caption: string;
};

/** ICE score: Impact × Confidence × Ease, each on a 1–10 scale. */
const iceScore = (item: IceHypothesis) =>
  item.impact * item.confidence * item.ease;

/**
 * Hypotheses ranked by ICE score. The selected ones are marked; the rest of
 * the backlog folds away behind a button so the table stays readable.
 */
export function IceTable({
  items,
  selected,
  initial = 8,
  caption,
}: IceTableProps) {
  const [expanded, setExpanded] = useState(false);
  const bodyId = useId();
  const ranked = [...items]
    .map((item) => ({ ...item, score: iceScore(item) }))
    .sort((a, b) => b.score - a.score);
  const rows = expanded ? ranked : ranked.slice(0, initial);
  const hidden = ranked.length - rows.length;

  return (
    <div className="ice">
      {/* Scrolls sideways on phones, so it is focusable for the keyboard. */}
      <div
        className="ice-scroll"
        tabIndex={0}
        role="region"
        aria-label={caption}
      >
        <table>
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Hypothesis</th>
              <th scope="col">
                <abbr title="Impact">I</abbr>
              </th>
              <th scope="col">
                <abbr title="Confidence">C</abbr>
              </th>
              <th scope="col">
                <abbr title="Ease">E</abbr>
              </th>
              <th scope="col">ICE score</th>
            </tr>
          </thead>
          <tbody id={bodyId}>
            {rows.map((row, index) => {
              const isSelected = index < selected;
              return (
                <tr key={row.title} data-selected={isSelected}>
                  <td className="ice-n">
                    {String(index + 1).padStart(2, '0')}
                  </td>
                  <th scope="row">
                    {row.title}
                    {isSelected && <span className="sr-only"> (selected)</span>}
                  </th>
                  <td>{row.impact}</td>
                  <td>{row.confidence}</td>
                  <td>{row.ease}</td>
                  <td>
                    <span className="ice-score">{row.score}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="ice-foot">
        <p>
          <span className="ice-key" aria-hidden="true" /> Top {selected}:
          selected for development
        </p>
        {(hidden > 0 || expanded) && (
          <Button
            aria-expanded={expanded}
            aria-controls={bodyId}
            onClick={() => setExpanded((value) => !value)}
          >
            {expanded ? 'Show fewer' : `Show all ${ranked.length}`}
          </Button>
        )}
      </div>
    </div>
  );
}
