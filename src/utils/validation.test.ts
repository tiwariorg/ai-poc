import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { validateEmail, validatePassword } from './validation';

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
    it('returns a format error for plain text with no @ sign ("plaintext")', () => {
      expect(validateEmail('plaintext')).toBe('Please enter a valid email address.');
    });

    it('returns a format error when the domain part is missing ("user@")', () => {
      expect(validateEmail('user@')).toBe('Please enter a valid email address.');
    });

    it('returns a format error when there is no local part before @ ("@domain.com")', () => {
      expect(validateEmail('@domain.com')).toBe('Please enter a valid email address.');
    });

    it('returns a format error when the domain is missing a TLD dot ("user@domain")', () => {
      expect(validateEmail('user@domain')).toBe('Please enter a valid email address.');
    });

    it('returns a format error when the local part contains a space ("user name@domain.com")', () => {
      expect(validateEmail('user name@domain.com')).toBe('Please enter a valid email address.');
    });

    it('returns a format error for a double-@ address ("user@@domain.com")', () => {
      expect(validateEmail('user@@domain.com')).toBe('Please enter a valid email address.');
    });

    it('returns a format error for a string that is only the @ symbol', () => {
      expect(validateEmail('@')).toBe('Please enter a valid email address.');
    });

    it('returns a format error for an address without a TLD ("user@domain.")', () => {
      expect(validateEmail('user@domain.')).toBe('Please enter a valid email address.');
    });
  });

  // ── valid emails ──────────────────────────────────────────────────────────
  describe('when the value is a valid email address', () => {
    it('returns null for a standard email ("user@example.com")', () => {
      expect(validateEmail('user@example.com')).toBeNull();
    });

    it('returns null for an email with a subdomain ("user@mail.example.co.uk")', () => {
      expect(validateEmail('user@mail.example.co.uk')).toBeNull();
    });

    it('returns null for an email with plus addressing ("user+tag@example.com")', () => {
      expect(validateEmail('user+tag@example.com')).toBeNull();
    });

    it('returns null for an email with a numeric local part ("123@domain.org")', () => {
      expect(validateEmail('123@domain.org')).toBeNull();
    });

    it('returns null for a minimal valid email ("a@b.c")', () => {
      expect(validateEmail('a@b.c')).toBeNull();
    });

    it('returns null for an email with dots in the local part ("first.last@example.com")', () => {
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
    it('returns the length error for a 1-character password', () => {
      expect(validatePassword('a')).toBe('Password must be at least 6 characters.');
    });

    it('returns the length error for a 2-character password', () => {
      expect(validatePassword('ab')).toBe('Password must be at least 6 characters.');
    });

    it('returns the length error for a 3-character password', () => {
      expect(validatePassword('abc')).toBe('Password must be at least 6 characters.');
    });

    it('returns the length error for a 4-character password', () => {
      expect(validatePassword('abcd')).toBe('Password must be at least 6 characters.');
    });

    it('returns the length error for a 5-character password (boundary − 1)', () => {
      expect(validatePassword('abcde')).toBe('Password must be at least 6 characters.');
    });
  });

  // ── exactly at the minimum boundary ──────────────────────────────────────
  describe('when the password is exactly 6 characters (boundary)', () => {
    it('returns null for a 6-character alphabetic password', () => {
      expect(validatePassword('secure')).toBeNull();
    });

    it('returns null for a 6-character numeric password', () => {
      expect(validatePassword('123456')).toBeNull();
    });

    it('returns null for a 6-character mixed password', () => {
      expect(validatePassword('aB3!#z')).toBeNull();
    });
  });

  // ── valid passwords (6+ characters) ──────────────────────────────────────
  describe('when the password is 6 or more characters', () => {
    it('returns null for a 7-character password', () => {
      expect(validatePassword('securex')).toBeNull();
    });

    it('returns null for a long alphanumeric password', () => {
      expect(validatePassword('ThisIsAVeryLongPassword123!')).toBeNull();
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
      expect(validatePassword('a b')).toBe('Password must be at least 6 characters.');
    });
  });

  // ── return type ───────────────────────────────────────────────────────────
  describe('return type contract', () => {
    it('returns a string (not null) when validation fails', () => {
      const result = validatePassword('');
      expect(typeof result).toBe('string');
    });

    it('returns null (not a string) when validation passes', () => {
      const result = validatePassword('validpassword');
      expect(result).toBeNull();
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

  it('does not contain the word "password123" (common default credential)', () => {
    expect(validationSource.toLowerCase()).not.toContain('password123');
  });

  it('does not contain the word "admin123" (common default credential)', () => {
    expect(validationSource.toLowerCase()).not.toContain('admin123');
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

  it('exports only validateEmail and validatePassword (no hidden credential exports)', () => {
    // Capture all export names from the source
    const exportedNames = [...validationSource.matchAll(/^export\s+(?:function|const|let|var)\s+(\w+)/gm)]
      .map((match) => match[1]);

    expect(exportedNames).toContain('validateEmail');
    expect(exportedNames).toContain('validatePassword');
    // There should be exactly those two exports and nothing else
    expect(exportedNames).toHaveLength(2);
  });
});
