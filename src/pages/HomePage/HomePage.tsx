import {
  articles,
  cases,
  processSteps,
  profile,
  reviews,
  rive,
  talks,
  toolGroups,
} from '../../content';
import { Articles } from '../../components/blocks/Articles/Articles';
import { Cases } from '../../components/blocks/Cases/Cases';
import { Contact } from '../../components/blocks/Contact/Contact';
import { Hero } from '../../components/blocks/Hero/Hero';
import { Reviews } from '../../components/blocks/Reviews/Reviews';
import { Talks } from '../../components/blocks/Talks/Talks';
import { Toolkit } from '../../components/blocks/Toolkit/Toolkit';

/**
 * The one-page home. It only wires content into independent blocks, so any
 * block can be removed, reordered or reused on another page.
 */
export function HomePage({ onContact }: { onContact: () => void }) {
  return (
    <>
      <Hero
        kicker={`${profile.role} · ${profile.location}`}
        title={
          <>
            Hi, I’m Anastasiia.
            <br />I find the right
            <br />
            problems to solve.
          </>
        }
        summary="Then I validate solutions through research, data and experimentation, for telecom, travel and advertising products."
        primaryAction={{ label: 'View selected work', href: '#cases' }}
        secondaryAction={{ label: 'Get in touch', onClick: onContact }}
        steps={processSteps}
        rive={rive}
        processLabel="How I work"
        characterLabel={`Animated portrait of ${profile.name} at her laptop`}
      />
      <Cases
        items={cases}
        heading={{
          kicker: 'Selected work',
          first: 'Three projects.',
          second: 'A telecom brand, an eSIM feature and a campaign app.',
        }}
      />
      <Articles
        items={articles}
        heading={{
          kicker: 'Writing',
          first: 'Articles.',
          second: 'Notes on product design, published on DOU.',
        }}
        allLink={{ label: 'All articles', href: profile.dou }}
      />
      <Talks
        items={talks}
        heading={{
          kicker: 'Talks',
          first: 'On camera.',
          second: 'Conversations from the It Depends channel.',
        }}
        channel={{
          name: 'It Depends',
          label: 'YouTube channel',
          href: profile.youtube,
        }}
      />
      <Toolkit
        groups={toolGroups}
        rive={rive}
        heading={{
          kicker: 'Toolkit',
          first: 'Daily tools.',
          second: 'Pick a group and watch the desk change.',
        }}
      />
      <Reviews
        reviews={reviews}
        heading={{
          kicker: 'Reviews',
          first: 'Kind words.',
          second: 'Recommendations from colleagues on LinkedIn.',
        }}
        recommendationsUrl={profile.linkedinRecommendations}
      />
      <Contact name={profile.name} onContact={onContact} />
    </>
  );
}
