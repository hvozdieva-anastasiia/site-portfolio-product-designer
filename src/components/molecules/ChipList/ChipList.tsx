import { Chip } from '../../atoms/Chip/Chip';
import './ChipList.css';

/** A wrapping list of chips with an accessible name. */
export function ChipList({ label, items }: { label: string; items: string[] }) {
  return (
    <ul className="chips" aria-label={label}>
      {items.map((item) => (
        <li key={item}>
          <Chip>{item}</Chip>
        </li>
      ))}
    </ul>
  );
}
