import type { IceHypothesis, NumberedPoint } from '../../../content/types';
import { NumberedCard } from '../../molecules/NumberedCard/NumberedCard';
import { StoryHead } from '../../molecules/StoryHead/StoryHead';
import { IceTable } from '../../organisms/IceTable/IceTable';
import './CaseHypotheses.css';

type CaseHypothesesProps = {
  kicker: string;
  title: string;
  text: string;
  takeaway: string;
  criteria?: { name: string; text: string }[];
  items?: IceHypothesis[];
  selected?: number;
  statements?: NumberedPoint[];
};

/**
 * The hypotheses behind the design. With scores they are ranked with ICE and
 * the top ones go ahead; without scores they are the statements the interviews
 * tested, as numbered cards.
 */
export function CaseHypotheses({
  kicker,
  title,
  text,
  takeaway,
  criteria,
  items,
  selected,
  statements,
}: CaseHypothesesProps) {
  const scored = criteria && items && selected !== undefined;
  return (
    <section
      className="section container case-hypotheses"
      id="hypotheses"
      aria-labelledby="case-hypotheses-title"
    >
      <StoryHead
        id="case-hypotheses-title"
        kicker={kicker}
        title={title}
        text={text}
      />
      {scored ? (
        <div className="case-hypotheses-grid">
          <div className="case-hypotheses-side">
            <dl className="case-hypotheses-criteria">
              {criteria.map((item) => (
                <div key={item.name}>
                  <dt>
                    <span aria-hidden="true">{item.name[0]}</span>
                    {item.name}
                  </dt>
                  <dd>{item.text}</dd>
                </div>
              ))}
            </dl>
            <p className="case-hypotheses-formula">
              ICE score = Impact × Confidence × Ease, each from 1 to 10.
            </p>
            <p className="case-hypotheses-takeaway">{takeaway}</p>
          </div>
          <IceTable
            items={items}
            selected={selected}
            caption="Hypotheses ranked by ICE score"
          />
        </div>
      ) : (
        <>
          <ol className="case-hypotheses-statements">
            {statements?.map((point, index) => (
              <li key={point.title}>
                <NumberedCard n={index + 1} {...point} />
              </li>
            ))}
          </ol>
          <p className="case-hypotheses-conclusion">{takeaway}</p>
        </>
      )}
    </section>
  );
}
