import { useEffect } from 'react';
import { caseStudies, cases, profile } from '../../content';
import { CaseStudyPage } from '../CaseStudyPage/CaseStudyPage';
import { ButtonLink } from '../../components/atoms/Button/Button';
import { Display } from '../../components/atoms/Display/Display';
import { Pill } from '../../components/atoms/Pill/Pill';
import { TextLink } from '../../components/atoms/TextLink/TextLink';
import { OutcomeLine } from '../../components/molecules/OutcomeLine/OutcomeLine';
import { CaseSpec } from '../../components/organisms/CaseSpec/CaseSpec';
import { CaseVisual } from '../../components/organisms/CaseVisual/CaseVisual';
import './CasePage.css';

const sections = [
  [
    'Context',
    'The product, the team and the problem that started this project.',
  ],
  [
    'Research',
    'What I learned from users and data before touching the interface.',
  ],
  ['Design', 'Key decisions, the options I rejected and why.'],
  ['Outcome', 'What changed in the numbers, and what I would do next.'],
];

/** A single case: summary, visual, what it involved, and a link to the full study. */
export function CasePage({ slug }: { slug: string }) {
  const item = cases.find((entry) => entry.slug === slug);
  const study = caseStudies.find((entry) => entry.slug === slug);

  useEffect(() => {
    document.title = item
      ? `${item.title} · ${profile.name}`
      : `Not found · ${profile.name}`;
    return () => {
      document.title = `${profile.name} · Product Designer`;
    };
  }, [item]);

  if (!item) {
    return (
      <section className="section container case-page">
        <Display size="sm">Case not found</Display>
        <p className="case-page-note">That case doesn’t exist (yet).</p>
        <ButtonLink to="/">← Back to all work</ButtonLink>
      </section>
    );
  }

  // Cases with a full write-up get the product case study page.
  if (study) return <CaseStudyPage study={study} item={item} />;

  return (
    <article className="case-page container" aria-labelledby="case-page-title">
      <TextLink to="/">← All cases</TextLink>
      <header className="case-page-head">
        <Pill>{item.kind}</Pill>
        <Display size="sm" id="case-page-title">
          {item.title}
        </Display>
        <p className="case-page-lead">{item.summary}</p>
        <div className="case-page-actions">
          <ButtonLink
            variant="carbon"
            href={item.behance}
            target="_blank"
            rel="noreferrer"
          >
            Full case on Behance <span aria-hidden="true">↗</span>
          </ButtonLink>
          <OutcomeLine>
            {item.published
              ? `${item.team} · published ${item.published}`
              : item.team}
          </OutcomeLine>
        </div>
      </header>
      <div className="case-page-art">
        <CaseVisual
          cover={item.cover}
          coverAlt={item.coverAlt}
          art={item.art}
        />
      </div>
      <div className="case-page-body">
        <CaseSpec domains={item.domains} tools={item.tools} />
        <div className="case-page-sections">
          {sections.map(([title, text]) => (
            <section key={title}>
              <h2>{title}</h2>
              <p>{text}</p>
              <p className="soon">
                Full write-up coming soon. For now, see the full case on
                Behance.
              </p>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
