import React from 'react';

import LoginCard from './LoginCard';
import LoginForm from './LoginForm';
import SignUpLink from './SignUpLink';

/**
 * LoginPage component — full login screen layout.
 *
 * Renders a full-viewport wrapper that centres a `<LoginCard>` both
 * horizontally and vertically.  Inside the card, `<LoginForm>` handles all
 * form state via the `useLoginForm` hook, and `<SignUpLink>` provides a
 * navigation prompt for users who do not yet have an account.
 *
 * This component owns no internal state — all state is delegated to
 * `LoginForm` through the `useLoginForm` hook.
 */
function LoginPage(): React.JSX.Element {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <LoginCard>
        <LoginForm />
        <div className="mt-6">
          <SignUpLink />
        </div>
      </LoginCard>
    </div>
  );
}

export default LoginPage;
