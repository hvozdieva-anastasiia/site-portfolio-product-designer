import './ProcessCaption.css';

/**
 * cycling: segments fill one after another as the steps play.
 * static: no motion, every segment shown as done.
 */
export type ProcessCaptionMode = 'cycling' | 'static';

type ProcessCaptionProps = {
  label: string;
  steps: { text: string; ms: number }[];
  activeIndex: number;
  mode?: ProcessCaptionMode;
};

/** The current step as one line, with a segmented progress bar for all steps. */
export function ProcessCaption({
  label,
  steps,
  activeIndex,
  mode = 'cycling',
}: ProcessCaptionProps) {
  const cycling = mode === 'cycling';
  return (
    <div className="process-caption">
      <p className="process-caption-text" aria-live="polite">
        <span className="process-caption-n">
          {String(activeIndex + 1).padStart(2, '0')}
        </span>
        <span>{steps[activeIndex].text}</span>
      </p>
      <ol className="process-caption-segments" aria-label={label}>
        {steps.map((step, index) => (
          <li
            key={step.text}
            data-state={
              !cycling || index < activeIndex
                ? 'done'
                : index === activeIndex
                  ? 'active'
                  : 'todo'
            }
            aria-current={index === activeIndex ? 'step' : undefined}
          >
            <span className="sr-only">{step.text}</span>
            {cycling && index === activeIndex && (
              <i
                className="process-caption-bar"
                key={activeIndex}
                style={{ animationDuration: `${step.ms}ms` }}
                aria-hidden="true"
              />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
