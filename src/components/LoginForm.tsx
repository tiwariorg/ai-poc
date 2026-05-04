import React, { type ChangeEvent, type FormEvent } from 'react';

import useLoginForm from '../hooks/useLoginForm';
import type { LoginFormData, ValidationErrors } from '../types/login';
import EmailInput from './EmailInput';
import ForgotPasswordLink from './ForgotPasswordLink';
import PasswordInput from './PasswordInput';
import RememberMeCheckbox from './RememberMeCheckbox';
import SubmitButton from './SubmitButton';

// ---------------------------------------------------------------------------
// Props interface
// ---------------------------------------------------------------------------

/**
 * Props for the controlled variant of `LoginForm`.
 *
 * All props are optional. When omitted, the component manages its own state
 * internally via the `useLoginForm` hook (uncontrolled/self-contained mode).
 */
export interface LoginFormProps {
  /** Current form field values. */
  formData?: LoginFormData;
  /** Per-field validation error messages. */
  errors?: ValidationErrors;
  /** Whether a form submission is currently in progress. */
  isSubmitting?: boolean;
  /** Change handler for the email input. */
  onEmailChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  /** Change handler for the password input. */
  onPasswordChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  /** Change handler for the "remember me" checkbox. */
  onRememberMeChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  /** Submit handler for the form element. */
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * LoginForm component.
 *
 * Supports two usage modes:
 *
 * **Uncontrolled (standalone)** — render `<LoginForm />` without props.
 * All state and event-handling is managed internally by the `useLoginForm`
 * hook. This is the default mode used by `LoginPage`.
 *
 * **Controlled** — pass `formData`, `errors`, `isSubmitting`, and the four
 * `on*` callback props to fully control the form from the outside.
 *
 * Renders (in order):
 * - `EmailInput` — email field with value, onChange, and optional error
 * - `PasswordInput` — password field with value, onChange, and optional error
 * - A flex row with `RememberMeCheckbox` (left) and `ForgotPasswordLink` (right)
 * - `SubmitButton` — reflects the `isSubmitting` state
 *
 * Spacing between elements is provided by the `flex flex-col gap-4` wrapper.
 */
function LoginForm({
  formData: formDataProp,
  errors: errorsProp,
  isSubmitting: isSubmittingProp,
  onEmailChange,
  onPasswordChange,
  onRememberMeChange,
  onSubmit,
}: LoginFormProps = {}): React.JSX.Element {
  // ── Internal state (used in uncontrolled / standalone mode) ───────────────

  const {
    formData: internalFormData,
    errors: internalErrors,
    isSubmitting: internalIsSubmitting,
    handleEmailChange,
    handlePasswordChange,
    handleRememberMeChange,
    handleSubmit,
  } = useLoginForm();

  // ── Resolve controlled vs. uncontrolled values ────────────────────────────

  /**
   * Prefer externally-provided props; fall back to the internal hook values.
   * This allows the component to work both as a standalone form and as a
   * fully-controlled form driven by a parent.
   */
  const formData: LoginFormData = formDataProp ?? internalFormData;

  const errors: ValidationErrors = errorsProp ?? {
    email: internalErrors.email ?? undefined,
    password: internalErrors.password ?? undefined,
  };

  const isSubmitting: boolean = isSubmittingProp ?? internalIsSubmitting;

  const resolvedOnEmailChange = onEmailChange ?? handleEmailChange;
  const resolvedOnPasswordChange = onPasswordChange ?? handlePasswordChange;
  const resolvedOnRememberMeChange = onRememberMeChange ?? handleRememberMeChange;
  const resolvedOnSubmit = onSubmit ?? handleSubmit;

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <form onSubmit={resolvedOnSubmit} noValidate>
      <div className="flex flex-col gap-4">
        {/* Email field */}
        <EmailInput
          value={formData.email}
          onChange={resolvedOnEmailChange}
          error={errors.email}
        />

        {/* Password field */}
        <PasswordInput
          value={formData.password}
          onChange={resolvedOnPasswordChange}
          error={errors.password}
        />

        {/* Remember me + Forgot password row */}
        <div className="flex justify-between items-center">
          <RememberMeCheckbox
            checked={formData.rememberMe}
            onChange={resolvedOnRememberMeChange}
          />
          <ForgotPasswordLink />
        </div>

        {/* Submit button */}
        <SubmitButton isSubmitting={isSubmitting} />
      </div>
    </form>
  );
}

export default LoginForm;
