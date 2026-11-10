import type { Quote } from '../../../content/types';
import { Label } from '../../atoms/Label/Label';
import './RationaleStack.css';

type RationaleStackProps = {
  hypothesis: string;
  insight?: Quote;
  decision: string[];
};

/**
 * Why a screen looks the way it does, top to bottom: the hypothesis, what
 * research found (when there is something to cite), and the design decision
 * that followed.
 */
export function RationaleStack({
  hypothesis,
  insight,
  decision,
}: RationaleStackProps) {
  return (
    <ol className="rationale">
      <li className="rationale-card">
        <Label>Hypothesis</Label>
        <p>{hypothesis}</p>
      </li>
      {insight && (
        <li className="rationale-card rationale-card--insight">
          <Label>User insight</Label>
          <figure>
            <blockquote>“{insight.text}”</blockquote>
            <figcaption>{insight.source}</figcaption>
          </figure>
        </li>
      )}
      <li className="rationale-card rationale-card--decision">
        <Label>Design decision</Label>
        {decision.length === 1 ? (
          <p>{decision[0]}</p>
        ) : (
          <ul>
            {decision.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        )}
      </li>
    </ol>
  );
}
