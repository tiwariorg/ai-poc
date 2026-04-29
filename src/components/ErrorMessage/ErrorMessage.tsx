import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const errorMessageStyle: React.CSSProperties = {
  color: 'red',
  backgroundColor: '#ffe0e0',
  padding: '10px',
  borderRadius: '4px',
  marginTop: '12px',
  textAlign: 'center',
};

function ErrorMessage({ message }: ErrorMessageProps): React.JSX.Element | null {
  if (!message) {
    return null;
  }

  return (
    <div className="error-message" style={errorMessageStyle} role="alert">
      {message}
    </div>
  );
}

export type { ErrorMessageProps };
export default ErrorMessage;
