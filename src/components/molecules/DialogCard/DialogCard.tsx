import type { ReactNode } from 'react';
import { Key } from '../../atoms/Key/Key';
import './DialogCard.css';

type DialogCardProps = {
  title: string;
  titleId: string;
  description: string;
  onClose: () => void;
  children: ReactNode;
};

/** The white card inside a modal: a title, a close key and the content. */
export function DialogCard({
  title,
  titleId,
  description,
  onClose,
  children,
}: DialogCardProps) {
  return (
    <div className="dialog-card">
      <div className="dialog-head">
        <div>
          <h2 id={titleId}>{title}</h2>
          <p>{description}</p>
        </div>
        <Key variant="icon" onClick={onClose} aria-label="Esc to close">
          Esc
        </Key>
      </div>
      {children}
    </div>
  );
}
