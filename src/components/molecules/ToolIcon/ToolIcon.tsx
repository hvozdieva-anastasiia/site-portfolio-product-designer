import type { Tool } from '../../../content/types';
import { ToolTile } from '../../atoms/ToolTile/ToolTile';

/** A tool tile with its name as a tooltip and for screen readers. */
export function ToolIcon({ tool }: { tool: Tool }) {
  return (
    <>
      <ToolTile
        icon={tool.icon}
        src={tool.src}
        monogram={tool.mono ?? tool.name[0]}
        title={tool.name}
      />
      <span className="sr-only">{tool.name}</span>
    </>
  );
}
