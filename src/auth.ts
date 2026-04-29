/**
 * Auth constants, types, and helpers.
 *
 * Demo credentials are sourced from environment variables so that no secrets
 * are ever embedded in client-side source code.  Set the following variables
 * in a `.env.local` file (never committed to source control):
 *
 *   VITE_DEMO_USERNAME=<your-username>
 *   VITE_DEMO_PASSWORD=<your-password>
 *
 * If the variables are absent the application falls back to empty strings,
 * which will prevent any login attempt from succeeding — a safe default.
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
// Environment-variable-backed credentials (demo only)
// ---------------------------------------------------------------------------

/**
 * Demo credentials used to validate the login form.
 *
 * Values are read from Vite environment variables at build time so that no
 * plaintext credentials exist in the compiled bundle or source repository.
 */
export const DEMO_CREDENTIALS: Credentials = {
  username: import.meta.env.VITE_DEMO_USERNAME as string ?? '',
  password: import.meta.env.VITE_DEMO_PASSWORD as string ?? '',
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
 * Validates a username/password pair against the demo credentials.
 *
 * @param username - The username entered by the user.
 * @param password - The password entered by the user.
 * @returns `true` when both fields match the configured credentials, otherwise `false`.
 */
export function validateCredentials(username: string, password: string): boolean {
  const { username: validUser, password: validPass } = DEMO_CREDENTIALS;

  // Guard: if env vars were not set, reject all login attempts rather than
  // allowing an empty-string match.
  if (validUser === '' || validPass === '') {
    return false;
  }

  return username === validUser && password === validPass;
}
