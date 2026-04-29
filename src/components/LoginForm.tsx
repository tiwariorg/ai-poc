import React, { useState } from 'react';

import { validateEmail, validatePassword } from '../utils/validation';
import EmailInput from './EmailInput';
import ForgotPasswordLink from './ForgotPasswordLink';
import PasswordInput from './PasswordInput';
import RememberMeCheckbox from './RememberMeCheckbox';
import SignUpLink from './SignUpLink';
import SubmitButton from './SubmitButton';

function LoginForm(): React.JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  function handleEmailChange(value: string): void {
    setEmail(value);
    setEmailError(null);
  }

  function handlePasswordChange(value: string): void {
    setPassword(value);
    setPasswordError(null);
  }

  function handleRememberMeChange(checked: boolean): void {
    setRememberMe(checked);
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

    console.log('Login submitted', { email, rememberMe });
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

        <SubmitButton />

        <SignUpLink />
      </div>
    </form>
  );
}

export default LoginForm;
