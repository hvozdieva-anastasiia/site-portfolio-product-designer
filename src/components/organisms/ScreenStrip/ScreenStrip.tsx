import type { Screen } from '../../../content/types';
import { Aurora } from '../../atoms/Aurora/Aurora';
import { PhoneShot } from '../../atoms/PhoneShot/PhoneShot';
import './ScreenStrip.css';

type ScreenStripProps = {
  screens: Screen[];
  /** Optional step names, one per screen, set above each phone. */
  steps?: string[];
  /** Eager-load the screens (the first visual on a page). */
  eager?: boolean;
  /** Accessible name of the group. */
  label: string;
};

/**
 * App screens side by side on a soft panel with the site's glow under it.
 * With steps it reads as a flow; on narrow screens it scrolls sideways.
 */
export function ScreenStrip({
  screens,
  steps,
  eager,
  label,
}: ScreenStripProps) {
  const Tag = steps ? 'ol' : 'ul';
  const multiple = screens.length > 1;
  return (
    <div
      className="screen-strip"
      data-count={screens.length}
      data-flow={steps ? '' : undefined}
    >
      <Aurora variant="panel" />
      {multiple && (
        <p className="screen-strip-hint">
          {screens.length} screens · Scroll to explore{' '}
          <span aria-hidden="true">→</span>
        </p>
      )}
      <Tag
        className="screen-strip-list"
        aria-label={label}
        // Scrolls sideways on phones, so keyboard users must be able to reach it.
        tabIndex={multiple ? 0 : undefined}
      >
        {screens.map((screen, index) => (
          <li key={screen.src}>
            {steps && (
              <p className="screen-strip-step">
                <span>{String(index + 1).padStart(2, '0')}</span>
                {steps[index]}
              </p>
            )}
            <PhoneShot {...screen} loading={eager ? 'eager' : 'lazy'} />
          </li>
        ))}
      </Tag>
    </div>
  );
}
