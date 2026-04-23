/**
 * Tests for index.html
 *
 * Validates the structure, content, and required markup of the HTML entry point.
 * Tests mirror the checks performed by the CI workflow (ci.yml).
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const HTML_PATH = resolve(__dirname, 'index.html');
let html = '';

beforeAll(() => {
  html = readFileSync(HTML_PATH, 'utf-8');
});

// ---------------------------------------------------------------------------
// File existence
// ---------------------------------------------------------------------------
describe('index.html – file existence', () => {
  it('should exist on disk', () => {
    expect(existsSync(HTML_PATH)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// DOCTYPE declaration
// ---------------------------------------------------------------------------
describe('index.html – DOCTYPE', () => {
  it('should start with the HTML5 DOCTYPE declaration', () => {
    expect(html).toMatch(/<!DOCTYPE html>/i);
  });

  it('should have DOCTYPE as the very first token in the file', () => {
    expect(html.trimStart()).toMatch(/^<!DOCTYPE html>/i);
  });
});

// ---------------------------------------------------------------------------
// <html> element
// ---------------------------------------------------------------------------
describe('index.html – <html> element', () => {
  it('should contain an <html> opening tag', () => {
    expect(html).toMatch(/<html/i);
  });

  it('should set lang="en" on the <html> element', () => {
    expect(html).toMatch(/<html[^>]*lang="en"/i);
  });

  it('should contain a closing </html> tag', () => {
    expect(html).toMatch(/<\/html>/i);
  });
});

// ---------------------------------------------------------------------------
// <head> element
// ---------------------------------------------------------------------------
describe('index.html – <head> element', () => {
  it('should contain a <head> section', () => {
    expect(html).toMatch(/<head>/i);
  });

  it('should contain a closing </head> tag', () => {
    expect(html).toMatch(/<\/head>/i);
  });

  it('should declare UTF-8 charset via <meta charset>', () => {
    expect(html).toMatch(/<meta[^>]*charset=["']?UTF-8["']?/i);
  });

  it('should include a viewport meta tag', () => {
    expect(html).toMatch(/<meta[^>]*name=["']viewport["']/i);
  });

  it('should set viewport content to "width=device-width, initial-scale=1.0"', () => {
    expect(html).toMatch(
      /<meta[^>]*content=["']width=device-width,\s*initial-scale=1\.0["']/i
    );
  });

  it('should contain a <title> element', () => {
    expect(html).toMatch(/<title>[^<]+<\/title>/i);
  });

  it('should set the page title to "Hello World"', () => {
    expect(html).toMatch(/<title>\s*Hello World\s*<\/title>/i);
  });
});

// ---------------------------------------------------------------------------
// <body> element
// ---------------------------------------------------------------------------
describe('index.html – <body> element', () => {
  it('should contain a <body> section', () => {
    expect(html).toMatch(/<body>/i);
  });

  it('should contain a closing </body> tag', () => {
    expect(html).toMatch(/<\/body>/i);
  });

  it('should contain an <h1> heading', () => {
    expect(html).toMatch(/<h1>/i);
  });

  it('should render "Hello World" inside an <h1> element', () => {
    expect(html).toMatch(/<h1>\s*Hello World\s*<\/h1>/i);
  });
});

// ---------------------------------------------------------------------------
// "Hello World" content (CI check parity)
// ---------------------------------------------------------------------------
describe('index.html – "Hello World" content (CI parity)', () => {
  it('should contain the text "Hello World" somewhere in the file', () => {
    expect(html).toContain('Hello World');
  });

  it('should contain "Hello World" at least twice (title + h1)', () => {
    const matches = html.match(/Hello World/g) || [];
    expect(matches.length).toBeGreaterThanOrEqual(2);
  });
});

// ---------------------------------------------------------------------------
// Well-formedness checks
// ---------------------------------------------------------------------------
describe('index.html – well-formedness', () => {
  it('should not contain any bare & characters outside entities', () => {
    // Ampersands must be encoded as &amp; in valid HTML
    const withoutEntities = html.replace(/&[a-zA-Z]+;|&#\d+;|&#x[\da-fA-F]+;/g, '');
    expect(withoutEntities).not.toMatch(/&(?![a-zA-Z#])/);
  });

  it('should not contain <script> tags (simple page should not need JS)', () => {
    expect(html).not.toMatch(/<script/i);
  });

  it('should not contain inline style attributes', () => {
    expect(html).not.toMatch(/\sstyle=/i);
  });

  it('should have balanced <head> tags', () => {
    const openTags = (html.match(/<head>/gi) || []).length;
    const closeTags = (html.match(/<\/head>/gi) || []).length;
    expect(openTags).toBe(closeTags);
  });

  it('should have balanced <body> tags', () => {
    const openTags = (html.match(/<body>/gi) || []).length;
    const closeTags = (html.match(/<\/body>/gi) || []).length;
    expect(openTags).toBe(closeTags);
  });

  it('should have balanced <html> tags', () => {
    const openTags = (html.match(/<html[^>]*>/gi) || []).length;
    const closeTags = (html.match(/<\/html>/gi) || []).length;
    expect(openTags).toBe(closeTags);
  });

  it('should have balanced <h1> tags', () => {
    const openTags = (html.match(/<h1>/gi) || []).length;
    const closeTags = (html.match(/<\/h1>/gi) || []).length;
    expect(openTags).toBe(closeTags);
  });
});
