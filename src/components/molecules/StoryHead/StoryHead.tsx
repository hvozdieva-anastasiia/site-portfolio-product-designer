import type { ReactNode } from 'react';
import { Label } from '../../atoms/Label/Label';
import './StoryHead.css';

type StoryHeadProps = {
  id: string;
  kicker: string;
  title: string;
  /** A short paragraph under the title. */
  text?: string;
  /** Extra content under the text, such as chips. */
  children?: ReactNode;
};

/** The head of a case-study chapter: kicker, a plain-claim title, one paragraph. */
export function StoryHead({
  id,
  kicker,
  title,
  text,
  children,
}: StoryHeadProps) {
  return (
    <div className="story-head">
      <Label>{kicker}</Label>
      <h2 id={id}>{title}</h2>
      {text && <p className="story-head-text">{text}</p>}
      {children}
    </div>
  );
}
