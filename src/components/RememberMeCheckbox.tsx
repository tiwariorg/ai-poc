import React, { ChangeEvent } from 'react';

interface RememberMeCheckboxProps {
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function RememberMeCheckbox({ checked, onChange }: RememberMeCheckboxProps): React.JSX.Element {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id="rememberMe"
        name="rememberMe"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      <label htmlFor="rememberMe" className="text-sm text-gray-600">
        Remember Me
      </label>
    </div>
  );
}

export type { RememberMeCheckboxProps };
export default RememberMeCheckbox;
