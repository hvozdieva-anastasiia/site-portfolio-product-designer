import { useRef, useState, type FormEvent } from 'react';
import { MAX_CONTACT_MESSAGE_LENGTH } from '../../../lib/contact';
import { Button, ButtonLink } from '../../atoms/Button/Button';
import { CheckIcon } from '../../atoms/Icon/Icon';
import { Input, Textarea } from '../../atoms/Input/Input';
import { DialogCard } from '../../molecules/DialogCard/DialogCard';
import { Field } from '../../molecules/Field/Field';
import { SegmentedRadios } from '../../molecules/SegmentedRadios/SegmentedRadios';
import './ContactForm.css';

type Topic = 'project' | 'role' | 'speaking' | 'hello';
type FieldName = 'name' | 'email' | 'message';
type Status = 'idle' | 'sending' | 'sent' | 'mailto' | 'error';

const topics: { value: Topic; label: string }[] = [
  { value: 'project', label: 'Project' },
  { value: 'role', label: 'Full-time role' },
  { value: 'speaking', label: 'Speaking' },
  { value: 'hello', label: 'Just saying hi' },
];

/**
 * Hands the message to the visitor's mail app. A hidden iframe is used so a
 * browser without a mail handler can never navigate away from the site.
 */
function openMailApp(href: string) {
  const frame = document.createElement('iframe');
  frame.hidden = true;
  frame.src = href;
  document.body.appendChild(frame);
  window.setTimeout(() => frame.remove(), 1500);
}

function validate(values: Record<FieldName, string>) {
  const errors: Partial<Record<FieldName, string>> = {};
  if (!values.name.trim()) errors.name = 'Please tell me your name.';
  if (!values.email.trim()) {
    errors.email = 'Please add an email so I can reply.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'That email doesn’t look right.';
  }
  if (values.message.trim().length < 10) {
    errors.message = 'A sentence or two helps me reply properly.';
  }
  return errors;
}

type ContactFormProps = {
  /** Where messages go. Used for the mail app fallback and for copying. */
  email: string;
  /**
   * Optional endpoint (for example Formspree) the form posts to. When empty,
   * the form opens the visitor's mail app with the message filled in.
   */
  endpoint: string;
  initialMessage?: string;
  onClose: () => void;
};

/** The "get in touch" form, with its sent / mail-app / error states. */
export function ContactForm({
  email,
  endpoint,
  initialMessage = '',
  onClose,
}: ContactFormProps) {
  const [values, setValues] = useState({
    name: '',
    email: '',
    message: initialMessage,
    topic: 'project' as Topic,
    company: '', // honeypot, hidden from people
  });
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [copied, setCopied] = useState(false);
  const [mailtoHref, setMailtoHref] = useState('');
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const set = <K extends keyof typeof values>(
    key: K,
    value: (typeof values)[K],
  ) => setValues((current) => ({ ...current, [key]: value }));

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    const first = (['name', 'email', 'message'] as const).find(
      (key) => found[key],
    );
    if (first) {
      const target = { name: nameRef, email: emailRef, message: messageRef }[
        first
      ];
      target.current?.focus();
      return;
    }
    if (values.company) {
      setStatus('sent'); // a bot filled the hidden field; pretend it worked
      return;
    }
    const topicLabel = topics.find(
      (topic) => topic.value === values.topic,
    )!.label;
    if (endpoint) {
      setStatus('sending');
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: values.name.trim(),
            email: values.email.trim(),
            topic: topicLabel,
            message: values.message.trim(),
          }),
        });
        if (!response.ok) throw new Error(String(response.status));
        setStatus('sent');
      } catch {
        setStatus('error');
      }
      return;
    }
    const subject = `[Portfolio] ${topicLabel} from ${values.name.trim()}`;
    const body = `${values.message.trim()}\n\n${values.name.trim()}\n${values.email.trim()}`;
    const href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setMailtoHref(href);
    openMailApp(href);
    setStatus('mailto');
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable: the address is visible anyway */
    }
  }

  const card = {
    title: 'Get in touch',
    titleId: 'contact-title',
    description: 'Tell me about your product or role. I’ll reply by email.',
    onClose,
  };

  if (status === 'sent' || status === 'mailto') {
    return (
      <DialogCard {...card}>
        <div className="success" role="status">
          <span className="success-icon" aria-hidden="true">
            <CheckIcon />
          </span>
          <h3>
            {status === 'sent'
              ? 'Message sent'
              : 'Your email app should be open'}
          </h3>
          <p>
            {status === 'sent'
              ? 'Thanks, I’ll get back to you by email.'
              : 'Press send there and your message is on its way. Nothing opened? Use the buttons below.'}
          </p>
          <div className="success-actions">
            {status === 'mailto' && (
              <>
                <ButtonLink href={mailtoHref}>Open email app</ButtonLink>
                <Button onClick={copyEmail}>
                  {copied ? 'Copied' : 'Copy address'}
                </Button>
              </>
            )}
            <Button variant="carbon" onClick={onClose}>
              Done
            </Button>
          </div>
        </div>
      </DialogCard>
    );
  }

  return (
    <DialogCard {...card}>
      <form className="form" onSubmit={onSubmit} noValidate>
        <SegmentedRadios
          legend="What’s this about?"
          name="topic"
          options={topics}
          value={values.topic}
          onChange={(topic) => set('topic', topic)}
        />

        <div className="form-grid">
          <Field
            label="Name"
            htmlFor="cf-name"
            error={errors.name}
            errorId="cf-name-error"
          >
            <Input
              id="cf-name"
              ref={nameRef}
              data-autofocus
              autoComplete="name"
              value={values.name}
              onChange={(event) => set('name', event.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'cf-name-error' : undefined}
              placeholder="Jane Smith"
            />
          </Field>
          <Field
            label="Email"
            htmlFor="cf-email"
            error={errors.email}
            errorId="cf-email-error"
          >
            <Input
              id="cf-email"
              ref={emailRef}
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={(event) => set('email', event.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'cf-email-error' : undefined}
              placeholder="jane@company.com"
            />
          </Field>
        </div>

        <Field
          label="Message"
          htmlFor="cf-message"
          error={errors.message}
          errorId="cf-message-error"
          counter={`${values.message.length}/${MAX_CONTACT_MESSAGE_LENGTH}`}
        >
          <Textarea
            id="cf-message"
            ref={messageRef}
            rows={5}
            maxLength={MAX_CONTACT_MESSAGE_LENGTH}
            value={values.message}
            onChange={(event) => set('message', event.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'cf-message-error' : undefined}
            placeholder="What are you building, and where could design help?"
          />
        </Field>

        <div className="hp" aria-hidden="true">
          <label htmlFor="cf-company">Company</label>
          <Input
            id="cf-company"
            tabIndex={-1}
            autoComplete="off"
            value={values.company}
            onChange={(event) => set('company', event.target.value)}
          />
        </div>

        {status === 'error' && (
          <p className="form-error" role="alert">
            Something went wrong sending that. Please try again, or email{' '}
            <a href={`mailto:${email}`}>{email}</a> directly.
          </p>
        )}

        <div className="form-foot">
          <p className="form-alt">
            Or write directly: <a href={`mailto:${email}`}>{email}</a>
          </p>
          <Button
            type="submit"
            variant="carbon"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </Button>
        </div>
      </form>
    </DialogCard>
  );
}
