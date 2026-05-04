/**
 * postcss.config.js — KAN-12
 *
 * PostCSS configuration for Tailwind CSS v4.
 *
 * When using the @tailwindcss/vite plugin (declared in vite.config.ts),
 * PostCSS processing inside Vite is handled natively by the plugin — this
 * file is not required for the Vite dev server or build pipeline.
 *
 * This config exists for tooling that invokes PostCSS directly outside of
 * Vite (e.g., editors, CSS linters, CI pipelines, or future integrations).
 *
 * Plugins:
 *   • @tailwindcss/postcss — Tailwind CSS v4's PostCSS plugin (replaces the
 *     v3 `tailwindcss` PostCSS plugin).
 *   • autoprefixer         — Automatically adds vendor prefixes for broader
 *     browser compatibility.
 *
 * @see https://tailwindcss.com/docs/installation/using-postcss
 */
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};
