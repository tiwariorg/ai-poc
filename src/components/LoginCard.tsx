import React from 'react';

// ---------------------------------------------------------------------------
// LoginCard — KAN-12
// ---------------------------------------------------------------------------
// Purely presentational wrapper component that provides the centred card
// layout for the login screen.  It renders a styled container card with a
// fixed heading and subtitle, then renders its `children` below them.
//
// Props:
//   children  – Any renderable React content (typically a LoginForm).
// ---------------------------------------------------------------------------

interface LoginCardProps {
  children: React.ReactNode;
}

/**
 * Card container for the login screen.
 *
 * Renders a centred, styled card with:
 *  - A "Welcome Back" `<h1>` heading
 *  - A "Please sign in to your account" subtitle
 *  - Any `children` below the subtitle (typically a login form)
 *
 * This is a purely presentational component — it holds no internal state.
 */
function LoginCard({ children }: LoginCardProps): React.JSX.Element {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Welcome Back
      </h1>
      <p className="text-sm text-gray-500 text-center mb-6">
        Please sign in to your account
      </p>
      {children}
    </div>
  );
}

export type { LoginCardProps };
export default LoginCard;
