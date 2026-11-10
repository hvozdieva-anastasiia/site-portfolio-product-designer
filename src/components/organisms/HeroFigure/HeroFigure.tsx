import type { ProcessStep, RiveConfig } from '../../../content/types';
import { useProcessCycle } from '../../../lib/useProcessCycle';
import { CharacterScene } from '../../illustrations/CharacterScene/CharacterScene';
import { ProcessCaption } from '../../molecules/ProcessCaption/ProcessCaption';
import { RiveSlot } from '../RiveSlot/RiveSlot';
import './HeroFigure.css';

type HeroFigureProps = {
  steps: ProcessStep[];
  rive: RiveConfig;
  /** Accessible names for the progress bar and the animation. */
  processLabel: string;
  characterLabel: string;
};

/**
 * One tall frame with the whole animated character in it and a single card
 * floating at its foot that says which step of the work she is acting out.
 * It fills the height its parent gives it.
 */
export function HeroFigure({
  steps,
  rive,
  processLabel,
  characterLabel,
}: HeroFigureProps) {
  const { step, reduced } = useProcessCycle(steps);
  const machine = reduced ? rive.idle : steps[step].machine;

  return (
    <div className="hero-figure">
      <div className="hero-figure-art">
        <RiveSlot
          src={rive.src}
          artboard={rive.artboard}
          machine={machine}
          label={characterLabel}
        >
          <CharacterScene />
        </RiveSlot>
      </div>
      <div className="hero-figure-card">
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
