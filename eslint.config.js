import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

/**
 * ESLint flat configuration for the React + TypeScript + Vite project.
 *
 * Extends:
 *  - @eslint/js recommended rules
 *  - typescript-eslint strict + stylistic type-checked rule sets
 *  - eslint-plugin-react-hooks recommended rules
 *  - eslint-plugin-react-refresh (warns on non-component exports from
 *    files that React Fast Refresh needs to handle)
 *
 * Scope: all TypeScript / TSX files under `src/`.
 */
export default tseslint.config(
  // ── Globally ignored paths ─────────────────────────────────────────────
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'coverage/**',
      // Vite-generated declaration files
      'vite.config.d.ts',
      'vite.config.js',
      // Test files that live outside src/
      '*.test.js',
      '*.test.cjs',
      'crypto-polyfill.cjs',
    ],
  },

  // ── Base JS recommended rules ──────────────────────────────────────────
  js.configs.recommended,

  // ── TypeScript strict + stylistic (type-checked) ──────────────────────
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  // ── Project-wide settings ──────────────────────────────────────────────
  {
    files: ['**/*.{ts,tsx}'],

    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },

    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },

    rules: {
      // ── React Hooks ──────────────────────────────────────────────────
      ...reactHooks.configs.recommended.rules,

      // ── React Refresh ────────────────────────────────────────────────
      // Allow named exports alongside default component exports — common
      // pattern for exporting prop types from the same file.
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // ── TypeScript overrides ─────────────────────────────────────────
      // Allow void-returning arrow functions in JSX event handlers without
      // requiring an explicit `void` operator.
      '@typescript-eslint/no-confusing-void-expression': [
        'error',
        { ignoreArrowShorthand: true },
      ],

      // Unused vars rule: errors on unused vars, but allows vars prefixed
      // with `_` (common convention for intentionally unused parameters).
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      // Permit template literals that contain no expressions — sometimes
      // used for readability.
      '@typescript-eslint/no-useless-template-literals': 'off',

      // console.log is used intentionally in hook submission handlers for
      // debugging; silence the base rule entirely to avoid noise.
      'no-console': 'off',
    },
  },
);
