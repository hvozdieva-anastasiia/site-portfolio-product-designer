import { useCallback, useMemo, useState } from 'react';
import { Footer } from './components/blocks/Footer/Footer';
import { Header } from './components/blocks/Header/Header';
import { ContactDialog } from './components/organisms/ContactDialog/ContactDialog';
import { cases, navLinks, profile } from './content';
import { toggleTheme } from './lib/theme';
import { usePath } from './lib/router';
import { useShortcuts } from './lib/useShortcuts';
import { CasePage } from './pages/CasePage/CasePage';
import { HomePage } from './pages/HomePage/HomePage';
import { HomePageV2 } from './pages/HomePageV2/HomePageV2';
import { HomePageV3 } from './pages/HomePageV3/HomePageV3';
import { HomePageV4 } from './pages/HomePageV4/HomePageV4';
import { HomePageV5 } from './pages/HomePageV5/HomePageV5';

const socials = [
  { label: 'LinkedIn', href: profile.linkedin, icon: 'linkedin' },
  { label: 'YouTube', href: profile.youtube, icon: 'youtube' },
];

/** The shell: header, the page for the current route, footer and the contact dialog. */
export function App() {
  const path = usePath();
  const [contact, setContact] = useState({
    open: false,
    session: 0,
    message: '',
  });

  const openContactWithMessage = useCallback(
    (message = '') =>
      setContact((current) => ({
        open: true,
        session: current.session + 1,
        message,
      })),
    [],
  );
  const openContact = useCallback(
    () => openContactWithMessage(),
    [openContactWithMessage],
  );
  const closeContact = useCallback(
    () => setContact((current) => ({ ...current, open: false })),
    [],
  );

  // Header keys: C opens the form, D switches the theme, L opens LinkedIn.
  const shortcuts = useMemo(
    () => ({
      c: openContact,
      d: toggleTheme,
      l: () => window.open(profile.linkedin, '_blank', 'noopener,noreferrer'),
    }),
    [openContact],
  );
  useShortcuts(shortcuts);

  const caseSlug = path.match(/^\/cases\/([^/]+)\/?$/)?.[1];
  // /v2 is the second version of the home page; its menu keeps you on it.
  const isV2 = /^\/v2\/?$/.test(path);
  const isV3 = /^\/v3\/?$/.test(path);
  const isV4 = /^\/v4\/?$/.test(path);
  // /v5 is /v4 with a different toolkit block, so it shares v4's look.
  const isV5 = /^\/v5\/?$/.test(path);
  const isV4Look = isV4 || isV5;
  const prefix = isV2 ? '/v2' : isV3 ? '/v3' : isV4 ? '/v4' : isV5 ? '/v5' : '';
  const links = prefix
    ? navLinks.map((link) => ({
        ...link,
        href: `${prefix}${link.href.slice(1)}`,
      }))
    : navLinks;

  return (
    <div id="top" className={isV4Look ? 'portfolio-v4' : undefined}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header
        name={profile.name}
        links={links}
        linkedinUrl={profile.linkedin}
        themeToggleBeforeLinkedIn={isV4Look}
        onContact={openContact}
      />
      <main id="main" tabIndex={-1}>
        {caseSlug ? (
          <CasePage slug={caseSlug} />
        ) : isV2 ? (
          <HomePageV2 onContact={openContact} />
        ) : isV3 ? (
          <HomePageV3 onContact={openContact} />
        ) : isV4 ? (
          <HomePageV4 onContact={openContactWithMessage} />
        ) : isV5 ? (
          <HomePageV5 onContact={openContactWithMessage} />
        ) : (
          <HomePage onContact={openContact} />
        )}
      </main>
      <Footer
        name={profile.name}
        role={profile.role}
        cases={cases}
        exploreLinks={links.filter((link) => !link.href.endsWith('#cases'))}
        socials={socials}
        onContact={openContact}
      />
      <ContactDialog
        open={contact.open}
        session={contact.session}
        initialMessage={contact.message}
        onClose={closeContact}
        email={profile.email}
        formEndpoint={profile.formEndpoint}
      />
    </div>
  );
}
