import React from 'react';

interface ValidationErrorProps {
  /** The error message to display, or `null` / empty string when there is no error. */
  message: string | null;
  /**
   * The `id` attribute applied to the rendered `<p>` element.
   * Must match the `aria-describedby` value on the associated input so that
   * screen readers can announce the error when the input is focused.
   */
  id?: string;
}

function ValidationError({ message, id }: ValidationErrorProps): React.JSX.Element | null {
  if (message === null || message === '') {
    return null;
  }

  return (
    <p id={id} className="text-red-500 text-sm mt-1" role="alert">
      {message}
    </p>
  );
}

export type { ValidationErrorProps };
export default ValidationError;
