// ---------------------------------------------------------------------------
// Login form types
// ---------------------------------------------------------------------------
// Shared TypeScript interfaces for the login form feature.
//
// Keeping these in a dedicated types module ensures that form components,
// validation helpers, and any future hooks all reference a single source of
// truth, making refactors safer and type errors easier to surface at compile
// time.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// LoginFormData
// ---------------------------------------------------------------------------

/**
 * Represents the complete set of field values captured by the login form.
 *
 * @property email      - The email address entered by the user.
 * @property password   - The password entered by the user (plain text, never persisted).
 * @property rememberMe - Whether the user opted in to a persistent session.
 *
 * @example
 * ```ts
 * const formData: LoginFormData = {
 *   email: 'user@example.com',
 *   password: process.env.EXAMPLE_USER_PASSWORD,
 *   rememberMe: true,
 * };
 * ```
 */
export interface LoginFormData {
  /** The email address entered by the user. */
  email: string;
  /** The password entered by the user (plain text, never persisted). */
  password: string;
  /** Whether the user opted in to a persistent session. */
  rememberMe: boolean;
}

// ---------------------------------------------------------------------------
// LoginFormErrors
// ---------------------------------------------------------------------------

/**
 * Represents the per-field validation error state of the login form.
 *
 * Each property holds either a human-readable error message string when the
 * corresponding field fails validation, or `null` when the field is currently
 * valid (or has not yet been validated).
 *
 * @property email    - Validation error for the email field, or `null` if valid.
 * @property password - Validation error for the password field, or `null` if valid.
 *
 * @example
 * ```ts
 * const noErrors: LoginFormErrors = { email: null, password: null };
 *
 * const withErrors: LoginFormErrors = {
 *   email: 'Please enter a valid email address.',
 *   password: 'Password must be at least 6 characters.',
 * };
 * ```
 */
export interface LoginFormErrors {
  /** Validation error for the email field, or `null` if valid. */
  email: string | null;
  /** Validation error for the password field, or `null` if valid. */
  password: string | null;
}
