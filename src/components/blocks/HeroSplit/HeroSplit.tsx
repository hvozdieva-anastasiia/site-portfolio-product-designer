import type { ReactNode } from 'react';
import type { ProcessStep, RiveConfig } from '../../../content/types';
import { Aurora } from '../../atoms/Aurora/Aurora';
import { Button, ButtonLink } from '../../atoms/Button/Button';
import { Display } from '../../atoms/Display/Display';
import { Glyph } from '../../atoms/Glyph/Glyph';
import { FactStrip } from '../../molecules/FactStrip/FactStrip';
import { HeroFigure } from '../../organisms/HeroFigure/HeroFigure';
import './HeroSplit.css';

type HeroSplitProps = {
  /** The small line above the headline. */
  kicker: string;
  /** The headline. Use <br /> to set the line breaks. */
  title: ReactNode;
  summary: string;
  primaryAction: { label: string; href: string };
  secondaryAction: { label: string; onClick: () => void };
  /** Three or so plain facts, set under a hairline at the foot of the text. */
  facts: { label: string; value: string }[];
  steps: ProcessStep[];
  rive: RiveConfig;
  /** Accessible names for the progress bar and the animation. */
  processLabel: string;
  characterLabel: string;
};

/**
 * The first screen as a split: the claim in large type on the left, one tall
 * frame with the whole character on the right, both the height of the
 * viewport. Nothing of the next section shows. On phones the text comes first
 * and the frame follows.
 */
export function HeroSplit({
  kicker,
  title,
  summary,
  primaryAction,
  secondaryAction,
  facts,
  steps,
  rive,
  processLabel,
  characterLabel,
}: HeroSplitProps) {
  return (
    <section className="hero-split" aria-labelledby="hero-title">
      <div className="container hero-split-stage">
        <Aurora />
        <div className="hero-split-copy">
          <div className="hero-split-main">
            <p className="hero-split-kicker">
              <Glyph tone="green" />
              {kicker}
            </p>
            <Display id="hero-title">{title}</Display>
            <p className="hero-split-summary">{summary}</p>
            <div className="hero-split-actions">
              <ButtonLink variant="carbon" href={primaryAction.href}>
                {primaryAction.label}
              </ButtonLink>
              <Button onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            </div>
          </div>
          <FactStrip facts={facts} />
        </div>
        <div className="hero-split-figure">
          <HeroFigure
            steps={steps}
            rive={rive}
            processLabel={processLabel}
            characterLabel={characterLabel}
          />
        </div>
      </div>
    </section>
  );
}
