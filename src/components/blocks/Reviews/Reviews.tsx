import type { Review } from '../../../content/types';
import { ExternalTextLink } from '../../atoms/TextLink/TextLink';
import { SectionHead } from '../../molecules/SectionHead/SectionHead';
import { ReviewsSlider } from '../../organisms/ReviewsSlider/ReviewsSlider';

type ReviewsProps = {
  reviews: Review[];
  heading: { kicker: string; first: string; second: string };
  /** The LinkedIn page that lists every recommendation in full. */
  recommendationsUrl: string;
};

/** Recommendations from colleagues, one at a time. */
export function Reviews({
  reviews,
  heading,
  recommendationsUrl,
}: ReviewsProps) {
  return (
    <section
      className="section container"
      id="reviews"
      aria-labelledby="reviews-title"
    >
      <SectionHead id="reviews-title" {...heading}>
        <ExternalTextLink href={recommendationsUrl}>
          See on LinkedIn
        </ExternalTextLink>
      </SectionHead>
      <ReviewsSlider reviews={reviews} fullTextUrl={recommendationsUrl} />
    </section>
  );
}
