import type { ReactNode } from 'react';
import type { ProcessStep, RiveConfig } from '../../../content/types';
import { useProcessCycle } from '../../../lib/useProcessCycle';
import { Aurora } from '../../atoms/Aurora/Aurora';
import { Button, ButtonLink } from '../../atoms/Button/Button';
import { Display } from '../../atoms/Display/Display';
import { Label } from '../../atoms/Label/Label';
import { Pill } from '../../atoms/Pill/Pill';
import { CharacterScene } from '../../illustrations/CharacterScene/CharacterScene';
import { ProcessPicker } from '../../molecules/ProcessPicker/ProcessPicker';
import { RiveSlot } from '../../organisms/RiveSlot/RiveSlot';
import './HeroPoster.css';

type HeroPosterProps = {
  /** The small plaque above the headline. */
  kicker: string;
  /**
   * The headline. Use <br /> for the line break and <em> for the words set in
   * the serif italic.
   */
  title: ReactNode;
  summary: string;
  businessDomains?: readonly string[];
  primaryAction: { label: string; href: string };
  secondaryAction: { label: string; onClick: () => void };
  steps: ProcessStep[];
  rive: RiveConfig;
  /** Visible name of the step list. */
  processLabel: string;
  characterLabel: string;
};

/**
 * The first screen as a centred poster, one viewport tall on desktop: the
 * claim in very large type across the top, the character standing free in the
 * middle on a hairline floor, the pitch on her left and the steps she is
 * acting out on her right. Any step can be picked, and the cycle can be paused.
 * On phones everything stacks: claim, pitch, character, steps.
 */
export function HeroPoster({
  kicker,
  title,
  summary,
  businessDomains,
  primaryAction,
  secondaryAction,
  steps,
  rive,
  processLabel,
  characterLabel,
}: HeroPosterProps) {
  const { step, reduced, run, paused, chosen, select, togglePaused } =
    useProcessCycle(steps);
  // With reduced motion she idles until a visitor picks a step themselves.
  const machine = reduced && !chosen ? rive.idle : steps[step].machine;

  return (
    <section className="hero-poster" aria-labelledby="hero-title">
      <div className="container hero-poster-inner">
        <div className="hero-poster-head">
          <p className="hero-poster-kicker">{kicker}</p>
          <Display id="hero-title" className="hero-poster-title">
            {title}
          </Display>
        </div>

        <div className="hero-poster-stage">
          <div className="hero-poster-pitch">
            <p className="hero-poster-summary">{summary}</p>
            {businessDomains && (
              <div>
                <Label>Business Domains</Label>
                <ul
                  className="hero-poster-domains"
                  aria-label="Business Domains"
                  role="list"
                >
                  {businessDomains.map((domain) => (
                    <li key={domain}>
                      <Pill>{domain}</Pill>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="hero-poster-actions">
              <ButtonLink variant="carbon" href={primaryAction.href}>
                {primaryAction.label}
              </ButtonLink>
              <Button onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            </div>
          </div>

          <div className="hero-poster-figure">
            <Aurora />
            <div className="hero-poster-art">
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

          <div className="hero-poster-process">
            <ProcessPicker
              label={processLabel}
              steps={steps}
              activeIndex={step}
              onSelect={select}
              mode={reduced ? 'static' : 'cycling'}
              paused={paused}
              onTogglePause={togglePaused}
              restartKey={run}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
