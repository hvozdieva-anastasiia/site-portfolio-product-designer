import type { RiveConfig, ToolGroup } from '../../../content/types';
import { SectionHead } from '../../molecules/SectionHead/SectionHead';
import { ToolDesk } from '../../organisms/ToolDesk/ToolDesk';

type ToolkitDeskProps = {
  groups: ToolGroup[];
  rive: RiveConfig;
  heading: { kicker: string; first: string; second: string };
};

/**
 * The daily tools as an index of groups set in large type, next to a stage
 * where the character works and the picked group's tools sit on her desk.
 */
export function ToolkitDesk({ groups, rive, heading }: ToolkitDeskProps) {
  return (
    <section
      className="section container"
      id="toolkit"
      aria-labelledby="toolkit-title"
    >
      <SectionHead id="toolkit-title" {...heading} />
      <ToolDesk groups={groups} rive={rive} />
    </section>
  );
}
