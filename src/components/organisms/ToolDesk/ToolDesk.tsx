import {
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from 'react';
import type { RiveConfig, ToolGroup } from '../../../content/types';
import { Aurora } from '../../atoms/Aurora/Aurora';
import { ToolTile } from '../../atoms/ToolTile/ToolTile';
import { CharacterScene } from '../../illustrations/CharacterScene/CharacterScene';
import { RiveSlot } from '../RiveSlot/RiveSlot';
import './ToolDesk.css';

type ToolDeskProps = {
  groups: ToolGroup[];
  rive: RiveConfig;
};

const steps: Record<string, number> = {
  ArrowDown: 1,
  ArrowRight: 1,
  ArrowUp: -1,
  ArrowLeft: -1,
};
const desktopHover = '(width > 900px) and (hover: hover) and (pointer: fine)';

/**
 * The tool groups as a typographic index beside a stage. Picking a group
 * (hover, click or arrow keys) switches the character's clip and lays that
 * group's tools out on the desk in front of her.
 */
export function ToolDesk({ groups, rive }: ToolDeskProps) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const group = groups[active];

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const last = groups.length - 1;
    let next: number;
    if (event.key in steps) {
      next = (active + steps[event.key] + groups.length) % groups.length;
    } else if (event.key === 'Home') {
      next = 0;
    } else if (event.key === 'End') {
      next = last;
    } else {
      return;
    }
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <div className="tool-desk">
      <div
        className="tool-desk-index"
        role="tablist"
        aria-label="Tool groups"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
      >
        {groups.map((item, i) => (
          <div
            key={item.title}
            className="tool-desk-row"
            role="presentation"
            data-active={i === active}
            onPointerEnter={(event) => {
              if (
                event.pointerType === 'mouse' &&
                window.matchMedia(desktopHover).matches
              ) {
                setActive(i);
              }
            }}
          >
            <button
              ref={(node) => {
                tabs.current[i] = node;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${i}`}
              className="tool-desk-tab"
              aria-selected={i === active}
              aria-controls={`${id}-panel`}
              aria-describedby={`${id}-note-${i}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
            >
              <span className="tool-desk-name">{item.title}</span>
              <span className="tool-desk-stack" aria-hidden="true">
                {item.tools.map((tool) => (
                  <ToolTile
                    key={tool.name}
                    icon={tool.icon}
                    src={tool.src}
                    monogram={tool.mono ?? tool.name[0]}
                  />
                ))}
              </span>
            </button>
            {/* Opens under the picked group only. */}
            <div className="tool-desk-note">
              <p id={`${id}-note-${i}`}>{item.note}</p>
            </div>
          </div>
        ))}
      </div>

      <div
        className="tool-desk-stage"
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab-${active}`}
        tabIndex={0}
      >
        <Aurora />
        {/* Phones: the note lives here, so the list never changes height. */}
        <p className="tool-desk-caption" aria-hidden="true" key={group.title}>
          {group.note}
        </p>
        <div className="tool-desk-figure">
          <RiveSlot
            src={rive.src}
            artboard={rive.artboard}
            machine={rive.toolkit[active]}
            label={`Animated portrait working with ${group.title} tools`}
          >
            <CharacterScene />
          </RiveSlot>
        </div>
        <ul
          className="tool-desk-dock"
          key={`dock-${group.title}`}
          aria-label={`${group.title} tools`}
        >
          {group.tools.map((tool, i) => (
            <li key={tool.name} style={{ '--i': i } as CSSProperties}>
              <ToolTile
                icon={tool.icon}
                src={tool.src}
                monogram={tool.mono ?? tool.name[0]}
              />
              <span>{tool.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
