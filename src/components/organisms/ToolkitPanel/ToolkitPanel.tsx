import { useState, type CSSProperties } from 'react';
import type { RiveConfig, ToolGroup } from '../../../content/types';
import { Slab } from '../../atoms/Slab/Slab';
import { CharacterScene } from '../../illustrations/CharacterScene/CharacterScene';
import { ToolIcon } from '../../molecules/ToolIcon/ToolIcon';
import { ToolRow } from '../../molecules/ToolRow/ToolRow';
import { RiveSlot } from '../RiveSlot/RiveSlot';
import './ToolkitPanel.css';

type ToolkitPanelProps = {
  groups: ToolGroup[];
  rive: RiveConfig;
};

/**
 * The tool groups next to the animated character. Picking a group switches the
 * character's clip and floats that group's tools around her.
 */
export function ToolkitPanel({ groups, rive }: ToolkitPanelProps) {
  const [active, setActive] = useState(0);
  const group = groups[active];

  return (
    <Slab className="toolkit">
      <div className="toolkit-stage">
        <RiveSlot
          src={rive.src}
          artboard={rive.artboard}
          machine={rive.toolkit[active]}
          label={`Animated portrait working with ${group.title} tools`}
        >
          <CharacterScene />
        </RiveSlot>
        <ul className="float-tools" key={group.title} aria-hidden="true">
          {group.tools.map((tool, i) => (
            <li key={tool.name} style={{ '--i': i } as CSSProperties}>
              <ToolIcon tool={tool} />
            </li>
          ))}
        </ul>
      </div>
      <div className="toolkit-groups">
        {groups.map((item, i) => (
          <div
            className="toolkit-col"
            key={item.title}
            data-active={i === active}
            onMouseEnter={() => setActive(i)}
          >
            <h3>
              <button
                type="button"
                className="group-pick"
                aria-pressed={i === active}
                onClick={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                {item.title}
              </button>
            </h3>
            <p className="toolkit-note">{item.note}</p>
            <ul>
              {item.tools.map((tool) => (
                <li key={tool.name}>
                  <ToolRow tool={tool} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Slab>
  );
}
