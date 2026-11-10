import { RouterLink } from '../../atoms/RouterLink/RouterLink';
import './Wordmark.css';

/** compact: the surname drops away on narrow screens (header). full: always whole (footer). */
export type WordmarkVariant = 'compact' | 'full';

type WordmarkProps = {
  name: string;
  variant?: WordmarkVariant;
  onClick?: () => void;
};

export function Wordmark({ name, variant = 'full', onClick }: WordmarkProps) {
  if (variant === 'full') {
    return (
      <RouterLink className="wordmark" to="/" onClick={onClick}>
        <span>{name}</span>
      </RouterLink>
    );
  }
  const [first, ...rest] = name.split(' ');
  return (
    <RouterLink className="wordmark" to="/" aria-label={name} onClick={onClick}>
      <span>
        {first}
        {rest.length > 0 && <span className="wm-rest"> {rest.join(' ')}</span>}
      </span>
    </RouterLink>
  );
}
