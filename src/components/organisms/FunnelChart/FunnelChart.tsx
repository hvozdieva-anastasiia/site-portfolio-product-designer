import type { FunnelStep } from '../../../content/types';
import { Label } from '../../atoms/Label/Label';
import { FunnelBar } from '../../molecules/FunnelBar/FunnelBar';
import './FunnelChart.css';

type FunnelChartProps = {
  kicker: string;
  title: string;
  period: string;
  steps: FunnelStep[];
  /** One line under the chart that says what the numbers mean. */
  note: string;
};

/** A conversion funnel as horizontal bars, each to scale with the first step. */
export function FunnelChart({
  kicker,
  title,
  period,
  steps,
  note,
}: FunnelChartProps) {
  const top = steps[0]?.count ?? 1;
  return (
    <figure className="funnel">
      <div className="funnel-head">
        <div>
          <Label>{kicker}</Label>
          <h3>{title}</h3>
        </div>
        <span className="funnel-period">{period}</span>
      </div>
      <ol className="funnel-steps">
        {steps.map((step, index) => (
          <FunnelBar
            key={step.label}
            label={step.label}
            count={step.count}
            share={step.share}
            ratio={step.count / top}
            emphasis={index === 0 || index === steps.length - 1}
          />
        ))}
      </ol>
      <figcaption className="funnel-note">
        <span className="funnel-note-mark" aria-hidden="true">
          !
        </span>
        {note}
      </figcaption>
    </figure>
  );
}
