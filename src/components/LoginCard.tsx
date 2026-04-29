import React from 'react';

interface LoginCardProps {
  children: React.ReactNode;
}

/**
 * Card container for the login screen.
 *
 * Renders a centred, styled card with a "Welcome Back" heading and a
 * "Sign in to your account" subtitle, followed by any children passed in
 * (typically a login form).
 *
 * This is a purely presentational component — it holds no internal state.
 */
function LoginCard({ children }: LoginCardProps): React.JSX.Element {
  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <header>
        <h1 className="text-2xl font-bold text-gray-900 text-center">
          Welcome Back
        </h1>
        <p className="text-gray-500 text-sm text-center mt-1 mb-6">
          Sign in to your account
        </p>
      </header>
      {children}
    </div>
  );
}

export type { LoginCardProps };
export default LoginCard;
