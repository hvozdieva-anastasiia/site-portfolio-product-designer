import './Aurora.css';

/** band: placed by its parent. panel: a glow rising from a panel's bottom edge. */
export type AuroraVariant = 'band' | 'panel';

export function Aurora({ variant = 'band' }: { variant?: AuroraVariant }) {
  return (
    <div
      className={variant === 'panel' ? 'aurora aurora--panel' : 'aurora'}
      aria-hidden="true"
    />
  );
}
