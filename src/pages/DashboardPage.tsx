import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuthContext } from '../context/AuthContext';
import UserProfile from '../components/UserProfile/UserProfile';
import LogoutButton from '../components/LogoutButton/LogoutButton';
import styles from './DashboardPage.module.css';

/**
 * `DashboardPage` is the protected route rendered at `/dashboard`.
 *
 * It reads `isAuthenticated` from `AuthContext` and immediately redirects
 * unauthenticated visitors to `/login`. Authenticated users see their
 * profile information via `UserProfile` and a `LogoutButton` beneath it.
 *
 * @example
 * ```tsx
 * <Route path="/dashboard" element={<DashboardPage />} />
 * ```
 */
function DashboardPage(): React.JSX.Element {
  const { isAuthenticated } = useAuthContext();

  // Redirect unauthenticated users to the login page.
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main className={styles.wrapper}>
      <div className={styles.content}>
        <UserProfile />
        <LogoutButton />
      </div>
    </main>
  );
}

export default DashboardPage;
