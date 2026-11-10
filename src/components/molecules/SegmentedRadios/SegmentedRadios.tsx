import { Label } from '../../atoms/Label/Label';
import './SegmentedRadios.css';

type SegmentedRadiosProps<T extends string> = {
  legend: string;
  name: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
};

/** A radio group drawn as a row of small tabs. */
export function SegmentedRadios<T extends string>({
  legend,
  name,
  options,
  value,
  onChange,
}: SegmentedRadiosProps<T>) {
  return (
    <fieldset className="topics">
      <Label as="legend">{legend}</Label>
      <div className="seg-group">
        {options.map((option) => (
          <label className="seg" key={option.value}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
