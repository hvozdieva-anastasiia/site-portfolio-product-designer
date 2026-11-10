import type { Article } from '../../../content/types';
import { ExternalTextLink } from '../../atoms/TextLink/TextLink';
import { ArticleArt } from '../../illustrations/ArticleArt/ArticleArt';
import { MediaCard } from '../../molecules/MediaCard/MediaCard';
import { MediaGrid } from '../../molecules/MediaGrid/MediaGrid';
import { SectionHead } from '../../molecules/SectionHead/SectionHead';

type ArticlesProps = {
  items: Article[];
  heading: { kicker: string; first: string; second: string };
  /** Link to the full list of articles. */
  allLink: { label: string; href: string };
};

/** Written articles, three to a row. */
export function Articles({ items, heading, allLink }: ArticlesProps) {
  return (
    <section
      className="section container"
      id="articles"
      aria-labelledby="articles-title"
    >
      <SectionHead id="articles-title" {...heading}>
        <ExternalTextLink href={allLink.href}>{allLink.label}</ExternalTextLink>
      </SectionHead>
      <MediaGrid>
        {items.map((article) => (
          <li key={article.title}>
            <MediaCard
              href={article.href}
              media={<ArticleArt kind={article.art} />}
              meta={article.meta}
              title={article.title}
              text={article.summary}
              linkLabel="Read on DOU"
            />
          </li>
        ))}
      </MediaGrid>
    </section>
  );
}
