/**
 * Integration tests for the LoginForm component (src/components/LoginForm.tsx).
 *
 * These tests exercise the full rendered form — including all sub-components
 * wired together — to verify:
 *   1. All expected elements are rendered (email input, password input, submit
 *      button, remember-me checkbox, forgot-password link, and sign-up link).
 *   2. Email validation error appears on submit with an invalid email.
 *   3. Password validation error appears on submit with a short password.
 *   4. Both validation errors appear when both fields are invalid.
 *   5. No errors are shown and console.log is called when both fields are valid.
 *   6. The "Remember me" checkbox toggles correctly.
 *   7. Typing in the email field clears the email validation error.
 *   8. Typing in the password field clears the password validation error.
 *
 * Rendering strategy:
 * - For tests 1, 5, 6 we render <LoginPage /> (src/components/LoginPage.tsx)
 *   because the sign-up link lives there alongside the form.
 * - For all other tests we render <LoginForm /> directly to keep things fast
 *   and isolated.
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import LoginForm from './LoginForm';
import LoginPage from './LoginPage';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Renders <LoginForm /> and returns a pre-configured userEvent instance. */
function renderLoginForm() {
  const user = userEvent.setup();
  render(<LoginForm />);
  return { user };
}

/** Renders <LoginPage /> (contains LoginForm + SignUpLink) and returns user. */
function renderLoginPage() {
  const user = userEvent.setup();
  render(<LoginPage />);
  return { user };
}

// ---------------------------------------------------------------------------
// Test suite
// ---------------------------------------------------------------------------

