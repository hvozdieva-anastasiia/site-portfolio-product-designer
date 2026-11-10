import type { Tool } from '../../../content/types';
import { ToolTile } from '../../atoms/ToolTile/ToolTile';
import './ToolRow.css';

/** A tool tile with its name written beside it. */
export function ToolRow({ tool }: { tool: Tool }) {
  return (
    <span className="tool-row">
      <ToolTile icon={tool.icon} monogram={tool.mono ?? tool.name[0]} />
      <span>{tool.name}</span>
    </span>
  );
}
