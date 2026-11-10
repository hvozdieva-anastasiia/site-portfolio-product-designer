import type { NumberedPoint } from '../../../content/types';
import { ChipList } from '../../molecules/ChipList/ChipList';
import { NumberedCard } from '../../molecules/NumberedCard/NumberedCard';
import { StoryHead } from '../../molecules/StoryHead/StoryHead';
import './CaseResearch.css';

type CaseResearchProps = {
  kicker: string;
  title: string;
  text: string;
  methods: string[];
  goals: NumberedPoint[];
  /** The path a user has to walk, as short words. */
  journey: string[];
  journeyLabel?: string;
};

/** What research had to answer, and the path every user has to walk. */
export function CaseResearch({
  kicker,
  title,
  text,
  methods,
  goals,
  journey,
  journeyLabel = 'The user journey',
}: CaseResearchProps) {
  return (
    <section
      className="section container case-research"
      id="research"
      aria-labelledby="case-research-title"
    >
      <StoryHead
        id="case-research-title"
        kicker={kicker}
        title={title}
        text={text}
      >
        <ChipList label="Research methods" items={methods} />
      </StoryHead>
      <ol className="case-research-goals">
        {goals.map((goal, index) => (
          <li key={goal.title}>
            <NumberedCard n={index + 1} {...goal} />
          </li>
        ))}
      </ol>
      <ol className="case-research-journey" aria-label={journeyLabel}>
        {journey.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </section>
  );
}
