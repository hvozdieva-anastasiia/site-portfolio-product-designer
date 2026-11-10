import { useEffect, useRef, useState } from 'react';
import type { NavLink } from '../../../content/types';
import { Key } from '../../atoms/Key/Key';
import { Kbd } from '../../atoms/Kbd/Kbd';
import { ThemeToggle } from '../../molecules/ThemeToggle/ThemeToggle';
import { Wordmark } from '../../molecules/Wordmark/Wordmark';
import './Header.css';

type HeaderProps = {
  name: string;
  links: NavLink[];
  linkedinUrl: string;
  themeToggleBeforeLinkedIn?: boolean;
  onContact: () => void;
};

/**
 * Sticky site header: wordmark, section links, LinkedIn, the theme switch and
 * the contact key. Below 900px the links fold into a menu.
 */
export function Header({
  name,
  links,
  linkedinUrl,
  themeToggleBeforeLinkedIn = false,
  onContact,
}: HeaderProps) {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (open)
      navRef.current?.querySelector('a')?.focus({ preventScroll: true });
  }, [open]);
  return (
    <header
      className="nav"
      onKeyDown={(event) => {
        if (open && event.key === 'Escape') {
          setOpen(false);
          toggleRef.current?.focus();
        }
      }}
    >
      <div className="nav-inner">
        <Wordmark
          name={name}
          variant="compact"
          onClick={() => setOpen(false)}
        />
        <nav
          ref={navRef}
          className="nav-links"
          id="nav-menu"
          data-open={open}
          aria-label="Main navigation"
        >
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          {themeToggleBeforeLinkedIn && <ThemeToggle />}
          <a
            className="nav-text-link"
            href={linkedinUrl}
            target="_blank"
            rel="noreferrer"
            aria-keyshortcuts="L"
          >
            LinkedIn <Kbd>L</Kbd>
          </a>
          {!themeToggleBeforeLinkedIn && <ThemeToggle />}
          <Key
            onClick={() => {
              setOpen(false);
              onContact();
            }}
            aria-keyshortcuts="C"
          >
            Get in touch <Kbd>C</Kbd>
          </Key>
          <button
            ref={toggleRef}
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="nav-menu"
            aria-label="Menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
