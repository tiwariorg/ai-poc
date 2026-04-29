import React from 'react';

interface RememberMeCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function RememberMeCheckbox({ checked, onChange }: RememberMeCheckboxProps): React.JSX.Element {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    onChange(e.target.checked);
  }

  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id="remember-me"
        checked={checked}
        onChange={handleChange}
        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      <label htmlFor="remember-me" className="text-sm text-gray-600">
        Remember Me
      </label>
    </div>
  );
}

export type { RememberMeCheckboxProps };
export default RememberMeCheckbox;
