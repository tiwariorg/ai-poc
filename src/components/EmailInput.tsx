import React from 'react';

import ValidationError from './ValidationError';

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  error: string | null;
}

function EmailInput({ value, onChange, error }: EmailInputProps): React.JSX.Element {
  const errorId = 'email-error';

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    onChange(e.target.value);
  }

  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Email
      </label>
      <input
        id="email"
        type="email"
        placeholder="Enter your email"
        value={value}
        onChange={handleChange}
        aria-invalid={error !== null}
        aria-describedby={error !== null ? errorId : undefined}
        className={[
          'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
          error !== null ? 'border-red-500' : 'border-gray-300',
        ].join(' ')}
      />
      <ValidationError id={errorId} message={error} />
    </div>
  );
}

export type { EmailInputProps };
export default EmailInput;
