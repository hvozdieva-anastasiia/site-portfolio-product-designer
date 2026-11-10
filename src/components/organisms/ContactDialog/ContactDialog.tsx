import { useEffect, useRef } from 'react';
import { ContactForm } from '../ContactForm/ContactForm';
import './ContactDialog.css';

type ContactDialogProps = {
  open: boolean;
  /** Changes on every open so the form starts fresh. */
  session: number;
  initialMessage?: string;
  onClose: () => void;
  email: string;
  formEndpoint: string;
};

/** A native modal dialog that holds the contact form. */
export function ContactDialog({
  open,
  session,
  initialMessage,
  onClose,
  email,
  formEndpoint,
}: ContactDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      dialog.querySelector<HTMLElement>('[data-autofocus]')?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="dialog"
      aria-labelledby="contact-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <ContactForm
        key={session}
        initialMessage={initialMessage}
        email={email}
        endpoint={formEndpoint}
        onClose={onClose}
      />
    </dialog>
  );
}
