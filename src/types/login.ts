// ---------------------------------------------------------------------------
// Login feature — shared TypeScript type definitions
// ---------------------------------------------------------------------------
// Keeping all login-related interfaces in a single types module ensures that
// form components, validation helpers, and custom hooks all share one source
// of truth, making refactors safer and type errors easier to surface at
// compile time.
//
// IMPORTANT: This file contains ONLY type definitions.
//            No credentials, example passwords, default values, or any
//            secret-like strings are present here.
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
// ValidationErrors
// ---------------------------------------------------------------------------

/**
 * Represents per-field validation error messages for the login form.
 *
 * Each property is optional — when absent (or `undefined`) the corresponding
 * field has no active validation error. When present, the value is a
 * human-readable message string describing what the user must fix.
 *
 * This type is suited to scenarios where the absence of a key (rather than an
 * explicit `null` sentinel) signals a valid field — for example, when
 * spreading partial error updates or when serialising error state as JSON.
 *
 * @property email    - Validation error message for the email field, if any.
 * @property password - Validation error message for the password field, if any.
 */
export interface ValidationErrors {
  /** Validation error message for the email field, or `undefined` if valid. */
  email?: string;
  /** Validation error message for the password field, or `undefined` if valid. */
  password?: string;
}

// ---------------------------------------------------------------------------
// LoginFormErrors
// ---------------------------------------------------------------------------

/**
 * Represents the per-field validation error state of the login form using an
 * explicit `null` sentinel to distinguish "not yet validated / currently valid"
 * from "field has not been touched at all".
 *
 * Each property holds either a human-readable error message string when the
 * corresponding field fails validation, or `null` when the field is currently
 * valid (or has not yet been validated).
 *
 * @property email    - Validation error for the email field, or `null` if valid.
 * @property password - Validation error for the password field, or `null` if valid.
 */
export interface LoginFormErrors {
  /** Validation error for the email field, or `null` if valid. */
  email: string | null;
  /** Validation error for the password field, or `null` if valid. */
  password: string | null;
}
