import React, { ChangeEvent } from 'react';

interface EmailInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

function EmailInput({ value, onChange, error }: EmailInputProps): React.JSX.Element {
  const hasError = error !== undefined && error !== '';

  return (
    <div>
      <label
        htmlFor="email"
        className="block font-medium text-sm text-gray-700 mb-1"
      >
        Email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Enter your email"
        autoComplete="email"
        value={value}
        onChange={onChange}
        aria-invalid={hasError}
        aria-describedby={hasError ? 'email-error' : undefined}
        className={[
          'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
          hasError ? 'border-red-500' : 'border-gray-300',
        ].join(' ')}
      />
      {hasError && (
        <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export type { EmailInputProps };
export default EmailInput;
