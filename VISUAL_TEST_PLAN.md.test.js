/**
 * Tests for VISUAL_TEST_PLAN.md
 *
 * Validates the structure, content completeness, and accuracy of the manual
 * visual review plan for index.html (KAN-11). These tests ensure the document
 * faithfully describes the HTML/CSS artefact under test and that every required
 * section, checklist item, and cross-reference is present.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const PLAN_PATH = resolve(__dirname, 'VISUAL_TEST_PLAN.md');
let content = '';

beforeAll(() => {
  content = readFileSync(PLAN_PATH, 'utf-8');
});

/**
 * Extract the text of a numbered section (e.g. "### 2 — …") up to the start
 * of the next same-or-higher-level heading.  Uses a lazy [\s\S]+? with a
 * lookahead so that Unicode characters in headings (e.g. em-dash U+2014) do
 * not trip up character-class ranges.
 */
function extractSection(headingPattern, nextHeadingPattern) {
  const re = new RegExp(
    headingPattern + '[\\s\\S]+?(?=' + nextHeadingPattern + '|$)'
  );
  return content.match(re)?.[0] ?? '';
}

// ---------------------------------------------------------------------------
// File existence
// ---------------------------------------------------------------------------
describe('VISUAL_TEST_PLAN.md – file existence', () => {
  it('should exist on disk', () => {
    expect(existsSync(PLAN_PATH)).toBe(true);
  });

  it('should be a non-empty file', () => {
    expect(content.trim().length).toBeGreaterThan(0);
  });

  it('should end with a newline', () => {
    expect(content).toMatch(/\n$/);
  });
});

