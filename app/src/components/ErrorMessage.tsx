import React from 'react';

interface ErrorMessageProps {
  message: string;
}

/**
 * Displays a styled error message beneath a form field or form section.
 * Returns null when `message` is an empty string so callers can always
 * render this component without an extra conditional.
 */
function ErrorMessage({ message }: ErrorMessageProps): React.JSX.Element | null {
  if (!message) {
    return null;
  }

  return (
    <div
      className="error-message"
      role="alert"
      aria-live="polite"
      style={{ color: '#dc2626' }}
    >
      {message}
    </div>
  );
}

export type { ErrorMessageProps };
export default ErrorMessage;
