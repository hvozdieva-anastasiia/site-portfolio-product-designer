import type { ReactNode } from 'react';
import type { ProcessStep, RiveConfig } from '../../../content/types';
import { Aurora } from '../../atoms/Aurora/Aurora';
import { Button, ButtonLink } from '../../atoms/Button/Button';
import { Display } from '../../atoms/Display/Display';
import { Glyph } from '../../atoms/Glyph/Glyph';
import { ProcessStage } from '../../organisms/ProcessStage/ProcessStage';
import './Hero.css';

type HeroProps = {
  /** The small plaque above the headline. */
  kicker: string;
  /** The headline. Use <br /> to set the line breaks. */
  title: ReactNode;
  summary: string;
  primaryAction: { label: string; href: string };
  secondaryAction: { label: string; onClick: () => void };
  steps: ProcessStep[];
  rive: RiveConfig;
  /** Accessible names for the process list and the animation. */
  processLabel: string;
  characterLabel: string;
};

/** The first screen: who I am, what I do, and how I work, played by the character. */
export function Hero({
  kicker,
  title,
  summary,
  primaryAction,
  secondaryAction,
  steps,
  rive,
  processLabel,
  characterLabel,
}: HeroProps) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container">
        <div className="hero-top">
          <div>
            <p className="hero-kicker">
              <Glyph tone="green" />
              {kicker}
            </p>
            <Display id="hero-title">{title}</Display>
          </div>
          <div className="hero-side">
            <p>{summary}</p>
            <div className="hero-actions">
              <ButtonLink variant="carbon" href={primaryAction.href}>
                {primaryAction.label}
              </ButtonLink>
              <Button onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            </div>
          </div>
        </div>
        <div className="hero-stage">
          <Aurora />
          <ProcessStage
            steps={steps}
            rive={rive}
            label={processLabel}
            characterLabel={characterLabel}
          />
        </div>
      </div>
    </section>
  );
}
