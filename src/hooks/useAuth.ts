import { useState } from 'react';

import {
  HARDCODED_USER,
  validateCredentials,
  type User,
} from '../auth';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Shape of the object returned by `useAuth`. */
export interface UseAuthReturn {
  /** Whether the current user has successfully authenticated. */
  isAuthenticated: boolean;
  /** The authenticated user's profile, or `null` when not logged in. */
  user: User | null;
  /**
   * Validates the supplied credentials and, on success, sets the
   * authenticated user state.
   *
   * @param username - The username entered by the user.
   * @param password - The password entered by the user.
   * @returns `true` when the credentials are valid, otherwise `false`.
   */
  login: (username: string, password: string) => boolean;
  /** Clears the authenticated user state, effectively logging the user out. */
  logout: () => void;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Custom hook that manages authentication state.
 *
 * Exposes `isAuthenticated`, `user`, `login`, and `logout` so that
 * consuming components can react to auth changes without coupling
 * themselves to the underlying state management details.
 *
 * @example
 * ```tsx
 * const { isAuthenticated, user, login, logout } = useAuth();
 *
 * const handleSubmit = () => {
 *   const success = login(username, password);
 *   if (!success) setError('Invalid credentials');
 * };
 * ```
 */
function useAuth(): UseAuthReturn {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  /**
   * Attempts to authenticate with the given credentials.
   * On success, updates `isAuthenticated` and `user`; on failure, leaves
   * state unchanged.
   */
  const login = (username: string, password: string): boolean => {
    const isValid = validateCredentials(username, password);

    if (isValid) {
      setIsAuthenticated(true);
      setUser(HARDCODED_USER);
      return true;
    }

    return false;
  };

  /** Resets authentication state, logging the current user out. */
  const logout = (): void => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return { isAuthenticated, user, login, logout };
}

export default useAuth;
