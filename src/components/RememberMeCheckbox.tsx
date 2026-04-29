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
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      <label htmlFor="rememberMe" className="text-sm text-gray-600">
        Remember me
      </label>
    </div>
  );
}

export type { RememberMeCheckboxProps };
export default RememberMeCheckbox;
