import '../../atoms/Label/Label.css';
import './CaseOverview.css';

type CaseOverviewProps = {
  problem: string;
  solution: string;
  impact: string;
};

/** The whole case in three short paragraphs, for readers in a hurry. */
export function CaseOverview({ problem, solution, impact }: CaseOverviewProps) {
  const items = [
    ['Problem', problem],
    ['Solution', solution],
    ['Impact', impact],
  ];
  return (
    <section
      className="section container case-overview"
      aria-labelledby="case-overview-title"
    >
      <h2 id="case-overview-title" className="label">
        In short
      </h2>
      <dl className="case-overview-grid">
        {items.map(([term, text]) => (
          <div key={term}>
            <dt>{term}</dt>
            <dd>{text}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
