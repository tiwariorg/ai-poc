import React from 'react';

interface ValidationErrorProps {
  message: string | null;
}

function ValidationError({ message }: ValidationErrorProps): React.JSX.Element | null {
  if (message === null || message === '') {
    return null;
  }

  return (
    <p className="text-red-500 text-sm mt-1" role="alert">
      {message}
    </p>
  );
}

export type { ValidationErrorProps };
export default ValidationError;
