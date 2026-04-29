import React from 'react';

interface ValidationMessageProps {
  message: string | null;
}

function ValidationMessage({ message }: ValidationMessageProps): React.JSX.Element | null {
  if (message === null || message === '') {
    return null;
  }

  return (
    <p className="text-red-500 text-sm mt-1">
      {message}
    </p>
  );
}

export type { ValidationMessageProps };
export default ValidationMessage;
