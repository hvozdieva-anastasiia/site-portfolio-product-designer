import type { NavLink } from '../../../content/types';
import { RouterLink } from '../../atoms/RouterLink/RouterLink';
import {
  SocialLinks,
  type SocialLink,
} from '../../molecules/SocialLinks/SocialLinks';
import { Wordmark } from '../../molecules/Wordmark/Wordmark';
import './Footer.css';

type FooterProps = {
  name: string;
  role: string;
  /** Cases to list, each linking to its page. */
  cases: { slug: string; title: string }[];
  /** Section links, for the "Explore" column. */
  exploreLinks: NavLink[];
  socials: SocialLink[];
  onContact: () => void;
};

/** The site map, social links and a giant faded wordmark. */
export function Footer({
  name,
  role,
  cases,
  exploreLinks,
  socials,
  onContact,
}: FooterProps) {
  return (
    <footer className="footer">
      <div className="footer-glow" aria-hidden="true" />
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Wordmark name={name} />
            <p>{role}. Research, interface and metrics in one loop.</p>
            <SocialLinks links={socials} />
          </div>
          <nav aria-label="Cases">
            <h2 className="footer-title">Cases</h2>
            <ul>
              {cases.map((item) => (
                <li key={item.slug}>
                  <RouterLink to={`/cases/${item.slug}`}>
                    {item.title}
                  </RouterLink>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Explore">
            <h2 className="footer-title">Explore</h2>
            <ul>
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Connect">
            <h2 className="footer-title">Connect</h2>
            <ul>
              <li>
                <button
                  type="button"
                  className="footer-link"
                  onClick={onContact}
                >
                  Send a message
                </button>
              </li>
              {socials.map((social) => (
                <li key={social.label}>
                  <a href={social.href} target="_blank" rel="noreferrer">
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="footer-legal">
          © {new Date().getFullYear()} {name}. Built in Figma, shipped in code.
        </p>
      </div>
      <p className="footer-giant" aria-hidden="true">
        {name}
      </p>
    </footer>
  );
}
