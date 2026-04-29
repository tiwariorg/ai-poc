/**
 * Tests for the LoginPage component (src/components/LoginPage.tsx).
 *
 * Covers the five requirements from KAN-12:
 *   1. LoginPage renders without crashing.
 *   2. Contains the LoginCard with the heading "Welcome Back".
 *   3. Contains the LoginForm — email and password inputs are present.
 *   4. Contains the Sign Up link with the text "Sign up".
 *   5. Contains the Forgot Password link with the text "Forgot Password?".
 *
 * A snapshot test is also included so that any unintentional structural
 * change to the page is caught immediately.
 *
 * Rendering strategy:
 * - Every test renders <LoginPage /> because it is the component under test
 *   and it composes LoginCard, LoginForm, SignUpLink, and ForgotPasswordLink.
 */

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import LoginPage from './LoginPage';

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

/** Renders <LoginPage /> and returns the RTL render result. */
function renderLoginPage() {
  return render(<LoginPage />);
}

// ---------------------------------------------------------------------------
// Test suite
// ---------------------------------------------------------------------------

describe('LoginPage — layout', () => {
  // ──────────────────────────────────────────────────────────────────────────
  // 1. Renders without crashing
  // ──────────────────────────────────────────────────────────────────────────
  describe('1. Renders without crashing', () => {
    it('mounts without throwing', () => {
      // If render throws the test will fail automatically; an explicit
      // assertion confirms the root element is actually in the document.
      const { container } = renderLoginPage();
      expect(container).toBeInTheDocument();
    });

    it('renders at least one element inside the container', () => {
      const { container } = renderLoginPage();
      expect(container.firstChild).not.toBeNull();
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 2. LoginCard — "Welcome Back" heading
  // ──────────────────────────────────────────────────────────────────────────
  describe('2. Contains the LoginCard with heading "Welcome Back"', () => {
    it('renders a heading with the text "Welcome Back"', () => {
      renderLoginPage();
      expect(
        screen.getByRole('heading', { name: /welcome back/i }),
      ).toBeInTheDocument();
    });

    it('renders the "Welcome Back" heading at level 1 (h1)', () => {
      renderLoginPage();
      expect(
        screen.getByRole('heading', { name: /welcome back/i, level: 1 }),
      ).toBeInTheDocument();
    });

    it('renders the LoginCard subtitle "Sign in to your account"', () => {
      renderLoginPage();
      expect(screen.getByText(/sign in to your account/i)).toBeInTheDocument();
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 3. LoginForm — email and password inputs
  // ──────────────────────────────────────────────────────────────────────────
  describe('3. Contains the LoginForm with email and password inputs', () => {
    it('renders an email input', () => {
      renderLoginPage();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    });

    it('renders the email input with type="email"', () => {
      renderLoginPage();
      expect(screen.getByLabelText(/email/i)).toHaveAttribute('type', 'email');
    });

    it('renders a password input', () => {
      renderLoginPage();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    it('renders the password input with type="password"', () => {
      renderLoginPage();
      expect(screen.getByLabelText(/password/i)).toHaveAttribute(
        'type',
        'password',
      );
    });

    it('renders a submit button labelled "Sign In"', () => {
      renderLoginPage();
      expect(
        screen.getByRole('button', { name: /sign in/i }),
      ).toBeInTheDocument();
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 4. Sign Up link
  // ──────────────────────────────────────────────────────────────────────────
  describe('4. Contains the Sign Up link with text "Sign up"', () => {
    it('renders a link with the text "Sign up"', () => {
      renderLoginPage();
      expect(
        screen.getByRole('link', { name: /sign up/i }),
      ).toBeInTheDocument();
    });

    it('renders the Sign Up link as an anchor element', () => {
      renderLoginPage();
      const link = screen.getByRole('link', { name: /sign up/i });
      expect(link.tagName).toBe('A');
    });

    it('renders the Sign Up link with exactly the text "Sign up"', () => {
      renderLoginPage();
      // getByText with an exact string ensures the casing matches the design spec.
      expect(screen.getByText('Sign up')).toBeInTheDocument();
    });

    it('renders the Sign Up link accompanied by the prompt text', () => {
      renderLoginPage();
      expect(
        screen.getByText(/don't have an account\?/i),
      ).toBeInTheDocument();
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 5. Forgot Password link
  // ──────────────────────────────────────────────────────────────────────────
  describe('5. Contains the Forgot Password link with text "Forgot Password?"', () => {
    it('renders a link with the text "Forgot Password?"', () => {
      renderLoginPage();
      expect(
        screen.getByRole('link', { name: /forgot password\?/i }),
      ).toBeInTheDocument();
    });

    it('renders the Forgot Password link as an anchor element', () => {
      renderLoginPage();
      const link = screen.getByRole('link', { name: /forgot password\?/i });
      expect(link.tagName).toBe('A');
    });

    it('renders the Forgot Password link with exactly the text "Forgot Password?"', () => {
      renderLoginPage();
      // getByText with an exact string validates the full punctuation from the spec.
      expect(screen.getByText('Forgot Password?')).toBeInTheDocument();
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // Snapshot — catch unintentional structural regressions
  // ──────────────────────────────────────────────────────────────────────────
  describe('Snapshot', () => {
    it('matches the stored snapshot', () => {
      const { container } = renderLoginPage();
      expect(container).toMatchSnapshot();
    });
  });
});
