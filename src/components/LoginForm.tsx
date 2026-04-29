import React from 'react';

import useLoginForm from '../hooks/useLoginForm';
import EmailInput from './EmailInput';
import ForgotPasswordLink from './ForgotPasswordLink';
import PasswordInput from './PasswordInput';
import RememberMeCheckbox from './RememberMeCheckbox';
import SubmitButton from './SubmitButton';

/**
 * Login form component.
 *
 * Delegates all form state and event-handling logic to the `useLoginForm`
 * hook, keeping this component lean and focused purely on rendering.
 *
 * Renders:
 * - An email input field with validation feedback
 * - A password input field with validation feedback
 * - A "Remember me" checkbox and "Forgot Password?" link on the same row
 * - A submit button that reflects the in-progress submission state
 */
function LoginForm(): React.JSX.Element {
  const {
    formData,
    errors,
    isSubmitting,
    handleEmailChange,
    handlePasswordChange,
    handleRememberMeChange,
    handleSubmit,
  } = useLoginForm();

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col gap-4">
        {/* Email field */}
        <EmailInput
          value={formData.email}
          onChange={handleEmailChange}
          error={errors.email}
        />

        {/* Password field */}
        <PasswordInput
          value={formData.password}
          onChange={handlePasswordChange}
          error={errors.password}
        />

        {/* Remember me + Forgot password row */}
        <div className="flex justify-between items-center">
          <RememberMeCheckbox
            checked={formData.rememberMe}
            onChange={handleRememberMeChange}
          />
          <ForgotPasswordLink />
        </div>

        {/* Submit button */}
        <SubmitButton isSubmitting={isSubmitting} />
      </div>
    </form>
  );
}

export default LoginForm;
