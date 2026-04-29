import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../context/AuthContext';
import styles from './LogoutButton.module.css';

/**
 * `LogoutButton` renders an outlined red button that, when clicked, logs the
 * current user out via the auth context and redirects them to the login page.
 *
 * It intentionally accepts no props — all required dependencies are sourced
 * from `useAuthContext` (for the `logout` action) and `useNavigate` (for
 * post-logout redirection).
 *
 * @example
 * ```tsx
 * <LogoutButton />
 * ```
 */
function LogoutButton(): React.JSX.Element {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  /**
   * Clears the authenticated session and redirects the user to `/login`.
   */
  function handleLogout(): void {
    logout();
    navigate('/login');
  }

  return (
    <button
      type="button"
      className={styles.logoutButton}
      onClick={handleLogout}
      aria-label="Log out of your account"
    >
      Logout
    </button>
  );
}

export default LogoutButton;
