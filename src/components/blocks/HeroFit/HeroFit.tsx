import type { ReactNode } from 'react';
import type { ProcessStep, RiveConfig } from '../../../content/types';
import { Aurora } from '../../atoms/Aurora/Aurora';
import { HeroWindow } from '../../organisms/HeroWindow/HeroWindow';
import './HeroFit.css';

type HeroFitProps = {
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
 * The first screen, sized to one viewport on desktop: a single window on its
 * glow, with the pitch on the left and the whole character on the right. On
 * phones it grows to its content.
 */
export function HeroFit(props: HeroFitProps) {
  return (
    <section className="hero-fit" aria-labelledby="hero-title">
      <div className="container hero-fit-stage">
        <Aurora />
        <HeroWindow {...props} />
      </div>
    </section>
  );
}
