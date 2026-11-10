import {
  articles,
  cases,
  contactRive,
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
import { HeroPoster } from '../../components/blocks/HeroPoster/HeroPoster';
import { Reviews } from '../../components/blocks/Reviews/Reviews';
import { Talks } from '../../components/blocks/Talks/Talks';
import { ToolkitDesk } from '../../components/blocks/ToolkitDesk/ToolkitDesk';

/**
 * Version 5 of the home page. The same as version 4, except the toolkit: the
 * groups become an index set in large type, and the picked group's tools sit
 * on the character's desk instead of floating around her.
 */
export function HomePageV5({
  onContact,
}: {
  onContact: (message?: string) => void;
}) {
  return (
    <>
      <HeroPoster
        kicker={`Hi, I’m Anastasiia · ${profile.role}`}
        title={
          <>
            I find the <em>right</em>
            <br />
            <em>problems</em> to solve.
          </>
        }
        summary="Then I validate solutions through research, data and experimentation."
        businessDomains={[
          'Fintech',
          'Healthcare',
          'Telecom',
          'Travel',
          'Advertising',
        ]}
        primaryAction={{ label: 'View selected work', href: '#cases' }}
        secondaryAction={{ label: 'Get in touch', onClick: () => onContact() }}
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
      <ToolkitDesk
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
      <Contact name={profile.name} onContact={onContact} mascot={contactRive} />
    </>
  );
}
