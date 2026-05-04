/**
 * Integration tests for the LoginPage component (src/components/LoginPage.tsx).
 *
 * Covers the requirements from KAN-12:
 *
 *  RENDERING
 *   1. Renders email input, password input, submit button ('Sign In'),
 *      'Remember Me' checkbox, 'Forgot Password?' link, and 'Sign Up' link.
 *
 *  VALIDATION
 *   2. Submitting with both fields empty shows both error messages.
 *   3. Submitting with an invalid email (and a valid password) shows the
 *      email error message only.
 *   4. Submitting with a password that is too short (and a valid email) shows
 *      the password error message only.
 *
 *  VALID SUBMISSION
 *   5. Filling valid values and submitting shows no error messages and calls
 *      console.log with the expected payload.
 *
 *  REMEMBER ME
 *   6. The 'Remember Me' checkbox toggles its checked state on each click.
 *
 * Strategy
 * --------
 * Every test renders <LoginPage /> — it is the component under test and it
 * composes LoginCard, LoginForm (which internally uses useLoginForm),
 * ForgotPasswordLink, and SignUpLink.
 *
 * @testing-library/user-event is used for all user interactions so that
 * event dispatch closely mirrors real browser behaviour.
 *
 * Generic, non-credential test values are used throughout:
 *   valid email    → 'test.user@example.com'
 *   valid password → 'validPass1'     (≥ 6 chars, no sensitive meaning)
 *   short password → 'abc'            (< 6 chars)
 *   invalid email  → 'not-an-email'
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import LoginPage from './LoginPage';

// ---------------------------------------------------------------------------
// Constants — generic test values (not real credentials)
// ---------------------------------------------------------------------------

const VALID_EMAIL = 'test.user@example.com';
const VALID_PASSWORD = 'validPass1';
const INVALID_EMAIL = 'not-an-email';
const SHORT_PASSWORD = 'abc';

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

/**
 * Renders <LoginPage /> and returns a pre-configured userEvent instance.
 * The userEvent instance uses the recommended `setup()` factory so that
 * pointer/keyboard events are dispatched in the correct sequence.
 */
function renderLoginPage() {
  const user = userEvent.setup();
  render(<LoginPage />);
  return { user };
}

// ---------------------------------------------------------------------------
// Convenience query helpers
// ---------------------------------------------------------------------------

const getEmailInput = () => screen.getByLabelText(/email/i);
const getPasswordInput = () => screen.getByLabelText(/password/i);
const getSubmitButton = () => screen.getByRole('button', { name: /sign in/i });
const getRememberMeCheckbox = () =>
  screen.getByRole('checkbox', { name: /remember me/i });

// ---------------------------------------------------------------------------
// Test suite
// ---------------------------------------------------------------------------

