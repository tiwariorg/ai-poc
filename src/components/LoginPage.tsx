import React from 'react';

import useLoginForm from '../hooks/useLoginForm';
import LoginCard from './LoginCard';
import LoginForm from './LoginForm';
import SignUpLink from './SignUpLink';

// ---------------------------------------------------------------------------
// LoginPage — KAN-12
// ---------------------------------------------------------------------------
// Top-level page component that composes the full login screen.
//
// - Calls `useLoginForm` to obtain all form state and event handlers.
// - Renders a full-viewport, vertically and horizontally centred layout.
// - Delegates visual structure to `LoginCard`.
// - Passes all hook-provided props down to `LoginForm` (controlled mode).
// - Renders `SignUpLink` below the form as a navigation prompt.
//
// No props are required — this component is the root entry point rendered
// directly by App.tsx.
// ---------------------------------------------------------------------------

/**
 * LoginPage component — full login screen layout.
 *
 * Renders a full-viewport wrapper that centres a `<LoginCard>` both
 * horizontally and vertically.  Inside the card, `<LoginForm>` receives all
 * state and handlers from the `useLoginForm` hook, and `<SignUpLink>`
 * provides a navigation prompt for users who do not yet have an account.
 *
 * This component owns no internal UI state beyond what is provided by the
 * `useLoginForm` hook — all state is lifted into the hook and passed down as
 * controlled props to `LoginForm`.
 */
function LoginPage(): React.JSX.Element {
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <LoginCard>
        <LoginForm
          formData={formData}
          errors={errors}
          isSubmitting={isSubmitting}
          onEmailChange={handleEmailChange}
          onPasswordChange={handlePasswordChange}
          onRememberMeChange={handleRememberMeChange}
          onSubmit={handleSubmit}
        />
        <div className="mt-6">
          <SignUpLink />
        </div>
      </LoginCard>
    </div>
  );
}

export default LoginPage;
