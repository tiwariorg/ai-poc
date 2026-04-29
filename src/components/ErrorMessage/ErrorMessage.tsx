import React from 'react';

import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
  /** The error message to display. Renders nothing when empty or falsy. */
  message: string;
}

/**
 * Displays a styled error message banner.
 *
 * Styling is sourced from `ErrorMessage.module.css` rather than inline styles
 * so that the presentation layer stays in CSS and benefits from the project's
 * standard CSS-Module scoping.
 *
 * Renders `null` when `message` is empty, preventing an empty banner from
 * appearing in the UI.
 */
function ErrorMessage({ message }: ErrorMessageProps): React.JSX.Element | null {
  if (!message) {
    return null;
  }

  return (
    <div className={styles.errorMessage} role="alert">
      {message}
    </div>
  );
}

export type { ErrorMessageProps };
export default ErrorMessage;
