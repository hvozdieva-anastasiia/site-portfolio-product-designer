import { Label } from '../../atoms/Label/Label';
import { RouterLink } from '../../atoms/RouterLink/RouterLink';
import { TextLink } from '../../atoms/TextLink/TextLink';
import './CaseNext.css';

type CaseNextProps = {
  next?: { title: string; to: string };
  backTo: string;
};

/** The way out of a case: the next one, or back to all work. */
export function CaseNext({ next, backTo }: CaseNextProps) {
  return (
    <nav className="section container case-next" aria-label="More work">
      {next && (
        <RouterLink className="case-next-link" to={next.to}>
          <Label>Next case</Label>
          <span className="case-next-title">
            {next.title} <span aria-hidden="true">→</span>
          </span>
        </RouterLink>
      )}
      <TextLink to={backTo}>← Back to all work</TextLink>
    </nav>
  );
}
