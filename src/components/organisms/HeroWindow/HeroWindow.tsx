import type { ReactNode } from 'react';
import type { ProcessStep, RiveConfig } from '../../../content/types';
import { useProcessCycle } from '../../../lib/useProcessCycle';
import { Button, ButtonLink } from '../../atoms/Button/Button';
import { Display } from '../../atoms/Display/Display';
import { Glyph } from '../../atoms/Glyph/Glyph';
import { CharacterScene } from '../../illustrations/CharacterScene/CharacterScene';
import { ProcessCaption } from '../../molecules/ProcessCaption/ProcessCaption';
import { RiveSlot } from '../RiveSlot/RiveSlot';
import './HeroWindow.css';

type HeroWindowProps = {
  /** The small plaque above the headline. */
  kicker: string;
  /** The headline. Use <br /> to set the line breaks. */
  title: ReactNode;
  summary: string;
  primaryAction: { label: string; href: string };
  secondaryAction: { label: string; onClick: () => void };
  steps: ProcessStep[];
  rive: RiveConfig;
  /** Accessible names for the progress bar and the animation. */
  processLabel: string;
  characterLabel: string;
};

/**
 * One window holding the whole first screen: the pitch on the left, the
 * animated character on the right with the current step written under her.
 * It fills the height its parent gives it, and the character is fitted inside
 * her panel, so she is never cropped.
 */
export function HeroWindow({
  kicker,
  title,
  summary,
  primaryAction,
  secondaryAction,
  steps,
  rive,
  processLabel,
  characterLabel,
}: HeroWindowProps) {
  const { step, reduced } = useProcessCycle(steps);
  const machine = reduced ? rive.idle : steps[step].machine;

  return (
    <div className="hero-win">
      <div className="hero-win-copy">
        <p className="hero-win-kicker">
          <Glyph tone="green" />
          {kicker}
        </p>
        <Display id="hero-title">{title}</Display>
        <p className="hero-win-summary">{summary}</p>
        <div className="hero-win-actions">
          <ButtonLink variant="carbon" href={primaryAction.href}>
            {primaryAction.label}
          </ButtonLink>
          <Button onClick={secondaryAction.onClick}>
            {secondaryAction.label}
          </Button>
        </div>
      </div>
      <div className="hero-win-char">
        <div className="hero-win-art">
          <RiveSlot
            src={rive.src}
            artboard={rive.artboard}
            machine={machine}
            label={characterLabel}
          >
            <CharacterScene />
          </RiveSlot>
        </div>
        <ProcessCaption
          label={processLabel}
          steps={steps}
          activeIndex={step}
          mode={reduced ? 'static' : 'cycling'}
        />
      </div>
    </div>
  );
}
