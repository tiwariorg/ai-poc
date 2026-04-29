// ---------------------------------------------------------------------------
// Validation utility functions
// ---------------------------------------------------------------------------
// Pure, side-effect-free helpers that validate individual form field values.
// Each function returns an error message string when validation fails, or
// `null` when the value is valid — making them trivial to integrate with any
// form state management approach.
// ---------------------------------------------------------------------------

/**
 * Regex pattern that covers the most common valid email formats:
 *   - one or more non-whitespace, non-@ characters before the @
 *   - one or more non-whitespace, non-@ characters for the domain name
 *   - a literal dot followed by one or more non-whitespace, non-@ characters
 *     for the top-level domain
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Minimum number of characters required for a valid password. */
const PASSWORD_MIN_LENGTH = 6;

// ---------------------------------------------------------------------------
// validateEmail
// ---------------------------------------------------------------------------

/**
 * Validates an email address string.
 *
 * Checks performed (in order):
 * 1. The value must not be empty or consist solely of whitespace.
 * 2. The value must match a standard email format regex.
 *
 * @param email - The raw string entered by the user in the email field.
 * @returns An error message string when validation fails, or `null` when the
 *          email is valid.
 *
 * @example
 * ```ts
 * validateEmail('');              // → 'Email is required.'
 * validateEmail('not-an-email'); // → 'Please enter a valid email address.'
 * validateEmail('a@b.com');      // → null
 * ```
 */
export function validateEmail(email: string): string | null {
  if (email.trim().length === 0) {
    return 'Email is required.';
  }

  if (!EMAIL_REGEX.test(email)) {
    return 'Please enter a valid email address.';
  }

  return null;
}

// ---------------------------------------------------------------------------
// validatePassword
// ---------------------------------------------------------------------------

/**
 * Validates a password string.
 *
 * Checks performed (in order):
 * 1. The value must not be empty or consist solely of whitespace.
 * 2. The value must be at least {@link PASSWORD_MIN_LENGTH} characters long.
 *
 * @param password - The raw string entered by the user in the password field.
 * @returns An error message string when validation fails, or `null` when the
 *          password meets all requirements.
 *
 * @example
 * ```ts
 * validatePassword('');      // → 'Password is required.'
 * validatePassword('abc');   // → 'Password must be at least 6 characters.'
 * validatePassword('secure'); // → null
 * ```
 */
export function validatePassword(password: string): string | null {
  if (password.trim().length === 0) {
    return 'Password is required.';
  }

  if (password.length < PASSWORD_MIN_LENGTH) {
    return `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`;
  }

  return null;
}
