import React from 'react';

interface SubmitButtonProps {
  isSubmitting: boolean;
}

function SubmitButton({ isSubmitting }: SubmitButtonProps): React.JSX.Element {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={[
        'w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg',
        'transition-colors duration-200',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        isSubmitting ? 'opacity-50 cursor-not-allowed' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {isSubmitting ? 'Signing in...' : 'Sign In'}
    </button>
  );
}

export type { SubmitButtonProps };
export default SubmitButton;
