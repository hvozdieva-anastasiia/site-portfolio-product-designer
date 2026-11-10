import type { SolutionDirection } from '../../../content/types';
import { Label } from '../../atoms/Label/Label';
import { PhoneShot } from '../../atoms/PhoneShot/PhoneShot';
import { ChipList } from '../../molecules/ChipList/ChipList';
import { RationaleStack } from '../../molecules/RationaleStack/RationaleStack';
import './SolutionCase.css';

type SolutionCaseProps = {
  n: number;
  direction: SolutionDirection;
};

/**
 * One solution direction: its title and why, then a window with the line of
 * reasoning on the left and the updated screens on the right.
 */
export function SolutionCase({ n, direction }: SolutionCaseProps) {
  const id = `direction-${n}`;
  return (
    <article className="solution" aria-labelledby={id}>
      <header className="solution-head">
        <p className="solution-n">Direction {String(n).padStart(2, '0')}</p>
        <h3 id={id}>{direction.title}</h3>
        <p className="solution-summary">{direction.summary}</p>
      </header>
      <div className="solution-window">
        <div className="solution-why">
          <Label>Design rationale</Label>
          <RationaleStack
            hypothesis={direction.hypothesis}
            insight={direction.insight}
            decision={direction.decision}
          />
        </div>
        <div className="solution-ui">
          <div className="solution-ui-top">
            <Label>Updated UI</Label>
            <ChipList label="What this changes" items={direction.tags} />
          </div>
          <ul
            className="solution-screens"
            data-count={direction.screens.length}
            aria-label={`Screens for ${direction.title}`}
          >
            {direction.screens.map((screen) => (
              <li key={screen.src}>
                <PhoneShot {...screen} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
