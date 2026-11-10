import type { Fact, Screen } from '../../../content/types';
import { ButtonLink } from '../../atoms/Button/Button';
import { Display } from '../../atoms/Display/Display';
import { Glyph } from '../../atoms/Glyph/Glyph';
import { TextLink } from '../../atoms/TextLink/TextLink';
import { FactStrip } from '../../molecules/FactStrip/FactStrip';
import { ScreenStrip } from '../../organisms/ScreenStrip/ScreenStrip';
import './CaseHero.css';

type CaseHeroProps = {
  kicker: string;
  title: string;
  lead: string;
  facts: Fact[];
  screens: Screen[];
  backTo: string;
  /** The full case on Behance, if there is one. */
  externalHref?: string;
};

/** The top of a case study: the claim, role and scope, then the final screens. */
export function CaseHero({
  kicker,
  title,
  lead,
  facts,
  screens,
  backTo,
  externalHref,
}: CaseHeroProps) {
  return (
    <header className="case-hero container">
      <TextLink to={backTo}>← All work</TextLink>
      <div className="case-hero-copy">
        <p className="case-hero-kicker">
          <Glyph tone="green" />
          {kicker}
        </p>
        <Display id="case-title">{title}</Display>
        <div className="case-hero-row">
          <p className="case-hero-lead">{lead}</p>
          {externalHref && (
            <ButtonLink href={externalHref} target="_blank" rel="noreferrer">
              Presentation on Behance <span aria-hidden="true">↗</span>
            </ButtonLink>
          )}
        </div>
        <FactStrip facts={facts} />
      </div>
      <ScreenStrip screens={screens} eager label="Final screens" />
    </header>
  );
}
