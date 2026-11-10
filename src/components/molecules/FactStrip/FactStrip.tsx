import './FactStrip.css';

type FactStripProps = {
  facts: { label: string; value: string }[];
};

/** A short row of plain facts under a hairline: a small label above each value. */
export function FactStrip({ facts }: FactStripProps) {
  return (
    <dl className="fact-strip">
      {facts.map((fact) => (
        <div className="fact-strip-item" key={fact.label}>
          <dt>{fact.label}</dt>
          <dd>{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}
