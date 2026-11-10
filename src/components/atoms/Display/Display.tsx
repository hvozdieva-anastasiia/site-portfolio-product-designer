import type { HTMLAttributes } from 'react';
import './Display.css';

export type DisplaySize = 'lg' | 'sm';

type DisplayProps = { size?: DisplaySize } & HTMLAttributes<HTMLHeadingElement>;

/** The page-level headline (h1) in Inter 500 with tight tracking. */
export function Display({ size = 'lg', className, ...rest }: DisplayProps) {
  const classes = ['display', size === 'sm' && 'display--sm', className]
    .filter(Boolean)
    .join(' ');
  return <h1 className={classes} {...rest} />;
}