describe('LoginPage — integration', () => {
  // ════════════════════════════════════════════════════════════════════════
  // 1. Rendering
  // ════════════════════════════════════════════════════════════════════════

  describe('1. Renders all required UI elements', () => {
    it('renders an email input', () => {
      renderLoginPage();
      expect(getEmailInput()).toBeInTheDocument();
    });

    it('renders the email input with type="email"', () => {
      renderLoginPage();
      expect(getEmailInput()).toHaveAttribute('type', 'email');
    });

    it('renders a password input', () => {
      renderLoginPage();
      expect(getPasswordInput()).toBeInTheDocument();
    });

    it('renders the password input with type="password"', () => {
      renderLoginPage();
      expect(getPasswordInput()).toHaveAttribute('type', 'password');
    });

    it('renders a submit button with the text "Sign In"', () => {
      renderLoginPage();
      expect(getSubmitButton()).toBeInTheDocument();
    });

    it('renders a "Remember Me" checkbox', () => {
      renderLoginPage();
      expect(getRememberMeCheckbox()).toBeInTheDocument();
    });

    it('renders a "Forgot Password?" link', () => {
      renderLoginPage();
      expect(
        screen.getByRole('link', { name: /forgot password\?/i }),
      ).toBeInTheDocument();
    });

    it('renders a "Sign Up" link', () => {
      renderLoginPage();
      expect(
        screen.getByRole('link', { name: /sign up/i }),
      ).toBeInTheDocument();
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // 2. Validation — both fields empty
  // ════════════════════════════════════════════════════════════════════════

  describe('2. Shows both error messages when submitting with empty fields', () => {
    it('shows the email required error when the email field is empty', async () => {
      const { user } = renderLoginPage();

      await user.click(getSubmitButton());

      await waitFor(() => {
        expect(screen.getByText('Email is required.')).toBeInTheDocument();
      });
    });

    it('shows the password required error when the password field is empty', async () => {
      const { user } = renderLoginPage();

      await user.click(getSubmitButton());

      await waitFor(() => {
        expect(screen.getByText('Password is required.')).toBeInTheDocument();
      });
    });

    it('shows both errors simultaneously when both fields are empty', async () => {
      const { user } = renderLoginPage();

      await user.click(getSubmitButton());

      await waitFor(() => {
        expect(screen.getByText('Email is required.')).toBeInTheDocument();
        expect(screen.getByText('Password is required.')).toBeInTheDocument();
      });
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // 3. Validation — invalid email
  // ════════════════════════════════════════════════════════════════════════

  describe('3. Shows the email error when submitting with an invalid email', () => {
    it('shows "Please enter a valid email address." for a malformed email', async () => {
      const { user } = renderLoginPage();

      await user.type(getEmailInput(), INVALID_EMAIL);
      await user.type(getPasswordInput(), VALID_PASSWORD);
      await user.click(getSubmitButton());

      await waitFor(() => {
        expect(
          screen.getByText('Please enter a valid email address.'),
        ).toBeInTheDocument();
      });
    });

    it('does not show the password error when only the email is invalid', async () => {
      const { user } = renderLoginPage();

      await user.type(getEmailInput(), INVALID_EMAIL);
      await user.type(getPasswordInput(), VALID_PASSWORD);
      await user.click(getSubmitButton());

      await waitFor(() => {
        expect(
          screen.getByText('Please enter a valid email address.'),
        ).toBeInTheDocument();
      });

      expect(screen.queryByText('Password is required.')).not.toBeInTheDocument();
      expect(
        screen.queryByText(/password must be at least/i),
      ).not.toBeInTheDocument();
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // 4. Validation — password too short
  // ════════════════════════════════════════════════════════════════════════

  describe('4. Shows the password error when submitting with a short password', () => {
    it('shows "Password must be at least 6 characters." for a short password', async () => {
      const { user } = renderLoginPage();

      await user.type(getEmailInput(), VALID_EMAIL);
      await user.type(getPasswordInput(), SHORT_PASSWORD);
      await user.click(getSubmitButton());

      await waitFor(() => {
        expect(
          screen.getByText('Password must be at least 6 characters.'),
        ).toBeInTheDocument();
      });
    });

    it('does not show the email error when only the password is too short', async () => {
      const { user } = renderLoginPage();

      await user.type(getEmailInput(), VALID_EMAIL);
      await user.type(getPasswordInput(), SHORT_PASSWORD);
      await user.click(getSubmitButton());

      await waitFor(() => {
        expect(
          screen.getByText('Password must be at least 6 characters.'),
        ).toBeInTheDocument();
      });

      expect(screen.queryByText('Email is required.')).not.toBeInTheDocument();
      expect(
        screen.queryByText('Please enter a valid email address.'),
      ).not.toBeInTheDocument();
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // 5. Valid submission
  // ════════════════════════════════════════════════════════════════════════

  describe('5. Valid submission: no errors shown and console.log is called', () => {
    let consoleSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    it('shows no email error after a valid submission', async () => {
      const { user } = renderLoginPage();

      await user.type(getEmailInput(), VALID_EMAIL);
      await user.type(getPasswordInput(), VALID_PASSWORD);
      await user.click(getSubmitButton());

      await waitFor(() => {
        expect(screen.queryByText('Email is required.')).not.toBeInTheDocument();
        expect(
          screen.queryByText('Please enter a valid email address.'),
        ).not.toBeInTheDocument();
      });
    });

    it('shows no password error after a valid submission', async () => {
      const { user } = renderLoginPage();

      await user.type(getEmailInput(), VALID_EMAIL);
      await user.type(getPasswordInput(), VALID_PASSWORD);
      await user.click(getSubmitButton());

      await waitFor(() => {
        expect(screen.queryByText('Password is required.')).not.toBeInTheDocument();
        expect(
          screen.queryByText(/password must be at least/i),
        ).not.toBeInTheDocument();
      });
    });

    it('calls console.log once when a valid form is submitted', async () => {
      const { user } = renderLoginPage();

      await user.type(getEmailInput(), VALID_EMAIL);
      await user.type(getPasswordInput(), VALID_PASSWORD);
      await user.click(getSubmitButton());

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledTimes(1);
      });
    });

    it('calls console.log with "Login submitted:" and the email and rememberMe flag', async () => {
      const { user } = renderLoginPage();

      await user.type(getEmailInput(), VALID_EMAIL);
      await user.type(getPasswordInput(), VALID_PASSWORD);
      await user.click(getSubmitButton());

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Login submitted:', {
          email: VALID_EMAIL,
          rememberMe: false,
        });
      });
    });

    it('does not include the password in the console.log payload', async () => {
      const { user } = renderLoginPage();

      await user.type(getEmailInput(), VALID_EMAIL);
      await user.type(getPasswordInput(), VALID_PASSWORD);
      await user.click(getSubmitButton());

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalled();
      });

      // The second argument to console.log must not contain a `password` key
      const loggedPayload = consoleSpy.mock.calls[0][1] as Record<string, unknown>;
      expect(loggedPayload).not.toHaveProperty('password');
    });
  });

  // ════════════════════════════════════════════════════════════════════════
  // 6. Remember Me checkbox toggles
  // ════════════════════════════════════════════════════════════════════════

  describe('6. Remember Me checkbox toggles on click', () => {
    it('is unchecked by default', () => {
      renderLoginPage();
      expect(getRememberMeCheckbox()).not.toBeChecked();
    });

    it('becomes checked after a single click', async () => {
      const { user } = renderLoginPage();

      await user.click(getRememberMeCheckbox());

      expect(getRememberMeCheckbox()).toBeChecked();
    });

    it('returns to unchecked after being clicked a second time', async () => {
      const { user } = renderLoginPage();

      const checkbox = getRememberMeCheckbox();
      await user.click(checkbox); // check
      await user.click(checkbox); // uncheck

      expect(checkbox).not.toBeChecked();
    });

    it('passes rememberMe: true in the console.log payload when checked before submitting', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      try {
        const { user } = renderLoginPage();

        // Check the box first, then fill in valid credentials
        await user.click(getRememberMeCheckbox());
        await user.type(getEmailInput(), VALID_EMAIL);
        await user.type(getPasswordInput(), VALID_PASSWORD);
        await user.click(getSubmitButton());

        await waitFor(() => {
          expect(consoleSpy).toHaveBeenCalledWith('Login submitted:', {
            email: VALID_EMAIL,
            rememberMe: true,
          });
        });
      } finally {
        consoleSpy.mockRestore();
      }
    });
  });
});
