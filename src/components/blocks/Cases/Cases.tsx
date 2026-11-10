import type { Case } from '../../../content/types';
import { SectionHead } from '../../molecules/SectionHead/SectionHead';
import { CaseCard } from '../../organisms/CaseCard/CaseCard';
import './Cases.css';

type CasesProps = {
  items: Case[];
  heading: { kicker: string; first: string; second: string };
};

/** Selected work: one full-width plaque per case. */
export function Cases({ items, heading }: CasesProps) {
  return (
    <section
      className="section container"
      id="cases"
      aria-labelledby="cases-title"
    >
      <SectionHead id="cases-title" {...heading} />
      <div className="case-list">
        {items.map((item, index) => (
          <CaseCard key={item.slug} item={item} number={index + 1} />
        ))}
      </div>
    </section>
  );
}
