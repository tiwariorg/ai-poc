// ---------------------------------------------------------------------------
// useLoginForm — custom hook
// ---------------------------------------------------------------------------
// Manages all form state and event-handling logic for the login form.
//
// Separating this logic from the UI component keeps the form component lean
// and makes the state/validation behaviour independently testable.
// ---------------------------------------------------------------------------

import { useState, type ChangeEvent, type FormEvent } from 'react';

import type { LoginFormData, LoginFormErrors } from '../types/login';
import { validateEmail, validatePassword } from '../utils/validation';

// ---------------------------------------------------------------------------
// Return type
// ---------------------------------------------------------------------------

/**
 * Shape of the object returned by `useLoginForm`.
 */
export interface UseLoginFormReturn {
  /** Current values for all form fields. */
  formData: LoginFormData;
  /** Per-field validation errors; `null` means the field is currently valid. */
  errors: LoginFormErrors;
  /**
   * `true` while the form submission is being processed.
   * Useful for disabling the submit button and showing a loading indicator.
   */
  isSubmitting: boolean;
  /** Change handler for the email input. */
  handleEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  /** Change handler for the password input. */
  handlePasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  /** Change handler for the "remember me" checkbox. */
  handleRememberMeChange: (e: ChangeEvent<HTMLInputElement>) => void;
  /** Submit handler for the form element. */
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Custom hook that manages all state and logic for the login form.
 *
 * @returns An object containing `formData`, `errors`, `isSubmitting`, and
 *          the four event handlers needed to wire up a login form.
 *
 * @example
 * ```tsx
 * const {
 *   formData,
 *   errors,
 *   isSubmitting,
 *   handleEmailChange,
 *   handlePasswordChange,
 *   handleRememberMeChange,
 *   handleSubmit,
 * } = useLoginForm();
 * ```
 */
function useLoginForm(): UseLoginFormReturn {
  // ── Form field values ────────────────────────────────────────────────────

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });

  // ── Per-field validation errors ──────────────────────────────────────────

  const [errors, setErrors] = useState<LoginFormErrors>({
    email: null,
    password: null,
  });

  // ── Submission state ─────────────────────────────────────────────────────

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // ── Event handlers ───────────────────────────────────────────────────────

  /**
   * Updates `formData.email` and clears any existing email validation error.
   */
  function handleEmailChange(e: ChangeEvent<HTMLInputElement>): void {
    const email = e.target.value;

    setFormData((prev) => ({ ...prev, email }));
    setErrors((prev) => ({ ...prev, email: null }));
  }

  /**
   * Updates `formData.password` and clears any existing password validation
   * error.
   */
  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>): void {
    const password = e.target.value;

    setFormData((prev) => ({ ...prev, password }));
    setErrors((prev) => ({ ...prev, password: null }));
  }

  /**
   * Toggles `formData.rememberMe` based on the checkbox's checked state.
   */
  function handleRememberMeChange(e: ChangeEvent<HTMLInputElement>): void {
    const rememberMe = e.target.checked;

    setFormData((prev) => ({ ...prev, rememberMe }));
  }

  /**
   * Handles form submission.
   *
   * Steps performed:
   * 1. Prevents the browser's default form-submission behaviour.
   * 2. Runs `validateEmail` and `validatePassword` on the current values.
   * 3. If either produces an error, persists the errors and returns early.
   * 4. If both pass, briefly sets `isSubmitting` to `true`, logs the
   *    non-sensitive fields to the console, then resets `isSubmitting`.
   *
   * **Security note:** The password is intentionally omitted from the log.
   */
  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    // Always write the latest validation results to state so the UI reflects
    // whichever fields are still invalid.
    setErrors({ email: emailError, password: passwordError });

    // Abort early if there are any validation errors.
    if (emailError !== null || passwordError !== null) {
      return;
    }

    // All fields are valid — proceed with submission.
    setIsSubmitting(true);

    // Log non-sensitive submission data (password is intentionally excluded).
    console.log('Login submitted:', {
      email: formData.email,
      rememberMe: formData.rememberMe,
    });

    setIsSubmitting(false);
  }

  // ── Return ───────────────────────────────────────────────────────────────

  return {
    formData,
    errors,
    isSubmitting,
    handleEmailChange,
    handlePasswordChange,
    handleRememberMeChange,
    handleSubmit,
  };
}

export default useLoginForm;
