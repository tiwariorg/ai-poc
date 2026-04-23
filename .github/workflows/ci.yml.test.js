/**
 * Tests for .github/workflows/ci.yml
 *
 * Validates the structure, triggers, jobs, and shell steps defined in the
 * GitHub Actions CI workflow.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import yaml from 'js-yaml';

const WORKFLOW_PATH = resolve(__dirname, '../../.github/workflows/ci.yml');
let raw = '';
let workflow = null;

beforeAll(() => {
  raw = readFileSync(WORKFLOW_PATH, 'utf-8');
  workflow = yaml.load(raw);
});

// ---------------------------------------------------------------------------
// File existence
// ---------------------------------------------------------------------------
describe('ci.yml – file existence', () => {
  it('should exist on disk', () => {
    expect(existsSync(WORKFLOW_PATH)).toBe(true);
  });

  it('should be parseable as valid YAML', () => {
    expect(() => yaml.load(raw)).not.toThrow();
  });
});

// ---------------------------------------------------------------------------
// Workflow metadata
// ---------------------------------------------------------------------------
describe('ci.yml – workflow metadata', () => {
  it('should have a "name" field', () => {
    expect(workflow).toHaveProperty('name');
  });

  it('should be named "CI"', () => {
    expect(workflow.name).toBe('CI');
  });
});

// ---------------------------------------------------------------------------
// Trigger events (on:)
// ---------------------------------------------------------------------------
describe('ci.yml – trigger events', () => {
  it('should define "on" triggers', () => {
    expect(workflow).toHaveProperty('on');
  });

  it('should trigger on "push" events', () => {
    expect(workflow.on).toHaveProperty('push');
  });

  it('should trigger on "pull_request" events', () => {
    expect(workflow.on).toHaveProperty('pull_request');
  });

  it('should trigger push on all branches ("**")', () => {
    const pushBranches = workflow.on.push.branches;
    expect(pushBranches).toContain('**');
  });

  it('should trigger pull_request on all branches ("**")', () => {
    const prBranches = workflow.on.pull_request.branches;
    expect(prBranches).toContain('**');
  });
});

// ---------------------------------------------------------------------------
// Jobs
// ---------------------------------------------------------------------------
describe('ci.yml – jobs', () => {
  it('should define a "jobs" section', () => {
    expect(workflow).toHaveProperty('jobs');
  });

  it('should define a "validate" job', () => {
    expect(workflow.jobs).toHaveProperty('validate');
  });

  it('should run "validate" job on ubuntu-latest', () => {
    expect(workflow.jobs.validate['runs-on']).toBe('ubuntu-latest');
  });

  it('should give the "validate" job a human-readable name', () => {
    expect(workflow.jobs.validate.name).toBeTruthy();
  });

  it('should name the validate job "Validate HTML"', () => {
    expect(workflow.jobs.validate.name).toBe('Validate HTML');
  });
});

// ---------------------------------------------------------------------------
// Steps
// ---------------------------------------------------------------------------
describe('ci.yml – steps', () => {
  let steps;

  beforeAll(() => {
    steps = workflow.jobs.validate.steps;
  });

  it('should define at least one step', () => {
    expect(Array.isArray(steps)).toBe(true);
    expect(steps.length).toBeGreaterThan(0);
  });

  // ── Checkout step ──────────────────────────────────────────────────────────
  it('should include a repository checkout step', () => {
    const checkoutStep = steps.find(
      (s) => s.uses && s.uses.startsWith('actions/checkout')
    );
    expect(checkoutStep).toBeDefined();
  });

  it('should use actions/checkout@v4 for the checkout step', () => {
    const checkoutStep = steps.find(
      (s) => s.uses && s.uses.startsWith('actions/checkout')
    );
    expect(checkoutStep.uses).toBe('actions/checkout@v4');
  });

  it('should name the checkout step', () => {
    const checkoutStep = steps.find(
      (s) => s.uses && s.uses.startsWith('actions/checkout')
    );
    expect(checkoutStep.name).toBeTruthy();
  });

  // ── index.html existence check ────────────────────────────────────────────
  it('should verify that index.html exists via a "test -f index.html" command', () => {
    const existsStep = steps.find(
      (s) => s.run && s.run.includes('test -f index.html')
    );
    expect(existsStep).toBeDefined();
  });

  it('should name the index.html existence step', () => {
    const existsStep = steps.find(
      (s) => s.run && s.run.includes('test -f index.html')
    );
    expect(existsStep.name).toBeTruthy();
  });

  // ── "Hello World" grep check ──────────────────────────────────────────────
  it('should grep index.html for "Hello World"', () => {
    const helloStep = steps.find(
      (s) => s.run && s.run.includes('Hello World') && s.run.includes('grep')
    );
    expect(helloStep).toBeDefined();
  });

  it('should use a quiet grep (-q) so the step fails silently on mismatch', () => {
    const helloStep = steps.find(
      (s) => s.run && s.run.includes('Hello World') && s.run.includes('grep')
    );
    expect(helloStep.run).toMatch(/grep\s+-q/);
  });

  it('should name the "Hello World" grep step', () => {
    const helloStep = steps.find(
      (s) => s.run && s.run.includes('Hello World') && s.run.includes('grep')
    );
    expect(helloStep.name).toBeTruthy();
  });

  // ── DOCTYPE grep check ────────────────────────────────────────────────────
  it('should verify the <!DOCTYPE html> declaration is present in index.html', () => {
    const doctypeStep = steps.find(
      (s) => s.run && s.run.includes('<!DOCTYPE html>')
    );
    expect(doctypeStep).toBeDefined();
  });

  it('should use a quiet grep (-q) for the DOCTYPE check', () => {
    const doctypeStep = steps.find(
      (s) => s.run && s.run.includes('<!DOCTYPE html>')
    );
    expect(doctypeStep.run).toMatch(/grep\s+-q/);
  });

  it('should name the DOCTYPE verification step', () => {
    const doctypeStep = steps.find(
      (s) => s.run && s.run.includes('<!DOCTYPE html>')
    );
    expect(doctypeStep.name).toBeTruthy();
  });

  // ── Step ordering ─────────────────────────────────────────────────────────
  it('should check out the repo before any validation steps', () => {
    const checkoutIdx = steps.findIndex(
      (s) => s.uses && s.uses.startsWith('actions/checkout')
    );
    const existsIdx = steps.findIndex(
      (s) => s.run && s.run.includes('test -f index.html')
    );
    expect(checkoutIdx).toBeLessThan(existsIdx);
  });

  it('should check file existence before grepping its contents', () => {
    const existsIdx = steps.findIndex(
      (s) => s.run && s.run.includes('test -f index.html')
    );
    const helloIdx = steps.findIndex(
      (s) => s.run && s.run.includes('Hello World')
    );
    expect(existsIdx).toBeLessThan(helloIdx);
  });

  // ── Total step count ──────────────────────────────────────────────────────
  it('should define exactly 4 steps (checkout + 3 validations)', () => {
    expect(steps).toHaveLength(4);
  });

  // ── Every step has a name ─────────────────────────────────────────────────
  it('should give every step a descriptive name', () => {
    steps.forEach((step, idx) => {
      expect(step.name, `Step ${idx} is missing a name`).toBeTruthy();
    });
  });
});

// ---------------------------------------------------------------------------
// Raw YAML content checks (CI parity)
// ---------------------------------------------------------------------------
describe('ci.yml – raw content checks (CI parity)', () => {
  it('should contain the literal string "Hello World"', () => {
    expect(raw).toContain('Hello World');
  });

  it('should contain the literal string "<!DOCTYPE html>"', () => {
    expect(raw).toContain('<!DOCTYPE html>');
  });

  it('should reference "index.html" by name', () => {
    expect(raw).toContain('index.html');
  });

  it('should reference "ubuntu-latest" as the runner image', () => {
    expect(raw).toContain('ubuntu-latest');
  });

  it('should reference "actions/checkout@v4"', () => {
    expect(raw).toContain('actions/checkout@v4');
  });
});
