import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { RouterLink } from '../RouterLink/RouterLink';
import './Button.css';

/** carbon: the single solid dark button. lift: white, with a hairline lift. */
export type ButtonVariant = 'carbon' | 'lift';

const classes = (variant: ButtonVariant, extra?: string) =>
  ['btn', `btn--${variant}`, extra].filter(Boolean).join(' ');

type ButtonProps = {
  variant?: ButtonVariant;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = 'lift',
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={classes(variant, className)} {...rest} />
  );
}

type ButtonLinkProps = { variant?: ButtonVariant } & Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href'
> &
  ({ href: string; to?: never } | { to: string; href?: never });

/** A button-looking link: `href` for a plain anchor, `to` for client routing. */
export function ButtonLink({
  variant = 'lift',
  className,
  ...props
}: ButtonLinkProps) {
  if (props.to !== undefined) {
    const { to, ...rest } = props;
    return (
      <RouterLink to={to} className={classes(variant, className)} {...rest} />
    );
  }
  const { href, ...rest } = props;
  return <a href={href} className={classes(variant, className)} {...rest} />;
}
