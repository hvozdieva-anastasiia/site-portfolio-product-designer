import type { SolutionDirection } from '../../../content/types';
import { StoryHead } from '../../molecules/StoryHead/StoryHead';
import { SolutionCase } from '../../organisms/SolutionCase/SolutionCase';
import './CaseSolution.css';

type CaseSolutionProps = {
  kicker: string;
  title: string;
  text: string;
  directions: SolutionDirection[];
};

/** How the hypotheses became design: one window per direction, with its screens. */
export function CaseSolution({
  kicker,
  title,
  text,
  directions,
}: CaseSolutionProps) {
  return (
    <section
      className="section container case-solution"
      id="solution"
      aria-labelledby="case-solution-title"
    >
      <StoryHead
        id="case-solution-title"
        kicker={kicker}
        title={title}
        text={text}
      />
      <ol className="case-solution-list">
        {directions.map((direction, index) => (
          <li key={direction.title}>
            <SolutionCase n={index + 1} direction={direction} />
          </li>
        ))}
      </ol>
    </section>
  );
}