describe('LoginForm — integration', () => {
  // ──────────────────────────────────────────────────────────────────────────
  // 1. Renders all required elements
  // ──────────────────────────────────────────────────────────────────────────
  describe('1. Renders all required form elements', () => {
    it('renders the email input', () => {
      renderLoginPage();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    });

    it('renders the password input', () => {
      renderLoginPage();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    it('renders the submit button', () => {
      renderLoginPage();
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });

    it('renders the remember me checkbox', () => {
      renderLoginPage();
      expect(screen.getByRole('checkbox', { name: /remember me/i })).toBeInTheDocument();
    });

    it('renders the forgot password link', () => {
      renderLoginPage();
      expect(screen.getByRole('link', { name: /forgot password/i })).toBeInTheDocument();
    });

    it('renders the sign up link', () => {
      renderLoginPage();
      expect(screen.getByRole('link', { name: /sign up/i })).toBeInTheDocument();
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 2. Email validation error on submit with invalid email
  // ──────────────────────────────────────────────────────────────────────────
  describe('2. Shows email validation error when submitting with an invalid email', () => {
    it('shows "Email is required." when email is empty and form is submitted', async () => {
      const { user } = renderLoginForm();

      await user.click(screen.getByRole('button', { name: /sign in/i }));

      await waitFor(() => {
        expect(screen.getByText('Email is required.')).toBeInTheDocument();
      });
    });

    it('shows "Please enter a valid email address." when email format is wrong', async () => {
      const { user } = renderLoginForm();

      await user.type(screen.getByLabelText(/email/i), 'not-an-email');
      await user.click(screen.getByRole('button', { name: /sign in/i }));

      await waitFor(() => {
        expect(
          screen.getByText('Please enter a valid email address.'),
        ).toBeInTheDocument();
      });
    });

    it('does not show a password error when only the email is invalid', async () => {
      const { user } = renderLoginForm();

      await user.type(screen.getByLabelText(/email/i), 'bad-email');
      await user.type(screen.getByLabelText(/password/i), 'securepassword');
      await user.click(screen.getByRole('button', { name: /sign in/i }));

      await waitFor(() => {
        expect(
          screen.getByText('Please enter a valid email address.'),
        ).toBeInTheDocument();
      });

      expect(
        screen.queryByText('Password is required.'),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/password must be at least/i),
      ).not.toBeInTheDocument();
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 3. Password validation error on submit with a short password
  // ──────────────────────────────────────────────────────────────────────────
  describe('3. Shows password validation error when submitting with password < 6 chars', () => {
    it('shows "Password is required." when password is empty', async () => {
      const { user } = renderLoginForm();

      await user.type(screen.getByLabelText(/email/i), 'user@example.com');
      await user.click(screen.getByRole('button', { name: /sign in/i }));

      await waitFor(() => {
        expect(screen.getByText('Password is required.')).toBeInTheDocument();
      });
    });

    it('shows "Password must be at least 6 characters." for a 5-char password', async () => {
      const { user } = renderLoginForm();

      await user.type(screen.getByLabelText(/email/i), 'user@example.com');
      await user.type(screen.getByLabelText(/password/i), 'abc12');
      await user.click(screen.getByRole('button', { name: /sign in/i }));

      await waitFor(() => {
        expect(
          screen.getByText('Password must be at least 6 characters.'),
        ).toBeInTheDocument();
      });
    });

    it('does not show an email error when only the password is invalid', async () => {
      const { user } = renderLoginForm();

      await user.type(screen.getByLabelText(/email/i), 'user@example.com');
      await user.type(screen.getByLabelText(/password/i), 'abc');
      await user.click(screen.getByRole('button', { name: /sign in/i }));

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

  // ──────────────────────────────────────────────────────────────────────────
  // 4. Both errors shown when both fields are invalid
  // ──────────────────────────────────────────────────────────────────────────
  describe('4. Shows both errors when both fields are invalid', () => {
    it('shows the email error and password error simultaneously', async () => {
      const { user } = renderLoginForm();

      // Submit without filling in anything → both fields invalid
      await user.click(screen.getByRole('button', { name: /sign in/i }));

      await waitFor(() => {
        expect(screen.getByText('Email is required.')).toBeInTheDocument();
        expect(screen.getByText('Password is required.')).toBeInTheDocument();
      });
    });

    it('shows format email error and length password error when both have bad values', async () => {
      const { user } = renderLoginForm();

      await user.type(screen.getByLabelText(/email/i), 'not-an-email');
      await user.type(screen.getByLabelText(/password/i), 'abc');
      await user.click(screen.getByRole('button', { name: /sign in/i }));

      await waitFor(() => {
        expect(
          screen.getByText('Please enter a valid email address.'),
        ).toBeInTheDocument();
        expect(
          screen.getByText('Password must be at least 6 characters.'),
        ).toBeInTheDocument();
      });
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 5. No errors on valid submission + console.log spy
  // ──────────────────────────────────────────────────────────────────────────
  describe('5. No errors shown when valid email and password >= 6 chars are submitted', () => {
    let consoleSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    it('shows no validation errors after a valid submission', async () => {
      const { user } = renderLoginForm();

      await user.type(screen.getByLabelText(/email/i), 'user@example.com');
      await user.type(screen.getByLabelText(/password/i), 'securePassword1');
      await user.click(screen.getByRole('button', { name: /sign in/i }));

      await waitFor(() => {
        expect(screen.queryByText('Email is required.')).not.toBeInTheDocument();
        expect(
          screen.queryByText('Please enter a valid email address.'),
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText('Password is required.'),
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText(/password must be at least/i),
        ).not.toBeInTheDocument();
      });
    });

    it('calls console.log with the email and rememberMe flag (not the password)', async () => {
      const { user } = renderLoginForm();

      await user.type(screen.getByLabelText(/email/i), 'user@example.com');
      await user.type(screen.getByLabelText(/password/i), 'securePassword1');
      await user.click(screen.getByRole('button', { name: /sign in/i }));

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Login submitted:', {
          email: 'user@example.com',
          rememberMe: false,
        });
      });
    });

    it('does not include the password in the console.log call', async () => {
      const { user } = renderLoginForm();

      await user.type(screen.getByLabelText(/email/i), 'user@example.com');
      await user.type(screen.getByLabelText(/password/i), 'securePassword1');
      await user.click(screen.getByRole('button', { name: /sign in/i }));

      await waitFor(() => {
        const callArgs = consoleSpy.mock.calls[0];
        // The logged object (second argument) must not contain `password`
        expect(callArgs[1]).not.toHaveProperty('password');
      });
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 6. Remember me checkbox toggles correctly
  // ──────────────────────────────────────────────────────────────────────────
  describe('6. Remember me checkbox toggles correctly', () => {
    it('is unchecked by default', () => {
      renderLoginForm();
      expect(screen.getByRole('checkbox', { name: /remember me/i })).not.toBeChecked();
    });

    it('becomes checked when clicked once', async () => {
      const { user } = renderLoginForm();
      const checkbox = screen.getByRole('checkbox', { name: /remember me/i });

      await user.click(checkbox);

      expect(checkbox).toBeChecked();
    });

    it('returns to unchecked when clicked a second time', async () => {
      const { user } = renderLoginForm();
      const checkbox = screen.getByRole('checkbox', { name: /remember me/i });

      await user.click(checkbox); // check
      await user.click(checkbox); // uncheck

      expect(checkbox).not.toBeChecked();
    });

    it('passes rememberMe: true to console.log when checked before submitting', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      try {
        const { user } = renderLoginForm();

        await user.click(screen.getByRole('checkbox', { name: /remember me/i }));
        await user.type(screen.getByLabelText(/email/i), 'user@example.com');
        await user.type(screen.getByLabelText(/password/i), 'securePass1');
        await user.click(screen.getByRole('button', { name: /sign in/i }));

        await waitFor(() => {
          expect(consoleSpy).toHaveBeenCalledWith('Login submitted:', {
            email: 'user@example.com',
            rememberMe: true,
          });
        });
      } finally {
        consoleSpy.mockRestore();
      }
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 7. Clears email error when user types in email field after error
  // ──────────────────────────────────────────────────────────────────────────
  describe('7. Clears email error when user types in the email field after an error', () => {
    it('removes the email error message as soon as the user starts typing', async () => {
      const { user } = renderLoginForm();

      // Trigger the email error first
      await user.click(screen.getByRole('button', { name: /sign in/i }));

      await waitFor(() => {
        expect(screen.getByText('Email is required.')).toBeInTheDocument();
      });

      // Start typing in the email field — error should disappear
      await user.type(screen.getByLabelText(/email/i), 'a');

      await waitFor(() => {
        expect(screen.queryByText('Email is required.')).not.toBeInTheDocument();
        expect(
          screen.queryByText('Please enter a valid email address.'),
        ).not.toBeInTheDocument();
      });
    });

    it('does not clear the password error when typing in the email field', async () => {
      const { user } = renderLoginForm();

      // Trigger both errors
      await user.click(screen.getByRole('button', { name: /sign in/i }));

      await waitFor(() => {
        expect(screen.getByText('Email is required.')).toBeInTheDocument();
        expect(screen.getByText('Password is required.')).toBeInTheDocument();
      });

      // Type only in the email field
      await user.type(screen.getByLabelText(/email/i), 'user@example.com');

      await waitFor(() => {
        // Email error cleared
        expect(screen.queryByText('Email is required.')).not.toBeInTheDocument();
        // Password error remains
        expect(screen.getByText('Password is required.')).toBeInTheDocument();
      });
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 8. Clears password error when user types in password field after error
  // ──────────────────────────────────────────────────────────────────────────
  describe('8. Clears password error when user types in the password field after an error', () => {
    it('removes the password error message as soon as the user starts typing', async () => {
      const { user } = renderLoginForm();

      // Trigger the password error — provide a valid email so only password errs
      await user.type(screen.getByLabelText(/email/i), 'user@example.com');
      await user.click(screen.getByRole('button', { name: /sign in/i }));

      await waitFor(() => {
        expect(screen.getByText('Password is required.')).toBeInTheDocument();
      });

      // Start typing in the password field — error should disappear
      await user.type(screen.getByLabelText(/password/i), 'a');

      await waitFor(() => {
        expect(screen.queryByText('Password is required.')).not.toBeInTheDocument();
        expect(
          screen.queryByText(/password must be at least/i),
        ).not.toBeInTheDocument();
      });
    });

    it('does not clear the email error when typing in the password field', async () => {
      const { user } = renderLoginForm();

      // Trigger both errors
      await user.click(screen.getByRole('button', { name: /sign in/i }));

      await waitFor(() => {
        expect(screen.getByText('Email is required.')).toBeInTheDocument();
        expect(screen.getByText('Password is required.')).toBeInTheDocument();
      });

      // Type only in the password field
      await user.type(screen.getByLabelText(/password/i), 'securePass');

      await waitFor(() => {
        // Password error cleared
        expect(screen.queryByText('Password is required.')).not.toBeInTheDocument();
        // Email error remains
        expect(screen.getByText('Email is required.')).toBeInTheDocument();
      });
    });
  });
});
