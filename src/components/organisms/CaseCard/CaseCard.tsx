import type { Case } from '../../../content/types';
import { ButtonLink } from '../../atoms/Button/Button';
import { Pill } from '../../atoms/Pill/Pill';
import { RouterLink } from '../../atoms/RouterLink/RouterLink';
import { OutcomeLine } from '../../molecules/OutcomeLine/OutcomeLine';
import { CaseSpec } from '../CaseSpec/CaseSpec';
import { CaseVisual } from '../CaseVisual/CaseVisual';
import './CaseCard.css';

type CaseCardProps = { item: Case; number: number };

/** A full-width case plaque: facts and tags on the left, the visual on the right. */
export function CaseCard({ item, number }: CaseCardProps) {
  const titleId = `case-${item.slug}`;
  const href = `/cases/${item.slug}`;
  const label = `View project: ${item.title}`;
  return (
    <article className="case" aria-labelledby={titleId}>
      <div className="case-info">
        <div className="case-top">
          <span className="case-index">{String(number).padStart(2, '0')}</span>
          <Pill>{item.kind}</Pill>
        </div>
        <h3 id={titleId}>
          <RouterLink to={href}>{item.title}</RouterLink>
        </h3>
        <p className="case-summary">{item.summary}</p>
        <CaseSpec domains={item.domains} tools={item.tools} />
        <div className="case-foot">
          <ButtonLink to={href} aria-label={label}>
            View project <span aria-hidden="true">→</span>
          </ButtonLink>
          <OutcomeLine value={item.outcome.value}>
            {item.outcome.label}
          </OutcomeLine>
        </div>
      </div>
      <RouterLink to={href} className="case-art" aria-label={label}>
        <CaseVisual
          cover={item.cover}
          coverAlt={item.coverAlt}
          art={item.art}
        />
      </RouterLink>
    </article>
  );
}
