import React, { ChangeEvent } from 'react';

interface PasswordInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

/**
 * PasswordInput component.
 *
 * Renders a labelled password input field styled consistently with
 * EmailInput. When an `error` prop is provided, the input receives a red
 * border and the error message is displayed below the field in red text.
 */
function PasswordInput({ value, onChange, error }: PasswordInputProps): React.JSX.Element {
  const hasError = Boolean(error);

  return (
    <div>
      <label
        htmlFor="password"
        className="block font-medium text-sm text-gray-700 mb-1"
      >
        Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Enter your password"
        autoComplete="current-password"
        value={value}
        onChange={onChange}
        aria-invalid={hasError}
        aria-describedby={hasError ? 'password-error' : undefined}
        className={[
          'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition',
          hasError ? 'border-red-500' : 'border-gray-300',
        ].join(' ')}
      />
      {hasError && (
        <p id="password-error" className="text-red-500 text-sm mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export type { PasswordInputProps };
export default PasswordInput;
