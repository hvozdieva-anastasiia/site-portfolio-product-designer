import './ProcessList.css';

/**
 * cycling: the active line is highlighted and a bar fills for `ms`.
 * static: every line is shown as active, with no motion.
 */
export type ProcessListMode = 'cycling' | 'static';

type ProcessListProps = {
  label: string;
  steps: { text: string; ms: number }[];
  activeIndex: number;
  mode?: ProcessListMode;
};

/** A numbered list of steps with one line in focus. */
export function ProcessList({
  label,
  steps,
  activeIndex,
  mode = 'cycling',
}: ProcessListProps) {
  const cycling = mode === 'cycling';
  return (
    <ol className="process" aria-label={label}>
      {steps.map((step, index) => (
        <li
          key={step.text}
          data-state={!cycling || index === activeIndex ? 'active' : 'idle'}
          aria-current={index === activeIndex ? 'step' : undefined}
        >
          <span className="process-n">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span>{step.text}</span>
          {cycling && index === activeIndex && (
            <i
              className="process-bar"
              key={activeIndex}
              style={{ animationDuration: `${step.ms}ms` }}
              aria-hidden="true"
            />
          )}
        </li>
      ))}
    </ol>
  );
}
