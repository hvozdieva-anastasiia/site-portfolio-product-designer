import { useCallback, useEffect, useMemo, useState } from 'react';
import { Footer } from './components/blocks/Footer/Footer';
import { Header } from './components/blocks/Header/Header';
import { ContactDialog } from './components/organisms/ContactDialog/ContactDialog';
import { cases, navLinks, profile } from './content';
import { toggleTheme } from './lib/theme';
import { usePath } from './lib/router';
import { useShortcuts } from './lib/useShortcuts';
import { CasePage } from './pages/CasePage/CasePage';
import { HomePage } from './pages/HomePage/HomePage';

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

  // A page can open with a hash in the address ("/#cases"). The browser looks
  // for the anchor before React paints it, so after the page is on screen we
  // jump to the section ourselves.
  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (!hash) return;
    requestAnimationFrame(() =>
      document
        .getElementById(hash)
        ?.scrollIntoView({ block: 'start', behavior: 'instant' }),
    );
  }, [path]);

  return (
    <div id="top" className={caseSlug ? 'case-route' : 'portfolio-v4'}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header
        name={profile.name}
        links={navLinks}
        linkedinUrl={profile.linkedin}
        themeToggleBeforeLinkedIn={!caseSlug}
        onContact={openContact}
      />
      <main id="main" tabIndex={-1}>
        {caseSlug ? (
          <CasePage slug={caseSlug} />
        ) : (
          <HomePage onContact={openContactWithMessage} />
        )}
      </main>
      <Footer
        name={profile.name}
        role={profile.role}
        cases={cases}
        exploreLinks={navLinks.filter((link) => !link.href.endsWith('#cases'))}
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
