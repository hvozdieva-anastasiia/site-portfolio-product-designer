import type { Case } from '../../../content/types';
import { Label } from '../../atoms/Label/Label';
import { CaseSpec } from '../../organisms/CaseSpec/CaseSpec';
import './CaseRole.css';

type CaseRoleProps = {
  title: string;
  text: string;
  scope: string[];
} & Pick<Case, 'domains' | 'tools'>;

/** What I owned: the role in one paragraph, the scope as a list, the tools. */
export function CaseRole({
  title,
  text,
  scope,
  domains,
  tools,
}: CaseRoleProps) {
  return (
    <section
      className="section container case-role"
      aria-labelledby="case-role-title"
    >
      <div className="case-role-main">
        <Label>My role</Label>
        <h2 id="case-role-title">{title}</h2>
        <p>{text}</p>
        <CaseSpec domains={domains} tools={tools} />
      </div>
      <div className="case-role-scope">
        <Label>Scope</Label>
        <ul>
          {scope.map((item) => (
            <li key={item}>
              <span aria-hidden="true">✳</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
