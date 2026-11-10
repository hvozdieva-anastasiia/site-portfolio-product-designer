import type { AnchorHTMLAttributes } from 'react';
import { navigate, withBase } from '../../../lib/router';

type RouterLinkProps = { to: string } & Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href'
>;

/** An anchor that navigates client-side. Modified clicks keep their default. */
export function RouterLink({ to, onClick, ...rest }: RouterLinkProps) {
  return (
    <a
      {...rest}
      href={withBase(to)}
      onClick={(event) => {
        onClick?.(event);
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }
        event.preventDefault();
        navigate(to);
      }}
    />
  );
}
