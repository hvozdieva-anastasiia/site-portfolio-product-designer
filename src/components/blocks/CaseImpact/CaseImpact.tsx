import type { Stat, TrackedMetric } from '../../../content/types';
import { Aurora } from '../../atoms/Aurora/Aurora';
import { Label } from '../../atoms/Label/Label';
import { StatFigure } from '../../molecules/StatFigure/StatFigure';
import { StoryHead } from '../../molecules/StoryHead/StoryHead';
import './CaseImpact.css';

type CaseImpactProps = {
  kicker: string;
  title: string;
  text: string;
  baseline?: Stat;
  expected?: Stat;
  deliverables?: Stat[];
  metricsLabel?: string;
  metrics: TrackedMetric[];
};

/**
 * Where the numbers started and what the redesign aims for, or, when there are
 * no launch numbers, what the work delivered. Then what is tracked.
 */
export function CaseImpact({
  kicker,
  title,
  text,
  baseline,
  expected,
  deliverables,
  metricsLabel = 'Success metrics, agreed before launch',
  metrics,
}: CaseImpactProps) {
  return (
    <section
      className="section container case-impact"
      id="impact"
      aria-labelledby="case-impact-title"
    >
      <StoryHead
        id="case-impact-title"
        kicker={kicker}
        title={title}
        text={text}
      />
      <div className="case-impact-panel">
        <Aurora variant="panel" />
        {baseline && expected && (
          <div className="case-impact-stats">
            <div className="case-impact-stat">
              <Label>Baseline</Label>
              <StatFigure size="lg" {...baseline} />
            </div>
            <span className="case-impact-arrow" aria-hidden="true">
              →
            </span>
            <div className="case-impact-stat">
              <Label>Target</Label>
              <StatFigure size="lg" {...expected} />
            </div>
          </div>
        )}
        {deliverables && (
          <div className="case-impact-stats case-impact-stats--delivered">
            {deliverables.map((stat) => (
              <div className="case-impact-stat" key={stat.label}>
                <Label>Delivered</Label>
                <StatFigure size="lg" {...stat} />
              </div>
            ))}
          </div>
        )}
        <div className="case-impact-metrics">
          <Label>{metricsLabel}</Label>
          <ul>
            {metrics.map((metric) => (
              <li key={metric.name}>
                <p className="case-impact-metric-name">{metric.name}</p>
                <p>{metric.text}</p>
                {metric.baseline && (
                  <p className="case-impact-metric-base">{metric.baseline}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
