import React from 'react';

import ValidationError from './ValidationError';

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  error: string | null;
}

function PasswordInput({ value, onChange, error }: PasswordInputProps): React.JSX.Element {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    onChange(e.target.value);
  }

  return (
    <div>
      <label
        htmlFor="password"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Password
      </label>
      <input
        id="password"
        type="password"
        placeholder="Enter your password"
        value={value}
        onChange={handleChange}
        autoComplete="current-password"
        className={[
          'w-full px-3 py-2 border rounded-md',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
          error ? 'border-red-500' : 'border-gray-300',
        ].join(' ')}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? 'password-error' : undefined}
      />
      <ValidationError message={error} />
    </div>
  );
}

export type { PasswordInputProps };
export default PasswordInput;
