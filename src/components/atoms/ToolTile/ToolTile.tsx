import { useState } from 'react';
import { simpleIconUrl } from '../../../lib/icons';
import './ToolTile.css';

type ToolTileProps = {
  /** simple-icons slug. */
  icon?: string;
  /** A self-hosted glyph (black on transparent), for brands simple-icons lacks. */
  src?: string;
  /** Shown when there is no icon, or the icon fails to load. */
  monogram: string;
  /** Native tooltip. Leave out when the name is written next to the tile. */
  title?: string;
};

/** A small white tile holding a tool's brand glyph, or a monogram. */
export function ToolTile({ icon, src, monogram, title }: ToolTileProps) {
  const [failed, setFailed] = useState(false);
  const url = src ?? (icon ? simpleIconUrl(icon) : undefined);
  return (
    <span className="tool-tile" title={title}>
      {url && !failed ? (
        <img
          src={url}
          alt=""
          width={16}
          height={16}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="tool-mono" aria-hidden="true">
          {monogram}
        </span>
      )}
    </span>
  );
}
