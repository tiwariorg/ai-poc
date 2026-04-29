/**
 * Auth constants, types, and helpers for KAN-13.
 *
 * NOTE: These credentials are intentionally hardcoded for demo/prototype purposes only.
 * In a production application, authentication must be handled by a secure backend service
 * and credentials must never be embedded in client-side code.
 */

// ---------------------------------------------------------------------------
// Interfaces
// ---------------------------------------------------------------------------

/** Represents an authenticated user's profile information. */
export interface User {
  name: string;
  email: string;
  role: string;
}

/** Represents the shape of login credentials submitted by the user. */
export interface Credentials {
  username: string;
  password: string;
}

// ---------------------------------------------------------------------------
// Hardcoded constants (demo only)
// ---------------------------------------------------------------------------

/** Demo credentials used to validate the login form. */
export const HARDCODED_CREDENTIALS: Credentials = {
  username: 'admin',
  password: 'admin123',
};

/** Demo user profile returned after a successful login. */
export const HARDCODED_USER: User = {
  name: 'Admin User',
  email: 'admin@example.com',
  role: 'Administrator',
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Validates a username/password pair against the hardcoded demo credentials.
 *
 * @param username - The username entered by the user.
 * @param password - The password entered by the user.
 * @returns `true` when both fields match the hardcoded credentials, otherwise `false`.
 */
export function validateCredentials(username: string, password: string): boolean {
  return (
    username === HARDCODED_CREDENTIALS.username &&
    password === HARDCODED_CREDENTIALS.password
  );
}
