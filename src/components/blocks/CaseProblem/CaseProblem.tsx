import type {
  FunnelStep,
  NumberedPoint,
  Screen,
  Stat,
} from '../../../content/types';
import { Label } from '../../atoms/Label/Label';
import { PhoneShot } from '../../atoms/PhoneShot/PhoneShot';
import { NumberedCard } from '../../molecules/NumberedCard/NumberedCard';
import { StatFigure } from '../../molecules/StatFigure/StatFigure';
import { StoryHead } from '../../molecules/StoryHead/StoryHead';
import { FunnelChart } from '../../organisms/FunnelChart/FunnelChart';
import './CaseProblem.css';

type CaseProblemProps = {
  kicker: string;
  title: string;
  text: string;
  before?: Screen;
  dropOff?: Stat;
  funnel?: { title: string; period: string; steps: FunnelStep[]; note: string };
  stats?: Stat[];
  frictionTitle: string;
  friction: NumberedPoint[];
  question: string;
};

/**
 * The product problem with its evidence: the old screen, the funnel, the
 * headline numbers, the friction points behind them, and the question to solve.
 * Every piece of evidence is optional, so a case without analytics still reads
 * as problem, friction and question.
 */
export function CaseProblem({
  kicker,
  title,
  text,
  before,
  dropOff,
  funnel,
  stats,
  frictionTitle,
  friction,
  question,
}: CaseProblemProps) {
  return (
    <section
      className="section container case-problem"
      id="problem"
      aria-labelledby="case-problem-title"
    >
      <div
        className="case-problem-intro"
        data-solo={before ? undefined : 'true'}
      >
        <div>
          <StoryHead
            id="case-problem-title"
            kicker={kicker}
            title={title}
            text={text}
          />
          {dropOff && (
            <div className="case-problem-drop">
              <StatFigure size="lg" {...dropOff} />
            </div>
          )}
        </div>
        {before && (
          <figure className="case-problem-before">
            <Label>Before</Label>
            <PhoneShot {...before} />
          </figure>
        )}
      </div>

      {funnel && <FunnelChart kicker="Activation funnel" {...funnel} />}

      {stats && (
        <ul
          className="case-problem-stats"
          data-count={stats.length}
          aria-label="Key numbers"
        >
          {stats.map((stat) => (
            <li key={stat.label}>
              <StatFigure {...stat} />
            </li>
          ))}
        </ul>
      )}

      <h3 className="case-problem-sub">{frictionTitle}</h3>
      <ol className="case-problem-friction">
        {friction.map((point, index) => (
          <li key={point.title}>
            <NumberedCard n={index + 1} title={point.title} text={point.text} />
          </li>
        ))}
      </ol>

      <div className="case-problem-question">
        <Label>How might I</Label>
        <p>{question}</p>
      </div>
    </section>
  );
}