// ---------------------------------------------------------------------------
// Document header / metadata
// ---------------------------------------------------------------------------
describe('VISUAL_TEST_PLAN.md – document header', () => {
  it('should have a top-level heading "Visual Review & Responsiveness Test Plan"', () => {
    expect(content).toMatch(/^#\s+Visual Review & Responsiveness Test Plan/m);
  });

  it('should reference the ticket KAN-11', () => {
    expect(content).toMatch(/KAN-11/);
  });

  it('should identify the file under test as index.html', () => {
    expect(content).toMatch(/index\.html/);
  });

  it('should declare the test type as Manual visual review', () => {
    expect(content).toMatch(/[Mm]anual visual review/);
  });

  it('should mention the tech stack (Plain HTML + CSS)', () => {
    expect(content).toMatch(/Plain HTML\s*\+\s*CSS/i);
  });

  it('should mention GitHub Pages as the deployment target', () => {
    expect(content).toMatch(/GitHub Pages/i);
  });
});

// ---------------------------------------------------------------------------
// Overview section
// ---------------------------------------------------------------------------
describe('VISUAL_TEST_PLAN.md – Overview section', () => {
  it('should contain an "Overview" heading', () => {
    expect(content).toMatch(/^#{1,3}\s+Overview/m);
  });

  it('should explain that automated tests are out of scope', () => {
    expect(content).toMatch(/out of scope/i);
  });

  it('should mention a manual review checklist', () => {
    expect(content).toMatch(/checklist/i);
  });
});

// ---------------------------------------------------------------------------
// How to Open the Page section
// ---------------------------------------------------------------------------
describe('VISUAL_TEST_PLAN.md – "How to Open the Page" section', () => {
  it('should contain a section about opening the page', () => {
    expect(content).toMatch(/How to Open the Page/i);
  });

  it('should document a local-file opening method', () => {
    expect(content).toMatch(/[Ll]ocal file|File.*Open/);
  });

  it('should document a local-server opening method', () => {
    expect(content).toMatch(/[Ll]ocal server|npx serve/i);
  });

  it('should include the npx serve command', () => {
    expect(content).toContain('npx serve');
  });

  it('should reference GitHub Pages as an opening method', () => {
    expect(content).toMatch(/GitHub Pages/i);
  });
});

// ---------------------------------------------------------------------------
// Viewport Configurations section
// ---------------------------------------------------------------------------
describe('VISUAL_TEST_PLAN.md – Viewport Configurations', () => {
  it('should contain a "Viewport Configurations" section', () => {
    expect(content).toMatch(/Viewport Configurations/i);
  });

  it('should define a Desktop viewport', () => {
    expect(content).toMatch(/Desktop/i);
  });

  it('should define a Tablet viewport', () => {
    expect(content).toMatch(/Tablet/i);
  });

  it('should define a Mobile viewport', () => {
    expect(content).toMatch(/Mobile/i);
  });

  it('should specify 1440 px for the Desktop width', () => {
    expect(content).toMatch(/1440/);
  });

  it('should specify 768 px for the Tablet width', () => {
    expect(content).toMatch(/768/);
  });

  it('should specify 375 px for the Mobile width', () => {
    expect(content).toMatch(/375/);
  });

  it('should include DevTools preset guidance', () => {
    expect(content).toMatch(/DevTools/i);
  });
});

// ---------------------------------------------------------------------------
// Section 1 – Content & Layout
// ---------------------------------------------------------------------------
describe('VISUAL_TEST_PLAN.md – Section 1: Content & Layout', () => {
  it('should contain a Content & Layout section', () => {
    expect(content).toMatch(/Content\s*[&and]+\s*Layout/i);
  });

  it('should have checklist item 1.1 about the Hello World heading', () => {
    expect(content).toMatch(/1\.1/);
    expect(content).toMatch(/Hello World.*heading|heading.*Hello World/i);
  });

  it('should have checklist item 1.2 about centred layout', () => {
    expect(content).toMatch(/1\.2/);
    expect(content).toMatch(/centr(e|er)d/i);
  });

  it('should have checklist item 1.3 about the tagline', () => {
    expect(content).toMatch(/1\.3/);
    expect(content).toMatch(/[Tt]agline|subtitle/i);
  });

  it('should reference the exact tagline text', () => {
    expect(content).toContain('Welcome to something beautiful.');
  });

  it('should have checklist item 1.4 about the decorative divider', () => {
    expect(content).toMatch(/1\.4/);
    expect(content).toMatch(/divider/i);
  });

  it('should include unchecked Markdown checkboxes for each content item', () => {
    // Use lazy [\s\S]+? with lookahead to handle Unicode em-dashes in headings
    const section = extractSection('### 1 ', '### 2 ');
    const unchecked = (section.match(/- \[ \]/g) || []).length;
    expect(unchecked).toBeGreaterThanOrEqual(4);
  });
});

// ---------------------------------------------------------------------------
// Section 2 – Background
// ---------------------------------------------------------------------------
describe('VISUAL_TEST_PLAN.md – Section 2: Background', () => {
  it('should contain a Background section', () => {
    expect(content).toMatch(/^#{1,4}\s+.*Background/m);
  });

  it('should reference the gradient colour value #667eea', () => {
    expect(content).toContain('#667eea');
  });

  it('should reference the gradient colour value #764ba2', () => {
    expect(content).toContain('#764ba2');
  });

  it('should describe the 135deg linear-gradient direction', () => {
    expect(content).toMatch(/135deg/);
  });

  it('should have checklist item 2.1 about gradient covering full viewport', () => {
    expect(content).toMatch(/2\.1/);
    expect(content).toMatch(/gradient/i);
  });

  it('should have checklist item 2.2 about DevTools verification', () => {
    expect(content).toMatch(/2\.2/);
  });

  it('should include unchecked checkboxes for background checks', () => {
    // Lazy match handles em-dash (U+2014) in "### 2 — Background"
    const section = extractSection('### 2 ', '### 3 ');
    const unchecked = (section.match(/- \[ \]/g) || []).length;
    expect(unchecked).toBeGreaterThanOrEqual(2);
  });
});

// ---------------------------------------------------------------------------
// Section 3 – Card Container
// ---------------------------------------------------------------------------
describe('VISUAL_TEST_PLAN.md – Section 3: Card Container', () => {
  it('should contain a Card Container section', () => {
    expect(content).toMatch(/Card Container/i);
  });

  it('should have checklist item 3.1 about rounded corners', () => {
    expect(content).toMatch(/3\.1/);
    expect(content).toMatch(/rounded corners/i);
  });

  it('should reference border-radius: 1.5rem', () => {
    expect(content).toMatch(/border-radius:\s*1\.5rem/);
  });

  it('should have checklist item 3.2 about box-shadow', () => {
    expect(content).toMatch(/3\.2/);
    expect(content).toMatch(/box-shadow/i);
  });

  it('should reference the exact box-shadow value', () => {
    expect(content).toMatch(/0 25px 50px/);
  });

  it('should have checklist item 3.3 about the near-white / semi-translucent background', () => {
    expect(content).toMatch(/3\.3/);
    expect(content).toMatch(/rgba\(255,\s*255,\s*255,\s*0\.95\)/);
  });

  it('should include unchecked checkboxes for card checks', () => {
    const section = extractSection('### 3 ', '### 4 ');
    const unchecked = (section.match(/- \[ \]/g) || []).length;
    expect(unchecked).toBeGreaterThanOrEqual(3);
  });
});

// ---------------------------------------------------------------------------
// Section 4 – Animation
// ---------------------------------------------------------------------------
describe('VISUAL_TEST_PLAN.md – Section 4: Animation', () => {
  it('should contain an Animation section', () => {
    expect(content).toMatch(/^#{1,4}\s+.*Animation/m);
  });

  it('should have checklist item 4.1 about fade-in on initial load', () => {
    expect(content).toMatch(/4\.1/);
    expect(content).toMatch(/[Ff]ade.?in|animation.*load|load.*animation/i);
  });

  it('should reference the fadeInUp keyframe name', () => {
    expect(content).toMatch(/fadeInUp/);
  });

  it('should mention the 1 second animation duration', () => {
    expect(content).toMatch(/1\s*s(econd)?/i);
  });

  it('should have checklist item 4.2 about the card being fully visible after animation', () => {
    expect(content).toMatch(/4\.2/);
    expect(content).toMatch(/fully visible/i);
  });

  it('should have checklist item 4.3 about animation replaying on hard refresh', () => {
    expect(content).toMatch(/4\.3/);
    expect(content).toMatch(/hard refresh/i);
  });

  it('should reference the ease-out timing function', () => {
    expect(content).toMatch(/ease-out/);
  });

  it('should reference the forwards fill mode', () => {
    expect(content).toMatch(/forwards/);
  });

  it('should include unchecked checkboxes for animation checks', () => {
    const section = extractSection('### 4 ', '### 5 ');
    const unchecked = (section.match(/- \[ \]/g) || []).length;
    expect(unchecked).toBeGreaterThanOrEqual(3);
  });
});

// ---------------------------------------------------------------------------
// Section 5 – Typography
// ---------------------------------------------------------------------------
describe('VISUAL_TEST_PLAN.md – Section 5: Typography', () => {
  it('should contain a Typography section', () => {
    expect(content).toMatch(/^#{1,4}\s+.*Typography/m);
  });

  it('should have checklist item 5.1 about Playfair Display', () => {
    expect(content).toMatch(/5\.1/);
    expect(content).toMatch(/Playfair Display/);
  });

  it('should have checklist item 5.2 about Inter font', () => {
    expect(content).toMatch(/5\.2/);
    expect(content).toMatch(/Inter/);
  });

  it('should reference Google Fonts as the font source', () => {
    expect(content).toMatch(/Google Fonts/i);
  });

  it('should have checklist item 5.3 about clean and modern typography', () => {
    expect(content).toMatch(/5\.3/);
    expect(content).toMatch(/clean.*modern|modern.*clean/i);
  });

  it('should have checklist item 5.4 about Google Fonts network requests', () => {
    expect(content).toMatch(/5\.4/);
    expect(content).toMatch(/network/i);
  });

  it('should reference fonts.googleapis.com', () => {
    expect(content).toMatch(/fonts\.googleapis\.com/);
  });

  it('should include unchecked checkboxes for typography checks', () => {
    const section = extractSection('### 5 ', '### 6 ');
    const unchecked = (section.match(/- \[ \]/g) || []).length;
    expect(unchecked).toBeGreaterThanOrEqual(4);
  });
});

// ---------------------------------------------------------------------------
// Section 6 – Responsive Behaviour
// ---------------------------------------------------------------------------
describe('VISUAL_TEST_PLAN.md – Section 6: Responsive Behaviour', () => {
  it('should contain a Responsive Behaviour section', () => {
    expect(content).toMatch(/Responsive\s+Behaviour/i);
  });

  // Desktop sub-section
  it('should include a Desktop sub-section (6.1)', () => {
    expect(content).toMatch(/6\.1\b/);
    expect(content).toMatch(/Desktop/i);
  });

  it('should reference max-width: 600px', () => {
    expect(content).toMatch(/max-width:\s*600px/);
  });

  it('should reference desktop h1 font-size of 3.5rem', () => {
    expect(content).toMatch(/3\.5rem/);
  });

  it('should have check 6.1.3 about no horizontal scrollbar on desktop', () => {
    expect(content).toMatch(/6\.1\.3/);
    expect(content).toMatch(/horizontal scrollbar|horizontal scroll/i);
  });

  // Tablet sub-section
  it('should include a Tablet sub-section (6.2)', () => {
    expect(content).toMatch(/6\.2\b/);
    expect(content).toMatch(/Tablet/i);
  });

  it('should reference tablet h1 font-size of 2.5rem', () => {
    expect(content).toMatch(/2\.5rem/);
  });

  it('should reference the @media max-width 768px breakpoint', () => {
    expect(content).toMatch(/@media.*768px|768px.*@media/i);
  });

  it('should reference reduced card padding 2rem 1.5rem', () => {
    expect(content).toMatch(/2rem\s+1\.5rem/);
  });

  it('should have check 6.2.4 about no horizontal scroll at 768 px', () => {
    expect(content).toMatch(/6\.2\.4/);
  });

  // Mobile sub-section
  it('should include a Mobile sub-section (6.3)', () => {
    expect(content).toMatch(/6\.3\b/);
    expect(content).toMatch(/Mobile/i);
  });

  it('should reference mobile h1 font-size of 2rem', () => {
    expect(content).toMatch(/2rem/);
  });

  it('should reference mobile tagline font-size of 1rem', () => {
    expect(content).toMatch(/1rem/);
  });

  it('should reference the @media max-width 480px breakpoint', () => {
    expect(content).toMatch(/@media.*480px|480px.*@media/i);
  });

  it('should have check 6.3.5 about no horizontal scroll at 375 px', () => {
    expect(content).toMatch(/6\.3\.5/);
  });

  it('should include the scrollWidth DevTools console snippet', () => {
    expect(content).toMatch(/scrollWidth/);
  });
});

// ---------------------------------------------------------------------------
// Section 7 – Source Code Verification
// ---------------------------------------------------------------------------
describe('VISUAL_TEST_PLAN.md – Section 7: Source Code Verification', () => {
  it('should contain a Source Code Verification section', () => {
    expect(content).toMatch(/Source Code Verification/i);
  });

  it('should have check 7.1 about no JavaScript', () => {
    expect(content).toMatch(/7\.1/);
    expect(content).toMatch(/[Nn]o JavaScript|no.*<script>/i);
  });

  it('should have check 7.2 about no external JS files', () => {
    expect(content).toMatch(/7\.2/);
    expect(content).toMatch(/external.*JS|JS.*external/i);
  });

  it('should have check 7.3 about all CSS in a <style> block', () => {
    expect(content).toMatch(/7\.3/);
    expect(content).toMatch(/<style>/);
  });

  it('should have check 7.4 about no inline style attributes', () => {
    expect(content).toMatch(/7\.4/);
    expect(content).toMatch(/inline.*style|style.*inline/i);
  });

  it('should have check 7.5 about valid HTML5 DOCTYPE', () => {
    expect(content).toMatch(/7\.5/);
    expect(content).toMatch(/DOCTYPE/i);
  });

  it('should have check 7.6 about <html lang="en">', () => {
    expect(content).toMatch(/7\.6/);
    expect(content).toMatch(/lang="en"/);
  });

  it('should include unchecked checkboxes for source code checks', () => {
    const section = extractSection('### 7 ', '## Accessibility');
    const unchecked = (section.match(/- \[ \]/g) || []).length;
    expect(unchecked).toBeGreaterThanOrEqual(6);
  });
});

// ---------------------------------------------------------------------------
// Accessibility Spot-Checks section
// ---------------------------------------------------------------------------
describe('VISUAL_TEST_PLAN.md – Accessibility Spot-Checks', () => {
  it('should contain an Accessibility section', () => {
    expect(content).toMatch(/Accessibility/i);
  });

  it('should have check A.1 about aria-hidden on the decorative divider', () => {
    expect(content).toMatch(/A\.1/);
    expect(content).toMatch(/aria-hidden/i);
  });

  it('should have check A.2 about WCAG AA colour contrast', () => {
    expect(content).toMatch(/A\.2/);
    expect(content).toMatch(/WCAG AA/i);
  });

  it('should reference the h1 colour #2d3748', () => {
    expect(content).toMatch(/#2d3748/i);
  });

  it('should reference the tagline colour #718096', () => {
    expect(content).toMatch(/#718096/i);
  });

  it('should specify a 4.5:1 contrast ratio requirement', () => {
    expect(content).toMatch(/4\.5\s*:\s*1/);
  });

  it('should have check A.3 about a meaningful page title', () => {
    expect(content).toMatch(/A\.3/);
    expect(content).toMatch(/page title|title.*meaningful/i);
  });

  it('should include unchecked checkboxes for accessibility checks', () => {
    // Extract from "## Accessibility" up to the next "## " heading
    const section = extractSection('## Accessibility', '## Issue Log');
    const unchecked = (section.match(/- \[ \]/g) || []).length;
    expect(unchecked).toBeGreaterThanOrEqual(3);
  });
});

// ---------------------------------------------------------------------------
// Issue Log section
// ---------------------------------------------------------------------------
describe('VISUAL_TEST_PLAN.md – Issue Log section', () => {
  it('should contain an Issue Log section', () => {
    expect(content).toMatch(/Issue Log/i);
  });

  it('should include a severity scale explanation', () => {
    expect(content).toMatch(/[Ss]everity/);
  });

  it('should reference P1 as critical severity', () => {
    expect(content).toMatch(/P1.*critical|critical.*P1/i);
  });

  it('should reference P2 as major severity', () => {
    expect(content).toMatch(/P2.*major|major.*P2/i);
  });

  it('should include table columns for Viewport and Check ID', () => {
    expect(content).toMatch(/Viewport/);
    expect(content).toMatch(/Check ID/);
  });
});

// ---------------------------------------------------------------------------
// Sign-off section
// ---------------------------------------------------------------------------
describe('VISUAL_TEST_PLAN.md – Sign-off section', () => {
  it('should contain a Sign-off section', () => {
    expect(content).toMatch(/Sign-off/i);
  });

  it('should include a Pass / Fail option in the sign-off table', () => {
    expect(content).toMatch(/Pass/);
    expect(content).toMatch(/Fail/);
  });

  it('should require all P1 and P2 issues to be resolved before sign-off', () => {
    expect(content).toMatch(/P1.*P2|P2.*P1/);
    expect(content).toMatch(/resolved|re-tested/i);
  });

  it('should include a Reviewer role row', () => {
    expect(content).toMatch(/Reviewer/i);
  });
});

// ---------------------------------------------------------------------------
// CSS Reference table at the end
// ---------------------------------------------------------------------------
describe('VISUAL_TEST_PLAN.md – CSS Properties Reference table', () => {
  it('should contain a CSS properties reference section', () => {
    expect(content).toMatch(/CSS Properties/i);
  });

  it('should reference the .hero flexbox centring CSS', () => {
    expect(content).toMatch(/\.hero/);
    expect(content).toMatch(/display:\s*flex/);
  });

  it('should reference the .card max-width constraint', () => {
    expect(content).toMatch(/\.card/);
    expect(content).toMatch(/max-width:\s*600px/);
  });

  it('should reference the animation property in the reference table', () => {
    expect(content).toMatch(/animation:\s*fadeInUp/);
  });

  it('should reference h1 font-family in the table', () => {
    expect(content).toMatch(/font-family:\s*'Playfair Display'/);
  });

  it('should reference body font-family in the table', () => {
    expect(content).toMatch(/font-family:\s*'Inter'/);
  });

  it('should map all major checklist IDs to CSS selectors', () => {
    // Key check IDs that must appear in the reference table
    const expectedIds = [
      '1.2', '2.1', '3.1', '3.2', '4.1',
      '5.1', '5.2', '6.1.1', '6.1.2',
      '6.2.1', '6.2.2', '6.3.1', '6.3.2',
    ];
    for (const id of expectedIds) {
      expect(content, `Reference table missing check ${id}`).toContain(id);
    }
  });
});

// ---------------------------------------------------------------------------
// Overall checklist completeness
// ---------------------------------------------------------------------------
describe('VISUAL_TEST_PLAN.md – overall checklist completeness', () => {
  it('should contain at least 25 unchecked checkbox items', () => {
    const unchecked = (content.match(/- \[ \]/g) || []).length;
    expect(unchecked).toBeGreaterThanOrEqual(25);
  });

  it('should contain no pre-checked checkboxes (all items should start unchecked)', () => {
    const checked = (content.match(/- \[x\]/gi) || []).length;
    expect(checked).toBe(0);
  });

  it('should define checklist items across all 7 numbered sections', () => {
    for (let i = 1; i <= 7; i++) {
      expect(content, `Section ${i} checklist items missing`).toMatch(
        new RegExp(`${i}\\.\\d+`)
      );
    }
  });

  it('should reference DevTools multiple times for verification guidance', () => {
    const devToolsCount = (content.match(/DevTools/gi) || []).length;
    expect(devToolsCount).toBeGreaterThanOrEqual(3);
  });

  it('should include a link or reference to the WebAIM Contrast Checker', () => {
    expect(content).toMatch(/WebAIM/i);
  });
});

// ---------------------------------------------------------------------------
// Markdown formatting quality
// ---------------------------------------------------------------------------
describe('VISUAL_TEST_PLAN.md – Markdown formatting', () => {
  it('should have a single H1 title at the top', () => {
    const h1s = content.match(/^# .+/gm) || [];
    expect(h1s.length).toBe(1);
  });

  it('should use H2 (##) for major sections', () => {
    const h2s = content.match(/^## .+/gm) || [];
    expect(h2s.length).toBeGreaterThanOrEqual(3);
  });

  it('should use H3 (###) or H4 (####) for subsections', () => {
    const h3s = content.match(/^#{3,4} .+/gm) || [];
    expect(h3s.length).toBeGreaterThanOrEqual(5);
  });

  it('should include at least one Markdown table', () => {
    expect(content).toMatch(/\|.+\|.+\|/);
  });

  it('should use horizontal rule separators (---)', () => {
    const separators = content.match(/^---$/gm) || [];
    expect(separators.length).toBeGreaterThanOrEqual(2);
  });

  it('should contain code formatting for CSS values or commands', () => {
    expect(content).toMatch(/`[^`]+`/);
  });

  it('should not have consecutive blank lines (more than 2 newlines in a row)', () => {
    expect(content).not.toMatch(/\n{4,}/);
  });
});
