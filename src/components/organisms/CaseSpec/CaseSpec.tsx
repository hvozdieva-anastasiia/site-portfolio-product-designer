import type { Case } from '../../../content/types';
import { ChipList } from '../../molecules/ChipList/ChipList';
import { SpecList, SpecRow } from '../../molecules/SpecList/SpecList';
import { ToolIcon } from '../../molecules/ToolIcon/ToolIcon';
import './CaseSpec.css';

/** What a case involved: tags per domain, then the tools used. */
export function CaseSpec({ domains, tools }: Pick<Case, 'domains' | 'tools'>) {
  return (
    <SpecList>
      {domains.map((domain) => (
        <SpecRow label={domain.label} key={domain.label}>
          <ChipList label={`${domain.label} work`} items={domain.tags} />
        </SpecRow>
      ))}
      <SpecRow label="Tools">
        <ul className="tools" aria-label="Tools used">
          {tools.map((tool) => (
            <li key={tool.name}>
              <ToolIcon tool={tool} />
            </li>
          ))}
        </ul>
      </SpecRow>
    </SpecList>
  );
}
