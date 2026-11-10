import type { ProcessStep, RiveConfig } from '../../../content/types';
import { useProcessCycle } from '../../../lib/useProcessCycle';
import { CharacterScene } from '../../illustrations/CharacterScene/CharacterScene';
import { ProcessList } from '../../molecules/ProcessList/ProcessList';
import { RiveSlot } from '../RiveSlot/RiveSlot';
import './ProcessStage.css';

type ProcessStageProps = {
  steps: ProcessStep[];
  rive: RiveConfig;
  /** Accessible name for the list and the animation. */
  label: string;
  characterLabel: string;
};

/**
 * Process lines on the left, the animated character on the right. Each line
 * stays on screen for as long as its clip plays, then the next one starts.
 */
export function ProcessStage({
  steps,
  rive,
  label,
  characterLabel,
}: ProcessStageProps) {
  const { step, reduced } = useProcessCycle(steps);
  const machine = reduced ? rive.idle : steps[step].machine;

  return (
    <div className="process-win">
      <ProcessList
        label={label}
        steps={steps}
        activeIndex={step}
        mode={reduced ? 'static' : 'cycling'}
      />
      <div className="process-char">
        <RiveSlot
          src={rive.src}
          artboard={rive.artboard}
          machine={machine}
          label={characterLabel}
        >
          <CharacterScene />
        </RiveSlot>
      </div>
    </div>
  );
}
