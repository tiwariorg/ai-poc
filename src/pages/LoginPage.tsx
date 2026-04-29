import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuthContext } from '../context/AuthContext';
import LoginForm from '../components/LoginForm/LoginForm';

/**
 * LoginPage – route-level component for the `/login` path.
 *
 * Behaviour:
 * - If the user is already authenticated (determined via `useAuthContext`),
 *   they are immediately redirected to `/dashboard` using React Router's
 *   `<Navigate>` so no login UI is ever rendered for an active session.
 * - Otherwise, renders `<LoginForm />` centred on the page.
 *   All form state and auth logic live inside `LoginForm`; this component
 *   owns none of its own state.
 */
function LoginPage(): React.JSX.Element {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <main
      className="login-page"
      style={containerStyle}
      aria-label="Login page"
    >
      <LoginForm />
    </main>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

/**
 * Centres the `<LoginForm>` card both horizontally and vertically in the
 * viewport.  The card itself (`LoginForm.module.css → .form`) provides its
 * own padding, border-radius, and shadow; this container only handles the
 * full-page centering layer.
 */
const containerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: '#f5f5f5',
};

export default LoginPage;
