import type { RiveConfig, ToolGroup } from '../../../content/types';
import { Aurora } from '../../atoms/Aurora/Aurora';
import { SectionHead } from '../../molecules/SectionHead/SectionHead';
import { ToolkitPanel } from '../../organisms/ToolkitPanel/ToolkitPanel';
import './Toolkit.css';

type ToolkitProps = {
  groups: ToolGroup[];
  rive: RiveConfig;
  heading: { kicker: string; first: string; second: string };
};

/**
 * The tools used every day, grouped, next to the animated character. The panel
 * sits on the same soft glow as the first screen, which gives the page depth
 * a second time further down.
 */
export function Toolkit({ groups, rive, heading }: ToolkitProps) {
  return (
    <div className="toolkit-band">
      <section
        className="section container"
        id="toolkit"
        aria-labelledby="toolkit-title"
      >
        <SectionHead id="toolkit-title" {...heading} />
        <div className="toolkit-glow">
          <Aurora />
          <ToolkitPanel groups={groups} rive={rive} />
        </div>
      </section>
    </div>
  );
}
