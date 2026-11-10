import type { Screen } from '../../../content/types';
import { StoryHead } from '../../molecules/StoryHead/StoryHead';
import { ScreenStrip } from '../../organisms/ScreenStrip/ScreenStrip';
import './CaseFlow.css';

type CaseFlowProps = {
  kicker: string;
  title: string;
  text: string;
  steps: { label: string; screen: Screen }[];
};

/** The redesigned journey end to end, as numbered screens in order. */
export function CaseFlow({ kicker, title, text, steps }: CaseFlowProps) {
  return (
    <section
      className="section container case-flow"
      id="flow"
      aria-labelledby="case-flow-title"
    >
      <StoryHead
        id="case-flow-title"
        kicker={kicker}
        title={title}
        text={text}
      />
      <ScreenStrip
        screens={steps.map((step) => step.screen)}
        steps={steps.map((step) => step.label)}
        label="The redesigned user flow"
      />
    </section>
  );
}
