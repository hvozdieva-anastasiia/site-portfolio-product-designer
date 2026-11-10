import { Key } from '../../atoms/Key/Key';
import './PagerControls.css';

type PagerControlsProps = {
  /** Visible position, for example "3 / 13". */
  position: string;
  prevLabel: string;
  nextLabel: string;
  onPrev: () => void;
  onNext: () => void;
};

/** Previous and next keys around a small position counter. */
export function PagerControls({
  position,
  prevLabel,
  nextLabel,
  onPrev,
  onNext,
}: PagerControlsProps) {
  return (
    <div className="pager">
      <Key variant="icon" onClick={onPrev} aria-label={prevLabel}>
        ←
      </Key>
      <span className="pager-count" aria-hidden="true">
        {position}
      </span>
      <Key variant="icon" onClick={onNext} aria-label={nextLabel}>
        →
      </Key>
    </div>
  );
}
