/**
 * tailwind.config.js — KAN-12
 *
 * Tailwind CSS v4 configuration.
 *
 * In v4, content scanning and most configuration is handled automatically by
 * the @tailwindcss/vite plugin declared in vite.config.ts.  This file exists
 * for explicitness and to allow project-level customisation (theme extensions,
 * plugins) as the project grows.
 *
 * Content paths:
 *   • ./index.html           — Vite HTML entry point
 *   • ./src/** /*.{js,ts,jsx,tsx} — all React source files
 *
 * Note: In Tailwind CSS v4, CSS-first configuration via @import 'tailwindcss'
 * in src/index.css is the primary approach.  The @tailwindcss/vite plugin
 * automatically detects and processes this file.  Theme customisations can
 * also be applied via @theme blocks directly in CSS.
 *
 * @see https://tailwindcss.com/docs/configuration
 */

/** @type {import('tailwindcss').Config} */
export default {
  // ---------------------------------------------------------------------------
  // Content — files Tailwind scans for class usage
  // ---------------------------------------------------------------------------
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],

  // ---------------------------------------------------------------------------
  // Theme — extend the default Tailwind design tokens
  // ---------------------------------------------------------------------------
  theme: {
    extend: {},
  },

  // ---------------------------------------------------------------------------
  // Plugins — add first-party or third-party Tailwind plugins here
  // ---------------------------------------------------------------------------
  plugins: [],
};
