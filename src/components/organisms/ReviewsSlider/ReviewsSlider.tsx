import { useState } from 'react';
import type { Review } from '../../../content/types';
import { Aurora } from '../../atoms/Aurora/Aurora';
import { Slab } from '../../atoms/Slab/Slab';
import { ExternalTextLink } from '../../atoms/TextLink/TextLink';
import { PagerControls } from '../../molecules/PagerControls/PagerControls';
import { QuoteFigure } from '../../molecules/QuoteFigure/QuoteFigure';
import './ReviewsSlider.css';

type ReviewsSliderProps = {
  reviews: Review[];
  /** Where the full recommendation can be read, for the shortened ones. */
  fullTextUrl: string;
};

/** A carousel of recommendations: one quote at a time, with a pager. */
export function ReviewsSlider({ reviews, fullTextUrl }: ReviewsSliderProps) {
  const [index, setIndex] = useState(0);
  const total = reviews.length;
  const go = (step: number) =>
    setIndex((current) => (current + step + total) % total);

  return (
    <Slab
      className="testimonial"
      role="group"
      aria-roledescription="carousel"
      aria-label="Recommendations"
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') go(1);
        if (event.key === 'ArrowLeft') go(-1);
      }}
    >
      <Aurora variant="panel" />
      {/* Every quote sits in the same grid cell, so the panel keeps the height
          of the longest one and the page does not jump between slides. */}
      <div className="quote-stack" aria-live="polite">
        {reviews.map((review, i) => (
          <QuoteFigure
            key={`${review.name}-${i}`}
            quote={review.quote}
            name={review.name}
            role={review.role}
            meta={`${review.relation} · ${review.date}`}
            active={i === index}
            label={`Recommendation ${i + 1} of ${total}`}
          >
            {review.truncated && (
              <ExternalTextLink href={fullTextUrl} className="quote-full">
                Read full on LinkedIn
              </ExternalTextLink>
            )}
          </QuoteFigure>
        ))}
      </div>
      <PagerControls
        position={`${index + 1} / ${total}`}
        prevLabel="Previous review"
        nextLabel="Next review"
        onPrev={() => go(-1)}
        onNext={() => go(1)}
      />
    </Slab>
  );
}
