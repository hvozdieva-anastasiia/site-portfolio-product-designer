import type { HTMLAttributes } from 'react';
import './Slab.css';

/** A Mist panel with a hairline border: the contained surface of a block. */
export function Slab({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={['slab', className].filter(Boolean).join(' ')} {...rest} />
  );
}
