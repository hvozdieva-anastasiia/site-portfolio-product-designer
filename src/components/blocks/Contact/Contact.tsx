import { useEffect, useRef, useState } from 'react';
import type { RiveConfig } from '../../../content/types';
import { MAX_CONTACT_MESSAGE_LENGTH } from '../../../lib/contact';
import { Aurora } from '../../atoms/Aurora/Aurora';
import { Button } from '../../atoms/Button/Button';
import { Textarea } from '../../atoms/Input/Input';
import { Label } from '../../atoms/Label/Label';
import { Slab } from '../../atoms/Slab/Slab';
import { CharacterScene } from '../../illustrations/CharacterScene/CharacterScene';
import { ChatPreview } from '../../organisms/ChatPreview/ChatPreview';
import { RiveSlot } from '../../organisms/RiveSlot/RiveSlot';
import './Contact.css';

type ContactMascot = Pick<RiveConfig, 'src' | 'artboard' | 'idle'> & {
  typing: string;
};

type ContactProps = {
  /** Whose avatar appears in the chat preview. */
  name: string;
  onContact: (message?: string) => void;
  title?: { first: string; second: string };
  text?: string;
  buttonLabel?: string;
  greeting?: string;
  reply?: string;
  mascot?: ContactMascot;
};

const motionPreference = '(prefers-reduced-motion: reduce)';

function MascotGreeting({
  greeting,
  mascot,
  onReply,
}: {
  greeting: string;
  mascot: ContactMascot;
  onReply: (message: string) => void;
}) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [riveLoaded, setRiveLoaded] = useState<boolean | null>(null);
  const [reduced, setReduced] = useState(
    () => window.matchMedia(motionPreference).matches,
  );
  const [length, setLength] = useState(0);
  const complete = reduced || riveLoaded === false || length >= greeting.length;
  const typing = visible && riveLoaded === true && !complete;
  const shown = complete ? greeting : greeting.slice(0, length);

  useEffect(() => {
    const media = window.matchMedia(motionPreference);
    const change = (event: MediaQueryListEvent) => {
      setRiveLoaded(null);
      setReduced(event.matches);
    };
    media.addEventListener('change', change);
    return () => media.removeEventListener('change', change);
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.intersectionRatio >= 0.5),
      { threshold: 0.5 },
    );
    observer.observe(scene);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!typing) return;
    const previous = greeting.charAt(length - 1);
    const delay = length === 0 ? 160 : /[!,.]/.test(previous) ? 150 : 42;
    const timer = window.setTimeout(() => setLength(length + 1), delay);
    return () => window.clearTimeout(timer);
  }, [greeting, length, typing]);

  return (
    <div className="contact-scene" ref={sceneRef}>
      <div className="contact-mascot" aria-hidden="true">
        {reduced ? (
          <CharacterScene />
        ) : (
          <RiveSlot
            src={mascot.src}
            artboard={mascot.artboard}
            machine={typing ? mascot.typing : mascot.idle}
            label="Anastasiia at her laptop"
            onLoadResult={setRiveLoaded}
          >
            <CharacterScene />
          </RiveSlot>
        )}
      </div>
      <div className="contact-message">
        <div className="contact-message-copy">
          <p>
            <span className="sr-only">{greeting}</span>
            <span aria-hidden="true">
              {shown}
              <span className="contact-message-untyped">
                {greeting.slice(shown.length)}
              </span>
            </span>
          </p>
          <span className="contact-message-status" aria-hidden="true">
            {complete ? 'Waiting for your reply' : 'Typing…'}
          </span>
        </div>
        <form
          className="contact-reply"
          onSubmit={(event) => {
            event.preventDefault();
            const reply = new FormData(event.currentTarget).get('reply');
            onReply(typeof reply === 'string' ? reply : '');
          }}
        >
          <Textarea
            name="reply"
            rows={2}
            maxLength={MAX_CONTACT_MESSAGE_LENGTH}
            aria-label="Write a reply"
            aria-describedby="contact-reply-next"
            placeholder="Write a reply…"
          />
          <div className="contact-reply-actions">
            <p id="contact-reply-next">Add your contact details next.</p>
            <Button type="submit" variant="carbon" aria-haspopup="dialog">
              Continue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

/** An invitation to write, with a chat-style preview and a button that opens the form. */
export function Contact({
  name,
  onContact,
  title = {
    first: 'Have a product to design',
    second: 'or a problem to untangle?',
  },
  text = 'Tell me what you’re building and where it hurts. I read every message and reply by email.',
  buttonLabel = 'Get in touch',
  greeting = 'Hi! Tell me a bit about your product and what you’re trying to solve.',
  reply = 'We need to fix onboarding before the next release…',
  mascot,
}: ContactProps) {
  return (
    <section
      className="section container"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <Slab className={mascot ? 'contact contact--mascot' : 'contact'}>
        <Aurora variant="panel" />
        <div className="contact-copy">
          <Label>Contact</Label>
          <h2 id="contact-heading">
            {title.first} <span className="muted">{title.second}</span>
          </h2>
          <p className="contact-text">{text}</p>
          {!mascot && (
            <Button variant="carbon" onClick={() => onContact()}>
              {buttonLabel}
            </Button>
          )}
        </div>
        {mascot ? (
          <MascotGreeting
            key={greeting}
            greeting={greeting}
            mascot={mascot}
            onReply={onContact}
          />
        ) : (
          <ChatPreview name={name} greeting={greeting} reply={reply} />
        )}
      </Slab>
    </section>
  );
}
