import { StoryHead } from '../../molecules/StoryHead/StoryHead';
import './CaseLearnings.css';

type CaseLearningsProps = { kicker: string; title: string; items: string[] };

/** What the project taught, one line each. */
export function CaseLearnings({ kicker, title, items }: CaseLearningsProps) {
  return (
    <section
      className="section container case-learnings"
      aria-labelledby="case-learnings-title"
    >
      <StoryHead id="case-learnings-title" kicker={kicker} title={title} />
      <ol className="case-learnings-list">
        {items.map((item, index) => (
          <li key={item}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <p>{item}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
