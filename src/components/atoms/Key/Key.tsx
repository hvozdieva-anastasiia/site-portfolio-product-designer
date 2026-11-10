import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import './Key.css';

/** label: text (and a Kbd hint) on a small key. icon: a square icon key. */
export type KeyVariant = 'label' | 'icon';

const classes = (variant: KeyVariant, extra?: string) =>
  ['key', variant === 'icon' && 'key--icon', extra].filter(Boolean).join(' ');

type KeyProps = {
  variant?: KeyVariant;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Key({
  variant = 'label',
  className,
  type = 'button',
  ...rest
}: KeyProps) {
  return (
    <button type={type} className={classes(variant, className)} {...rest} />
  );
}

type KeyLinkProps = {
  variant?: KeyVariant;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export function KeyLink({
  variant = 'label',
  className,
  ...rest
}: KeyLinkProps) {
  return <a className={classes(variant, className)} {...rest} />;
}
