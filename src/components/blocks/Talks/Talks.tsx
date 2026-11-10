import type { Talk } from '../../../content/types';
import { ExternalTextLink } from '../../atoms/TextLink/TextLink';
import { MediaCard } from '../../molecules/MediaCard/MediaCard';
import { MediaGrid } from '../../molecules/MediaGrid/MediaGrid';
import { SectionHead } from '../../molecules/SectionHead/SectionHead';
import { VideoThumb } from '../../molecules/VideoThumb/VideoThumb';

type TalksProps = {
  items: Talk[];
  heading: { kicker: string; first: string; second: string };
  /** The channel the videos come from. */
  channel: { name: string; label: string; href: string };
};

/** Video talks, three to a row. */
export function Talks({ items, heading, channel }: TalksProps) {
  return (
    <section
      className="section container"
      id="talks"
      aria-labelledby="talks-title"
    >
      <SectionHead id="talks-title" {...heading}>
        <ExternalTextLink href={channel.href}>{channel.label}</ExternalTextLink>
      </SectionHead>
      <MediaGrid>
        {items.map((talk) => (
          <li key={talk.title}>
            <MediaCard
              href={talk.href}
              media={
                <VideoThumb
                  youtubeId={talk.youtubeId}
                  kicker={channel.name}
                  title={talk.title}
                  duration={talk.duration}
                />
              }
              meta={talk.meta}
              title={talk.title}
              linkLabel="Watch on YouTube"
            />
          </li>
        ))}
      </MediaGrid>
    </section>
  );
}
