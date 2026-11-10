import './Avatar.css';

export type AvatarSize = 'md' | 'sm';

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

/** A round initials badge. The name is always written next to it. */
export function Avatar({
  name,
  size = 'md',
}: {
  name: string;
  size?: AvatarSize;
}) {
  return (
    <span
      className={size === 'sm' ? 'avatar avatar--sm' : 'avatar'}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  );
}
