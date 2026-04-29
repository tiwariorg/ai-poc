import React, { createContext, useContext } from 'react';

import useAuth from '../hooks/useAuth';
import type { User } from '../auth';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * The shape of the value exposed by `AuthContext`.
 *
 * Mirrors the return type of `useAuth` so that any consumer of this context
 * receives the same contract regardless of how it accesses authentication state.
 */
export interface AuthContextType {
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
// Context
// ---------------------------------------------------------------------------

/**
 * React context that carries authentication state throughout the component tree.
 *
 * Initialised to `null` so that `useAuthContext` can detect when it is used
 * outside of an `AuthProvider` and throw a descriptive error.
 */
const AuthContext = createContext<AuthContextType | null>(null);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

/** Props accepted by `AuthProvider`. */
export interface AuthProviderProps {
  /** The subtree that will have access to authentication state. */
  children: React.ReactNode;
}

/**
 * Wraps its children with `AuthContext.Provider`, using the `useAuth` hook
 * internally to manage authentication state.
 *
 * Place this high in the component tree (e.g. in `main.tsx` or `App.tsx`) so
 * that all routed pages can consume auth state without prop-drilling.
 *
 * @example
 * ```tsx
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 * ```
 */
export function AuthProvider({ children }: AuthProviderProps): React.JSX.Element {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Consumer hook
// ---------------------------------------------------------------------------

/**
 * Convenience hook that retrieves the current `AuthContextType` value.
 *
 * Must be called from a component that is rendered inside an `AuthProvider`.
 * Throws a descriptive error if used outside of one so that misconfigured
 * trees are caught early during development.
 *
 * @returns The current authentication context value.
 *
 * @throws {Error} When called outside of an `AuthProvider`.
 *
 * @example
 * ```tsx
 * const { isAuthenticated, user, login, logout } = useAuthContext();
 * ```
 */
export function useAuthContext(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error(
      'useAuthContext must be used within an AuthProvider. ' +
        'Ensure the component is rendered inside <AuthProvider>.',
    );
  }

  return context;
}

export default AuthContext;
