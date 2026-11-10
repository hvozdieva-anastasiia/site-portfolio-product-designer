import type { ComponentProps } from 'react';
import './Input.css';

/** A single-line text field. `ref` is a regular prop in React 19. */
export function Input({ className, ...rest }: ComponentProps<'input'>) {
  return (
    <input
      className={['input', className].filter(Boolean).join(' ')}
      {...rest}
    />
  );
}

/** A multi-line text field that shares the Input look. */
export function Textarea({ className, ...rest }: ComponentProps<'textarea'>) {
  return (
    <textarea
      className={['input', 'input--multiline', className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    />
  );
}
