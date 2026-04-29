import React, { ChangeEvent } from 'react';

import ValidationMessage from './ValidationMessage';

interface EmailInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error: string | null;
}

function EmailInput({ value, onChange, error }: EmailInputProps): React.JSX.Element {
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
        value={value}
        onChange={onChange}
        className={[
          'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition',
          error !== null ? 'border-red-500' : 'border-gray-300',
        ].join(' ')}
      />
      <ValidationMessage message={error} />
    </div>
  );
}

export type { EmailInputProps };
export default EmailInput;
