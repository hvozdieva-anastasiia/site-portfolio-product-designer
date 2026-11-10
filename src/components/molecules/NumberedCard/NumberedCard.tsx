import { Chip } from '../../atoms/Chip/Chip';
import './NumberedCard.css';

type NumberedCardProps = {
  n: number;
  title: string;
  text: string;
  /** Optional chip in the top-right corner. */
  tag?: string;
};

/** A raised card with a two-digit index, a title and a short text. */
export function NumberedCard({ n, title, text, tag }: NumberedCardProps) {
  return (
    <div className="numbered-card">
      <div className="numbered-card-top">
        <span className="numbered-card-n">{String(n).padStart(2, '0')}</span>
        {tag && <Chip>{tag}</Chip>}
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
