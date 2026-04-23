# Visual Review & Responsiveness Test Plan

**Ticket:** KAN-11  
**File under test:** `index.html`  
**Test type:** Manual visual review  
**Tech stack:** Plain HTML + CSS (no JavaScript, no build toolchain)  
**Deployment:** GitHub Pages (via `static.yml` workflow)

---

## Overview

Because this project is a static, no-JavaScript HTML page, automated browser rendering
tests are out of scope. This document defines the **manual visual review checklist** that
a reviewer must complete before marking the ticket done. Each item maps directly to an
observable characteristic of the rendered page.

Work through the checklist at each of the three target viewports listed in
[§ Viewport Configurations](#viewport-configurations). Mark every checkbox, note any
failures in [§ Issue Log](#issue-log), and sign off at the bottom when all items pass.

---

## How to Open the Page

| Method | Command / URL |
|---|---|
| **Local file** | Open `index.html` directly in the browser (`File › Open…` or drag-and-drop) |
| **Local server** | `npx serve .` then visit `http://localhost:3000` |
| **GitHub Pages** | Visit the URL published by the `Deploy static content to Pages` workflow |

> **Tip:** Open DevTools (`F12`) → **Device Toolbar** (`Ctrl/Cmd + Shift + M`) to simulate
> tablet and mobile viewports without a physical device.

---

## Viewport Configurations

| Label | Width | Height | DevTools Preset |
|---|---|---|---|
| **Desktop** | 1440 px | 900 px | Responsive → set W: 1440 |
| **Tablet** | 768 px | 1024 px | iPad Mini (or set W: 768) |
| **Mobile** | 375 px | 812 px | iPhone SE / iPhone 12 Pro |

---

## Checklist

Complete all items at **every viewport** unless a check is explicitly labelled
*"any viewport"* — those only need to be verified once.

---

### 1 — Content & Layout

- [ ] **1.1 — "Hello World" heading is present**  
  An `<h1>` element containing the text **Hello World** is visible on the page.  
  _Expected:_ Large, prominent heading rendered in Playfair Display (or system serif fallback).

- [ ] **1.2 — Heading is horizontally and vertically centred**  
  The heading (and its card container) appear centred both horizontally and vertically
  within the full viewport height.  
  _Expected:_ Card sits at the visual midpoint of the screen with equal space above and below.

- [ ] **1.3 — Subtitle / tagline is visible below the heading**  
  The paragraph **"Welcome to something beautiful."** (`.tagline`) is rendered beneath the
  `<h1>` and the decorative divider.  
  _Expected:_ Lighter-weight text in a muted grey colour, clearly legible.

- [ ] **1.4 — Decorative divider is rendered between heading and tagline**  
  A centred divider consisting of two gradient lines flanking a small dot appears between
  the `<h1>` and the `.tagline`.  
  _Expected:_ Symmetrical, subtle; does not overwhelm surrounding content.

---

### 2 — Background

- [ ] **2.1 — Gradient background covers the full viewport**  
  The `linear-gradient(135deg, #667eea 0%, #764ba2 100%)` background fills the entire
  browser viewport — no white gaps at any edge, including when scrolling is absent.  
  _Expected:_ Smooth diagonal transition from blue-violet (`#667eea`) at top-left to deep
  purple (`#764ba2`) at bottom-right. No solid-colour fallback visible.

- [ ] **2.2 — Gradient is confirmed via DevTools (any viewport)**  
  In DevTools → **Elements** panel, select `.hero` and inspect the **Styles** pane.  
  _Expected:_ `background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)` is listed
  and the colour swatches match the on-screen rendering.

---

### 3 — Card Container

- [ ] **3.1 — Card has visible rounded corners**  
  The white/translucent card container has clearly rounded corners on all four sides.  
  _Expected:_ `border-radius: 1.5rem` — corners are noticeably curved, not sharp.

- [ ] **3.2 — Card has a visible box-shadow**  
  The card appears to float above the gradient background with a soft drop-shadow beneath it.  
  _Expected:_ `box-shadow: 0 25px 50px rgba(0,0,0,0.15)` — shadow is visible but not
  harsh; it gives the card clear depth.

- [ ] **3.3 — Card background is near-white / semi-translucent**  
  The card face is rendered in `rgba(255, 255, 255, 0.95)` — effectively white with a
  very slight translucency that may hint at the purple gradient behind it.  
  _Expected:_ Card is predominantly white; text inside is fully legible.

---

### 4 — Animation

- [ ] **4.1 — Fade-in animation plays on initial page load**  
  Immediately after the page loads (or after a hard-refresh with cache cleared), the card
  animates into view.  
  _Expected:_ Card starts invisible and slightly below its final position, then fades in
  and slides upward over ~1 second (`fadeInUp` keyframe animation, `ease-out` timing,
  `forwards` fill mode). Card is fully visible and stationary once the animation ends.

- [ ] **4.2 — Card is fully visible after animation completes**  
  After the 1 s animation finishes the card remains at `opacity: 1` and
  `transform: translateY(0)`.  
  _Expected:_ No flicker, no disappearance; the card stays visible indefinitely.

- [ ] **4.3 — Animation re-plays on hard refresh (any viewport)**  
  Hard-refresh the page (`Ctrl/Cmd + Shift + R`) and observe the card.  
  _Expected:_ Animation plays from the start again on every fresh page load.

---

### 5 — Typography

- [ ] **5.1 — Heading uses Playfair Display or serif fallback**  
  The `<h1>` is rendered in the **Playfair Display** typeface (loaded via Google Fonts
  `@import`). If the network request fails the system default serif font is used as
  fallback.  
  _Verification:_ In DevTools → **Elements** → select `<h1>` → **Computed** tab → search
  `font-family`. Confirm value starts with `"Playfair Display"` or a serif fallback.

- [ ] **5.2 — Body text uses Inter or sans-serif fallback**  
  The `.tagline` paragraph is rendered in **Inter** (loaded via Google Fonts). If the
  network request fails, the system default sans-serif font is used.  
  _Verification:_ Select `.tagline` in DevTools → **Computed** → `font-family` starts
  with `"Inter"` or a sans-serif fallback.

- [ ] **5.3 — Typography is clean and modern**  
  Both typefaces render crisply; text is anti-aliased; letter-spacing and line-height feel
  spacious and contemporary.  
  _Expected:_ No pixelated, jagged, or excessively heavy text rendering.

- [ ] **5.4 — Google Fonts network requests succeed (any viewport)**  
  Open DevTools → **Network** tab → filter by **Font**. Reload the page.  
  _Expected:_ Requests to `fonts.googleapis.com` and/or `fonts.gstatic.com` return
  HTTP `200` (or `304`). If offline, confirm that fallback fonts still render readably.

---

### 6 — Responsive Behaviour

#### 6.1 Desktop (1440 px+)

- [ ] **6.1.1 — Card is horizontally centred with comfortable padding**  
  At 1440 px width the card does not stretch full-width; it is constrained to `max-width:
  600px` and sits in the centre of the viewport.  
  _Expected:_ Generous space on either side of the card; card padding is `3rem 4rem`.

- [ ] **6.1.2 — Heading font size is ~3.5 rem**  
  The `<h1>` renders at its default desktop size (`font-size: 3.5rem`).  
  _Verification:_ DevTools → **Computed** → `font-size` ≈ `56 px` (at 16 px base).

- [ ] **6.1.3 — No horizontal scrollbar**  
  The page does not trigger a horizontal scrollbar at 1440 px viewport width.

#### 6.2 Tablet (768 px)

- [ ] **6.2.1 — Heading font size scales down to ~2.5 rem**  
  The `@media (max-width: 768px)` breakpoint reduces `<h1>` to `font-size: 2.5rem`.  
  _Verification:_ DevTools Computed → `font-size` ≈ `40 px`.

- [ ] **6.2.2 — Card padding adjusts to `2rem 1.5rem`**  
  At 768 px the card inner padding is reduced to give the content more room.  
  _Verification:_ DevTools → **Box Model** diagram shows `32px` top/bottom, `24px`
  left/right padding.

- [ ] **6.2.3 — Card fits within the viewport width**  
  The card does not overflow the 768 px viewport; `width: 100%` with `max-width: 600px`
  keeps it contained.  
  _Expected:_ Card has a small visual margin on each side at this viewport.

- [ ] **6.2.4 — No horizontal scroll at 768 px**  
  Scroll the page horizontally — no content bleeds beyond the viewport edge.

#### 6.3 Mobile (375 px)

- [ ] **6.3.1 — Heading font size scales down to ~2 rem**  
  The `@media (max-width: 480px)` breakpoint reduces `<h1>` to `font-size: 2rem`.  
  _Verification:_ DevTools Computed → `font-size` ≈ `32 px`.

- [ ] **6.3.2 — Tagline font size scales down to ~1 rem**  
  The `.tagline` reduces to `font-size: 1rem` at the 480 px breakpoint.  
  _Verification:_ DevTools Computed → `font-size` ≈ `16 px`.

- [ ] **6.3.3 — Text is fully readable at 375 px**  
  All text (heading and tagline) is large enough to read without zooming; contrast against
  the white card background is sufficient.

- [ ] **6.3.4 — Card fits within the 375 px viewport with visible padding**  
  The card fills the available width with `width: 100%` while retaining the reduced
  `2rem 1.5rem` padding so text does not sit flush against the card edges.

- [ ] **6.3.5 — No horizontal scroll at 375 px**  
  The most critical responsiveness check. Swipe or scroll horizontally — **zero** content
  should extend beyond the viewport.  
  _Verification:_ DevTools → **Console** → run `document.documentElement.scrollWidth >
  document.documentElement.clientWidth` — must return `false`.

---

### 7 — Source Code Verification (any viewport)

These checks require viewing the page source (`Ctrl/Cmd + U` or DevTools → Sources).

- [ ] **7.1 — No JavaScript is used**  
  Inspect the full source of `index.html`.  
  _Expected:_ **No `<script>` tags** anywhere in the file. The test suite in
  `index.html.test.js` also asserts this programmatically.

- [ ] **7.2 — No external JS files are loaded**  
  DevTools → **Network** tab → filter by **JS**.  
  _Expected:_ Zero JavaScript resources are fetched.

- [ ] **7.3 — All CSS is within a `<style>` block in the HTML file**  
  Inspect the `<head>` section of the source.  
  _Expected:_ A single `<style>` block contains all CSS rules. No `<link rel="stylesheet">`
  to an external `.css` file exists (the Google Fonts `@import` inside the `<style>` block
  is acceptable).

- [ ] **7.4 — No inline `style` attributes on any element**  
  Search the source for `style=` — none should appear.  
  _Verification:_ `Ctrl/Cmd + F` in view-source → search `style=` → 0 results.

- [ ] **7.5 — Valid HTML5 DOCTYPE is declared**  
  First line of the file is `<!DOCTYPE html>` (case-insensitive).

- [ ] **7.6 — `<html lang="en">` is set**  
  The `<html>` element includes `lang="en"` for accessibility and correct font rendering.

---

## Accessibility Spot-Checks (any viewport)

- [ ] **A.1 — Decorative divider is hidden from assistive technology**  
  The `.divider` element has `aria-hidden="true"` so screen readers skip it.  
  _Verification:_ Source contains `aria-hidden="true"` on the divider `<div>`.

- [ ] **A.2 — Colour contrast passes WCAG AA for normal text**  
  Use the DevTools colour picker or [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/).  
  _Expected:_  
  - `<h1>` colour `#2d3748` on white (`#ffffff`) → contrast ratio **≥ 4.5 : 1** ✓  
  - `.tagline` colour `#718096` on white (`#ffffff`) → contrast ratio **≥ 4.5 : 1** ✓

- [ ] **A.3 — Page title is meaningful**  
  Browser tab / window title reads **"Hello World"**.

---

## Issue Log

Use this table to record any failures found during the review session.

| # | Viewport | Check ID | Observed behaviour | Severity |
|---|---|---|---|---|
| — | — | — | — | — |

_Severity scale: **P1** critical / **P2** major / **P3** minor / **P4** cosmetic_

---

## Sign-off

| Role | Name | Date | Result |
|---|---|---|---|
| Reviewer | | | ☐ Pass &nbsp; ☐ Fail |

All checklist items must be marked **☑** (pass) before this test plan is considered
complete. Any **P1** or **P2** issue must be resolved and re-tested before sign-off.

---

## Reference: CSS Properties Under Test

The table below maps each checklist section to the specific CSS declarations in
`index.html` that produce the expected visual output.

| Check | CSS selector | Property / value |
|---|---|---|
| 1.2 Centred layout | `.hero` | `display: flex; justify-content: center; align-items: center; min-height: 100vh` |
| 2.1 Gradient background | `.hero` | `background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)` |
| 3.1 Rounded corners | `.card` | `border-radius: 1.5rem` |
| 3.2 Box-shadow | `.card` | `box-shadow: 0 25px 50px rgba(0,0,0,0.15)` |
| 4.1 Fade-in animation | `.card` | `animation: fadeInUp 1s ease-out forwards` |
| 5.1 Heading typeface | `h1` | `font-family: 'Playfair Display', serif` |
| 5.2 Body typeface | `body` | `font-family: 'Inter', sans-serif` |
| 6.1.1 Max card width | `.card` | `max-width: 600px; width: 100%` |
| 6.1.2 Desktop h1 size | `h1` | `font-size: 3.5rem` |
| 6.2.1 Tablet h1 size | `@media (max-width: 768px) h1` | `font-size: 2.5rem` |
| 6.2.2 Tablet card padding | `@media (max-width: 768px) .card` | `padding: 2rem 1.5rem` |
| 6.3.1 Mobile h1 size | `@media (max-width: 480px) h1` | `font-size: 2rem` |
| 6.3.2 Mobile tagline size | `@media (max-width: 480px) .tagline` | `font-size: 1rem` |
