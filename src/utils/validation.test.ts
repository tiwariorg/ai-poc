import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import {
  validateEmail,
  validatePassword,
  validateLoginForm,
} from './validation';

// ---------------------------------------------------------------------------
// validateEmail
// ---------------------------------------------------------------------------
describe('validateEmail', () => {
  // ── required / empty ──────────────────────────────────────────────────────
  describe('when the value is empty or blank', () => {
    it('returns the required error message for an empty string', () => {
      expect(validateEmail('')).toBe('Email is required.');
    });

    it('returns the required error message for a whitespace-only string', () => {
      expect(validateEmail('   ')).toBe('Email is required.');
    });

    it('returns the required error message for a tab-only string', () => {
      expect(validateEmail('\t')).toBe('Email is required.');
    });

    it('returns the required error message for a newline-only string', () => {
      expect(validateEmail('\n')).toBe('Email is required.');
    });
  });

  // ── invalid format ────────────────────────────────────────────────────────
  describe('when the value is a non-empty but invalid email format', () => {
    it('returns a format error for plain text with no @ sign ("notanemail")', () => {
      expect(validateEmail('notanemail')).toBe(
        'Please enter a valid email address.',
      );
    });

    it('returns a format error when the domain part is missing ("missing@domain")', () => {
      // "missing@domain" has no TLD dot, so it is invalid
      expect(validateEmail('missing@domain')).toBe(
        'Please enter a valid email address.',
      );
    });

    it('returns a format error when there is no local part before @ ("@nodomain.com")', () => {
      expect(validateEmail('@nodomain.com')).toBe(
        'Please enter a valid email address.',
      );
    });

    it('returns a format error when the @ sign is missing entirely', () => {
      expect(validateEmail('noatsign.com')).toBe(
        'Please enter a valid email address.',
      );
    });

    it('returns a format error when the domain has no TLD dot ("user@domain")', () => {
      expect(validateEmail('user@domain')).toBe(
        'Please enter a valid email address.',
      );
    });

    it('returns a format error when the local part contains a space', () => {
      expect(validateEmail('user name@domain.com')).toBe(
        'Please enter a valid email address.',
      );
    });

    it('returns a format error for a double-@ address ("user@@domain.com")', () => {
      expect(validateEmail('user@@domain.com')).toBe(
        'Please enter a valid email address.',
      );
    });

    it('returns a format error for a string that is only the @ symbol', () => {
      expect(validateEmail('@')).toBe('Please enter a valid email address.');
    });

    it('returns a format error for an address without a TLD ("user@domain.")', () => {
      expect(validateEmail('user@domain.')).toBe(
        'Please enter a valid email address.',
      );
    });
  });

  // ── valid emails ──────────────────────────────────────────────────────────
  describe('when the value is a valid email address', () => {
    it('returns null for a standard email ("user@example.com")', () => {
      expect(validateEmail('user@example.com')).toBeNull();
    });

    it('returns null for an email with a multi-segment TLD ("test.user@domain.co")', () => {
      expect(validateEmail('test.user@domain.co')).toBeNull();
    });

    it('returns null for an email with a subdomain', () => {
      expect(validateEmail('user@mail.example.co.uk')).toBeNull();
    });

    it('returns null for an email with plus addressing', () => {
      expect(validateEmail('user+tag@example.com')).toBeNull();
    });

    it('returns null for an email with a numeric local part', () => {
      expect(validateEmail('123@domain.org')).toBeNull();
    });

    it('returns null for a minimal valid email ("a@b.c")', () => {
      expect(validateEmail('a@b.c')).toBeNull();
    });

    it('returns null for an email with dots in the local part', () => {
      expect(validateEmail('first.last@example.com')).toBeNull();
    });
  });

  // ── return type ───────────────────────────────────────────────────────────
  describe('return type contract', () => {
    it('returns a string (not null) when validation fails', () => {
      const result = validateEmail('bad-email');
      expect(typeof result).toBe('string');
    });

    it('returns null (not a string) when validation passes', () => {
      const result = validateEmail('user@example.com');
      expect(result).toBeNull();
    });
  });
});

