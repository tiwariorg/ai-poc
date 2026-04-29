import React, { ChangeEvent, useState } from 'react';

import { validateEmail, validatePassword } from '../utils/validation';
import EmailInput from './EmailInput';
import ForgotPasswordLink from './ForgotPasswordLink';
import PasswordInput from './PasswordInput';
import RememberMeCheckbox from './RememberMeCheckbox';
import SignUpLink from './SignUpLink';
import SubmitButton from './SubmitButton';

/**
 * Standalone login form that validates email/password fields client-side.
 *
 * NOTE: This component does not wire to `AuthContext` directly — it is a
 * presentation-only form used by `src/components/LoginPage.tsx`. The routed
 * version at `src/components/LoginForm/LoginForm.tsx` handles auth integration
 * via `useAuthContext`.
 *
 * Form submission is a no-op until a real authentication handler is wired in.
 */
function LoginForm(): React.JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  function handleEmailChange(e: ChangeEvent<HTMLInputElement>): void {
    setEmail(e.target.value);
    setEmailError(null);
  }

  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>): void {
    setPassword(e.target.value);
    setPasswordError(null);
  }

  function handleRememberMeChange(e: ChangeEvent<HTMLInputElement>): void {
    setRememberMe(e.target.checked);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);

    setEmailError(emailValidationError);
    setPasswordError(passwordValidationError);

    if (emailValidationError !== null || passwordValidationError !== null) {
      return;
    }

    // Fields are valid — suppress the unused `rememberMe` warning by
    // referencing it, while keeping this as a no-op until auth is wired in.
    void rememberMe;

    // Mark as submitting (no-op until auth handler is wired in).
    setIsSubmitting(true);
    setIsSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="space-y-4">
        <EmailInput
          value={email}
          onChange={handleEmailChange}
          error={emailError}
        />

        <PasswordInput
          value={password}
          onChange={handlePasswordChange}
          error={passwordError}
        />

        <div className="flex items-center justify-between">
          <RememberMeCheckbox
            checked={rememberMe}
            onChange={handleRememberMeChange}
          />
          <ForgotPasswordLink />
        </div>

        <SubmitButton isSubmitting={isSubmitting} />

        <SignUpLink />
      </div>
    </form>
  );
}

export default LoginForm;
