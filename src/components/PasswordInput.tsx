import React, { ChangeEvent } from 'react';

import ValidationMessage from './ValidationMessage';

interface PasswordInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error: string | null;
}

function PasswordInput({ value, onChange, error }: PasswordInputProps): React.JSX.Element {
  const hasError = error !== null;

  return (
    <div>
      <label
        htmlFor="password"
        className="font-medium text-sm text-gray-700 mb-1 block"
      >
        Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Enter your password"
        value={value}
        onChange={onChange}
        aria-invalid={hasError}
        aria-describedby={hasError ? 'password-error' : undefined}
        className={[
          'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition',
          hasError ? 'border-red-500' : 'border-gray-300',
        ].join(' ')}
      />
      <ValidationMessage message={error} />
    </div>
  );
}

export type { PasswordInputProps };
export default PasswordInput;