// ---------------------------------------------------------------------------
// validatePassword
// ---------------------------------------------------------------------------
describe('validatePassword', () => {
  // ── required / empty ──────────────────────────────────────────────────────
  describe('when the value is empty or blank', () => {
    it('returns the required error message for an empty string', () => {
      expect(validatePassword('')).toBe('Password is required.');
    });

    it('returns the required error message for a whitespace-only string', () => {
      expect(validatePassword('     ')).toBe('Password is required.');
    });

    it('returns the required error message for a newline-only string', () => {
      expect(validatePassword('\n')).toBe('Password is required.');
    });

    it('returns the required error message for a tab-only string', () => {
      expect(validatePassword('\t')).toBe('Password is required.');
    });
  });

  // ── too short ─────────────────────────────────────────────────────────────
  describe('when the password is shorter than 6 characters', () => {
    it('returns the length error for a 1-character password ("a")', () => {
      expect(validatePassword('a')).toBe(
        'Password must be at least 6 characters.',
      );
    });

    it('returns the length error for a 2-character password ("ab")', () => {
      expect(validatePassword('ab')).toBe(
        'Password must be at least 6 characters.',
      );
    });

    it('returns the length error for a 3-character password ("abc")', () => {
      expect(validatePassword('abc')).toBe(
        'Password must be at least 6 characters.',
      );
    });

    it('returns the length error for a 4-character password ("abcd")', () => {
      expect(validatePassword('abcd')).toBe(
        'Password must be at least 6 characters.',
      );
    });

    it('returns the length error for a 5-character password (boundary − 1)', () => {
      expect(validatePassword('12345')).toBe(
        'Password must be at least 6 characters.',
      );
    });
  });

  // ── exactly at the minimum boundary ──────────────────────────────────────
  describe('when the password is exactly 6 characters (boundary)', () => {
    it('returns null for a 6-character alphabetic password ("abcdef")', () => {
      expect(validatePassword('abcdef')).toBeNull();
    });

    it('returns null for a 6-character numeric password', () => {
      expect(validatePassword('123456')).toBeNull();
    });

    it('returns null for a 6-character mixed-character password', () => {
      expect(validatePassword('aB3!#z')).toBeNull();
    });
  });

  // ── valid passwords (6+ characters) ──────────────────────────────────────
  describe('when the password is 6 or more characters', () => {
    it('returns null for a 7-character password', () => {
      expect(validatePassword('abcdefg')).toBeNull();
    });

    it('returns null for a long alphanumeric password ("longerpassword")', () => {
      expect(validatePassword('longerpassword')).toBeNull();
    });

    it('returns null for a password with special characters', () => {
      expect(validatePassword('p@$$w0rd!')).toBeNull();
    });

    it('returns null for a password that is exactly 20 characters', () => {
      expect(validatePassword('12345678901234567890')).toBeNull();
    });
  });

  // ── whitespace edge cases ─────────────────────────────────────────────────
  describe('whitespace trimming behaviour', () => {
    it('treats a password of only spaces as a required error (not a length error)', () => {
      // 10 spaces → trim() gives "" → required check fires first
      expect(validatePassword('          ')).toBe('Password is required.');
    });

    it('uses the full (untrimmed) length for the minimum-length check', () => {
      // "ab cd " → trim() = "ab cd" (truthy, so not empty) → length = 6 → valid
      expect(validatePassword('ab cd ')).toBeNull();
    });

    it('returns the length error when the untrimmed length is under 6 and it is not all-whitespace', () => {
      // "a b" → trim() = "a b" (truthy) → length = 3 → too short
      expect(validatePassword('a b')).toBe(
        'Password must be at least 6 characters.',
      );
    });
  });

  // ── return type ───────────────────────────────────────────────────────────
  describe('return type contract', () => {
    it('returns a string (not null) when validation fails', () => {
      const result = validatePassword('');
      expect(typeof result).toBe('string');
    });

    it('returns null (not a string) when validation passes', () => {
      const result = validatePassword('validpass');
      expect(result).toBeNull();
    });
  });
});

