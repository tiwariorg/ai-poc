import { describe, it, expect } from 'vitest';
import { validateEmail, validatePassword } from './validation';

// ---------------------------------------------------------------------------
// validateEmail
// ---------------------------------------------------------------------------
describe('validateEmail', () => {
  // ── required / empty ────────────────────────────────────────────────────
  it('should return "Email is required." for an empty string', () => {
    expect(validateEmail('')).toBe('Email is required.');
  });

  it('should return "Email is required." for a whitespace-only string', () => {
    expect(validateEmail('   ')).toBe('Email is required.');
  });

  it('should return "Email is required." for a tab-only string', () => {
    expect(validateEmail('\t')).toBe('Email is required.');
  });

  // ── invalid format ───────────────────────────────────────────────────────
  it('should return format error for a plain word with no @ sign', () => {
    expect(validateEmail('notanemail')).toBe('Please enter a valid email address.');
  });

  it('should return format error when @ is missing a domain', () => {
    expect(validateEmail('user@')).toBe('Please enter a valid email address.');
  });

  it('should return format error when domain has no TLD dot', () => {
    expect(validateEmail('user@domain')).toBe('Please enter a valid email address.');
  });

  it('should return format error for string with spaces in local part', () => {
    expect(validateEmail('user name@domain.com')).toBe('Please enter a valid email address.');
  });

  it('should return format error when there is no local part before @', () => {
    expect(validateEmail('@domain.com')).toBe('Please enter a valid email address.');
  });

  it('should return format error for double-@ addresses', () => {
    expect(validateEmail('user@@domain.com')).toBe('Please enter a valid email address.');
  });

  // ── valid emails ─────────────────────────────────────────────────────────
  it('should return null for a standard valid email', () => {
    expect(validateEmail('user@example.com')).toBeNull();
  });

  it('should return null for an email with subdomains', () => {
    expect(validateEmail('user@mail.example.co.uk')).toBeNull();
  });

  it('should return null for an email with plus addressing', () => {
    expect(validateEmail('user+tag@example.com')).toBeNull();
  });

  it('should return null for an email with numeric local part', () => {
    expect(validateEmail('123@domain.org')).toBeNull();
  });

  it('should return null for a minimal valid email "a@b.c"', () => {
    expect(validateEmail('a@b.c')).toBeNull();
  });

  it('should return null for admin@example.com', () => {
    expect(validateEmail('admin@example.com')).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// validatePassword
// ---------------------------------------------------------------------------
describe('validatePassword', () => {
  // ── required / empty ────────────────────────────────────────────────────
  it('should return "Password is required." for an empty string', () => {
    expect(validatePassword('')).toBe('Password is required.');
  });

  it('should return "Password is required." for a whitespace-only string', () => {
    expect(validatePassword('     ')).toBe('Password is required.');
  });

  it('should return "Password is required." for a newline-only string', () => {
    expect(validatePassword('\n')).toBe('Password is required.');
  });

  // ── too short ────────────────────────────────────────────────────────────
  it('should return length error for a 1-character password', () => {
    expect(validatePassword('a')).toBe('Password must be at least 6 characters.');
  });

  it('should return length error for a 3-character password', () => {
    expect(validatePassword('abc')).toBe('Password must be at least 6 characters.');
  });

  it('should return length error for a 5-character password', () => {
    expect(validatePassword('abcde')).toBe('Password must be at least 6 characters.');
  });

  // ── edge: exactly at minimum ─────────────────────────────────────────────
  it('should return null for a password of exactly 6 characters', () => {
    expect(validatePassword('secure')).toBeNull();
  });

  // ── valid passwords ──────────────────────────────────────────────────────
  it('should return null for a 7-character password', () => {
    expect(validatePassword('securex')).toBeNull();
  });

  it('should return null for a long password', () => {
    expect(validatePassword('ThisIsAVeryLongPassword123!')).toBeNull();
  });

  it('should return null for a numeric password with 6+ digits', () => {
    expect(validatePassword('123456')).toBeNull();
  });

  it('should return null for the hardcoded demo password "admin123"', () => {
    expect(validatePassword('admin123')).toBeNull();
  });

  // ── whitespace trimming edge case ────────────────────────────────────────
  it('should treat a password of only spaces as required error (not length error)', () => {
    // 10 spaces → trim() length === 0 → required error takes priority
    const result = validatePassword('          ');
    expect(result).toBe('Password is required.');
  });

  it('should not trim the actual password length (spaces in middle do count)', () => {
    // "ab cd " → trim() is "ab cd" (5 chars) BUT password.length is 6
    // validatePassword trims only for the "required" check, not the length check
    // So "ab cd " has length 6, trim gives "ab cd" (5 chars) which is truthy → length check uses password.length
    expect(validatePassword('ab cd ')).toBeNull();
  });
});
