import './StatFigure.css';

type StatFigureProps = {
  value: string;
  label: string;
  note?: string;
  /** lg: a headline number. md: a number in a row of several. */
  size?: 'lg' | 'md';
};

/** A big figure, what it counts, and an optional line of context. */
export function StatFigure({
  value,
  label,
  note,
  size = 'md',
}: StatFigureProps) {
  return (
    <div className={`stat stat--${size}`}>
      <p className="stat-value">{value}</p>
      <p className="stat-label">{label}</p>
      {note && <p className="stat-note">{note}</p>}
    </div>
  );
}
