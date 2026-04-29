import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./src/test/setup.ts'],
    css: false,
    environmentMatchGlobs: [
      // React component tests need jsdom
      ['src/components/**/*.test.*', 'jsdom'],
      ['src/pages/**/*.test.*', 'jsdom'],
      ['src/hooks/**/*.test.*', 'jsdom'],
      ['src/context/**/*.test.*', 'jsdom'],
      ['src/App.test.*', 'jsdom'],
    ],
  },
});
