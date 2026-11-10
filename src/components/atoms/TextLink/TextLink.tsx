import type { AnchorHTMLAttributes } from 'react';
import { RouterLink } from '../RouterLink/RouterLink';
import './TextLink.css';

type TextLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> &
  ({ href: string; to?: never } | { to: string; href?: never });

/** A quiet inline link. `href` for a plain anchor, `to` for client routing. */
export function TextLink({ className, ...props }: TextLinkProps) {
  const classes = ['link-arrow', className].filter(Boolean).join(' ');
  if (props.to !== undefined) {
    const { to, ...rest } = props;
    return <RouterLink to={to} className={classes} {...rest} />;
  }
  const { href, ...rest } = props;
  return <a href={href} className={classes} {...rest} />;
}

/** A TextLink to another site: opens in a new tab and ends with an arrow. */
export function ExternalTextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: string;
  className?: string;
}) {
  return (
    <TextLink
      href={href}
      target="_blank"
      rel="noreferrer"
      className={className}
    >
      {children} <span aria-hidden="true">↗</span>
    </TextLink>
  );
}