// ---------------------------------------------------------------------------
// validateLoginForm
// ---------------------------------------------------------------------------
describe('validateLoginForm', () => {
  // ── both fields invalid ───────────────────────────────────────────────────
  describe('when both fields are invalid', () => {
    it('returns both email and password errors when both fields are empty strings', () => {
      const result = validateLoginForm({ email: '', password: '' });

      expect(result.email).toBeDefined();
      expect(result.password).toBeDefined();
      expect(typeof result.email).toBe('string');
      expect(typeof result.password).toBe('string');
    });

    it('contains the email required error when email is empty', () => {
      const result = validateLoginForm({ email: '', password: '' });

      expect(result.email).toBe('Email is required.');
    });

    it('contains the password required error when password is empty', () => {
      const result = validateLoginForm({ email: '', password: '' });

      expect(result.password).toBe('Password is required.');
    });

    it('returns both errors when email is invalid format and password is too short', () => {
      const result = validateLoginForm({
        email: 'notanemail',
        password: 'abc',
      });

      expect(result.email).toBe('Please enter a valid email address.');
      expect(result.password).toBe('Password must be at least 6 characters.');
    });

    it('returns both errors when both fields are whitespace-only', () => {
      const result = validateLoginForm({ email: '   ', password: '   ' });

      expect(result.email).toBeDefined();
      expect(result.password).toBeDefined();
    });

    it('returns both errors when email has no domain and password has 1 character', () => {
      const result = validateLoginForm({ email: '@nodomain.com', password: 'x' });

      expect(result.email).toBeDefined();
      expect(result.password).toBeDefined();
    });
  });

  // ── only email invalid ────────────────────────────────────────────────────
  describe('when only the email is invalid (password is valid)', () => {
    it('returns only the email error when email is empty and password meets the minimum length', () => {
      const result = validateLoginForm({ email: '', password: 'abcdef' });

      expect(result.email).toBeDefined();
      expect(result.password).toBeUndefined();
    });

    it('contains the email required error message', () => {
      const result = validateLoginForm({ email: '', password: 'abcdef' });

      expect(result.email).toBe('Email is required.');
    });

    it('returns only the email format error when email is an invalid format and password is long enough', () => {
      const result = validateLoginForm({
        email: 'missing@domain',
        password: 'abcdefg',
      });

      expect(result.email).toBe('Please enter a valid email address.');
      expect(result.password).toBeUndefined();
    });

    it('returns only the email error for "@nodomain.com" with a valid password', () => {
      const result = validateLoginForm({
        email: '@nodomain.com',
        password: 'longerpassword',
      });

      expect(result.email).toBeDefined();
      expect(result.password).toBeUndefined();
    });
  });

  // ── only password invalid ─────────────────────────────────────────────────
  describe('when only the password is invalid (email is valid)', () => {
    it('returns only the password error when email is valid and password is empty', () => {
      const result = validateLoginForm({
        email: 'user@example.com',
        password: '',
      });

      expect(result.email).toBeUndefined();
      expect(result.password).toBeDefined();
    });

    it('contains the password required error message when password is empty', () => {
      const result = validateLoginForm({
        email: 'user@example.com',
        password: '',
      });

      expect(result.password).toBe('Password is required.');
    });

    it('returns only the password length error when email is valid and password is too short', () => {
      const result = validateLoginForm({
        email: 'test.user@domain.co',
        password: '12345',
      });

      expect(result.email).toBeUndefined();
      expect(result.password).toBe('Password must be at least 6 characters.');
    });

    it('returns only the password error for a 3-character password with a valid email', () => {
      const result = validateLoginForm({
        email: 'user@example.com',
        password: 'abc',
      });

      expect(result.email).toBeUndefined();
      expect(result.password).toBeDefined();
    });
  });

  // ── both fields valid ─────────────────────────────────────────────────────
  describe('when both fields are valid', () => {
    it('returns an empty object when both email and password are valid', () => {
      const result = validateLoginForm({
        email: 'user@example.com',
        password: 'abcdef',
      });

      expect(result).toEqual({});
    });

    it('has no email key in the result when both fields are valid', () => {
      const result = validateLoginForm({
        email: 'user@example.com',
        password: 'abcdef',
      });

      expect('email' in result).toBe(false);
    });

    it('has no password key in the result when both fields are valid', () => {
      const result = validateLoginForm({
        email: 'user@example.com',
        password: 'abcdef',
      });

      expect('password' in result).toBe(false);
    });

    it('returns an empty object for a standard email and a long password', () => {
      const result = validateLoginForm({
        email: 'test.user@domain.co',
        password: 'longerpassword',
      });

      expect(Object.keys(result)).toHaveLength(0);
    });

    it('returns an empty object for an email with plus addressing and a 6-char password', () => {
      const result = validateLoginForm({
        email: 'user+tag@example.com',
        password: 'abcdef',
      });

      expect(result).toEqual({});
    });

    it('returns an empty object for a minimal valid email and a password with special chars', () => {
      const result = validateLoginForm({
        email: 'a@b.co',
        password: 'p@$$w0rd!',
      });

      expect(result).toEqual({});
    });
  });

  // ── return shape ──────────────────────────────────────────────────────────
  describe('return shape contract', () => {
    it('always returns a plain object', () => {
      const result = validateLoginForm({ email: '', password: '' });

      expect(typeof result).toBe('object');
      expect(result).not.toBeNull();
      expect(Array.isArray(result)).toBe(false);
    });

    it('result object has at most two keys ("email" and "password")', () => {
      const result = validateLoginForm({ email: '', password: '' });
      const keys = Object.keys(result);

      expect(keys.every((k) => k === 'email' || k === 'password')).toBe(true);
    });

    it('result object has exactly zero keys when both fields are valid', () => {
      const result = validateLoginForm({
        email: 'user@example.com',
        password: 'abcdef',
      });

      expect(Object.keys(result)).toHaveLength(0);
    });

    it('result object has exactly two keys when both fields are invalid', () => {
      const result = validateLoginForm({ email: '', password: '' });

      expect(Object.keys(result)).toHaveLength(2);
    });

    it('result object has exactly one key when only email is invalid', () => {
      const result = validateLoginForm({ email: '', password: 'abcdef' });

      expect(Object.keys(result)).toHaveLength(1);
      expect(Object.keys(result)[0]).toBe('email');
    });

    it('result object has exactly one key when only password is invalid', () => {
      const result = validateLoginForm({
        email: 'user@example.com',
        password: '',
      });

      expect(Object.keys(result)).toHaveLength(1);
      expect(Object.keys(result)[0]).toBe('password');
    });
  });

  // ── delegates to individual validators ───────────────────────────────────
  describe('delegation to validateEmail and validatePassword', () => {
    it('email error in result matches standalone validateEmail output', () => {
      const email = 'notanemail';
      const standalone = validateEmail(email);
      const form = validateLoginForm({ email, password: 'abcdef' });

      expect(form.email).toBe(standalone as string);
    });

    it('password error in result matches standalone validatePassword output', () => {
      const password = 'abc';
      const standalone = validatePassword(password);
      const form = validateLoginForm({
        email: 'user@example.com',
        password,
      });

      expect(form.password).toBe(standalone as string);
    });

    it('produces no email key when validateEmail would return null', () => {
      // validateEmail('user@example.com') === null
      const result = validateLoginForm({
        email: 'user@example.com',
        password: '',
      });

      expect('email' in result).toBe(false);
    });

    it('produces no password key when validatePassword would return null', () => {
      // validatePassword('abcdef') === null
      const result = validateLoginForm({
        email: '',
        password: 'abcdef',
      });

      expect('password' in result).toBe(false);
    });
  });
});

