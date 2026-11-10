import './FunnelBar.css';

type FunnelBarProps = {
  label: string;
  count: number;
  /** Share of the first step, as written in the source ("13.16%"). */
  share: string;
  /** 0–1: how wide the bar is drawn. */
  ratio: number;
  /** The first and last steps are drawn in ink, the ones between quieter. */
  emphasis?: boolean;
};

const formatter = new Intl.NumberFormat('en-US');

/** One step of a funnel: its name, people and share, and a bar to scale. */
export function FunnelBar({
  label,
  count,
  share,
  ratio,
  emphasis = false,
}: FunnelBarProps) {
  return (
    <li className="funnel-bar" data-emphasis={emphasis}>
      <div className="funnel-bar-head">
        <span>{label}</span>
        <span className="funnel-bar-figures">
          <span className="funnel-bar-count">{formatter.format(count)}</span>
          <strong>{share}</strong>
        </span>
      </div>
      <span className="funnel-bar-track" aria-hidden="true">
        <i style={{ width: `${Math.max(ratio * 100, 1.2)}%` }} />
      </span>
    </li>
  );
}
