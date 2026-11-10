import { simpleIconUrl } from '../../../lib/icons';
import { KeyLink } from '../../atoms/Key/Key';
import './SocialLinks.css';

export type SocialLink = {
  label: string;
  href: string;
  /** simple-icons slug. */
  icon: string;
};

/** A row of small icon keys that open social profiles. */
export function SocialLinks({ links }: { links: SocialLink[] }) {
  return (
    <div className="socials">
      {links.map((link) => (
        <KeyLink
          key={link.label}
          variant="icon"
          href={link.href}
          target="_blank"
          rel="noreferrer"
          aria-label={link.label}
        >
          <img src={simpleIconUrl(link.icon)} width="14" height="14" alt="" />
        </KeyLink>
      ))}
    </div>
  );
}