// ---------------------------------------------------------------------------
// Security: no hardcoded credentials in the validation module
// ---------------------------------------------------------------------------
describe('validation module source — no hardcoded credentials', () => {
  /**
   * Reads the raw TypeScript source of the validation module and asserts that
   * it does not contain common patterns used to embed credentials directly in
   * code (e.g. hardcoded passwords, admin credentials, secret keys).
   *
   * This is a static-analysis style test that inspects the file at the path
   * level, independent of runtime behaviour.
   */
  const validationSource = readFileSync(
    resolve(__dirname, 'validation.ts'),
    'utf-8',
  );

  it('does not contain a common default numeric credential appended to "password"', () => {
    expect(validationSource.toLowerCase()).not.toContain(
      process.env.TEST_CREDENTIAL_PASSWORD_PATTERN ?? 'password123',
    );
  });

  it('does not contain a common default numeric credential appended to "admin"', () => {
    expect(validationSource.toLowerCase()).not.toContain(
      process.env.TEST_CREDENTIAL_ADMIN_PATTERN ?? 'admin123',
    );
  });

  it('does not contain the word "secret" as a literal value assignment', () => {
    // Allow the word in comments/docs but flag it when it appears as a quoted string literal
    expect(validationSource).not.toMatch(/=\s*['"`]secret['"`]/i);
  });

  it('does not contain the word "password" assigned as a string literal value', () => {
    expect(validationSource).not.toMatch(/=\s*['"`]password['"`]/i);
  });

  it('does not contain the string "admin" assigned as a string literal value', () => {
    expect(validationSource).not.toMatch(/=\s*['"`]admin['"`]/i);
  });

  it('does not contain any hardcoded API key patterns (long alphanumeric strings ≥ 32 chars)', () => {
    // Matches string literals that look like API keys / tokens
    expect(validationSource).not.toMatch(/['"`][A-Za-z0-9_\-]{32,}['"`]/);
  });

  it('does not reference process.env values inside string literals (would indicate copy-pasted secrets)', () => {
    // Ensures no env-var value has been inlined as a string constant
    expect(validationSource).not.toMatch(/['"`][A-Z_]{3,}=\S+['"`]/);
  });

  it('exports only validateEmail, validatePassword, and validateLoginForm (no hidden credential exports)', () => {
    // Capture all export names from the source
    const exportedFunctions = [
      ...validationSource.matchAll(/^export\s+(?:function|const|let|var)\s+(\w+)/gm),
    ].map((match) => match[1]);

    // Exported interfaces are not captured by the function/const pattern above,
    // so we verify only the runtime exports here.
    expect(exportedFunctions).toContain('validateEmail');
    expect(exportedFunctions).toContain('validatePassword');
    expect(exportedFunctions).toContain('validateLoginForm');
    expect(exportedFunctions).toHaveLength(3);
  });
});
