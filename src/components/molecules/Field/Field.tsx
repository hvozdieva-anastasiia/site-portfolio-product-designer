import type { ReactNode } from 'react';
import './Field.css';

type FieldProps = {
  label: string;
  htmlFor: string;
  error?: string;
  /** Id of the error text, referenced by the control's aria-describedby. */
  errorId: string;
  /** Small text on the right under the control, such as a character count. */
  counter?: string;
  /** The control: an Input or a Textarea. */
  children: ReactNode;
};

/** A label, a control and its error text. */
export function Field({
  label,
  htmlFor,
  error,
  errorId,
  counter,
  children,
}: FieldProps) {
  const errorText = error && (
    <p className="field-error" id={errorId}>
      {error}
    </p>
  );
  return (
    <div className="field">
      <label htmlFor={htmlFor}>{label}</label>
      {children}
      {counter === undefined ? (
        errorText
      ) : (
        <div className="field-foot">
          {errorText || <span />}
          <span className="counter">{counter}</span>
        </div>
      )}
    </div>
  );
}
