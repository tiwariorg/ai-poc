import React from 'react';

interface SubmitButtonProps {
  isSubmitting: boolean;
}

/**
 * SubmitButton component.
 *
 * Renders a full-width submit button for the login form. When `isSubmitting`
 * is true the button is disabled and its label switches to 'Signing In...'
 * to give the user clear feedback that a network request is in-flight.
 *
 * Disabled styling is handled entirely by Tailwind's `disabled:` variants so
 * the class list remains static and does not need conditional logic.
 */
function SubmitButton({ isSubmitting }: SubmitButtonProps): React.JSX.Element {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      aria-busy={isSubmitting}
      className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isSubmitting ? 'Signing In...' : 'Sign In'}
    </button>
  );
}

export type { SubmitButtonProps };
export default SubmitButton;
