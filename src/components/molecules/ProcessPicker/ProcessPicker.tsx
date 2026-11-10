import { useId } from 'react';
import { PauseIcon, PlayIcon } from '../../atoms/Icon/Icon';
import './ProcessPicker.css';

/**
 * cycling: the active step's bar fills for `ms`, then the parent moves on.
 * static: no bars and no pause button (reduced motion).
 */
export type ProcessPickerMode = 'cycling' | 'static';

type ProcessPickerProps = {
  /** Visible name of the list, e.g. "How I work". */
  label: string;
  steps: { text: string; ms: number }[];
  activeIndex: number;
  /** Called when a visitor picks a step. */
  onSelect: (index: number) => void;
  mode?: ProcessPickerMode;
  paused?: boolean;
  /** Shows a pause / play button next to the label. */
  onTogglePause?: () => void;
  /** Change it to restart the active bar (e.g. the same step picked again). */
  restartKey?: number;
};

/**
 * The process as a short list of buttons: the playing step is in ink with a
 * bar that fills while its clip runs; any step can be picked to jump to it.
 */
export function ProcessPicker({
  label,
  steps,
  activeIndex,
  onSelect,
  mode = 'cycling',
  paused = false,
  onTogglePause,
  restartKey = 0,
}: ProcessPickerProps) {
  const labelId = useId();
  const cycling = mode === 'cycling';

  return (
    <div className="picker" data-paused={paused || undefined}>
      <div className="picker-head">
        <p className="picker-label" id={labelId}>
          {label}
        </p>
        {cycling && onTogglePause && (
          <button
            type="button"
            className="picker-toggle"
            onClick={onTogglePause}
            aria-label={paused ? 'Play the steps' : 'Pause the steps'}
          >
            {paused ? <PlayIcon size={12} /> : <PauseIcon size={12} />}
          </button>
        )}
      </div>
      <ol className="picker-list" aria-labelledby={labelId}>
        {steps.map((step, index) => {
          const active = index === activeIndex;
          return (
            <li key={step.text}>
              <button
                type="button"
                className="picker-step"
                data-state={active ? 'active' : 'idle'}
                aria-current={active ? 'step' : undefined}
                onClick={() => onSelect(index)}
              >
                <span className="picker-n">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="picker-text">{step.text}</span>
                {cycling && active && (
                  <i
                    className="picker-bar"
                    key={`${activeIndex}-${restartKey}`}
                    style={{ animationDuration: `${step.ms}ms` }}
                    aria-hidden="true"
                  />
                )}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
