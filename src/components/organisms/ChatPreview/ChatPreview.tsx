import { Avatar } from '../../atoms/Avatar/Avatar';
import './ChatPreview.css';

type ChatPreviewProps = {
  /** Whose avatar sits beside the greeting. */
  name: string;
  greeting: string;
  reply: string;
};

/** A decorative mock chat that hints at what the contact form is for. */
export function ChatPreview({ name, greeting, reply }: ChatPreviewProps) {
  return (
    <div className="chat" aria-hidden="true">
      <div className="chat-row">
        <Avatar name={name} size="sm" />
        <p className="bubble-text">{greeting}</p>
      </div>
      <div className="chat-row chat-row--me">
        <p className="bubble-text bubble-text--me">{reply}</p>
      </div>
      <div className="composer">
        <span>Write a message…</span>
        <span className="composer-send">↵</span>
      </div>
    </div>
  );
}
