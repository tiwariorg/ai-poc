import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Run tests from the project root, not the Vite app subfolder
    root: '.',
    include: ['**/*.test.{js,ts,jsx,tsx}'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      'app/**',
    ],
    environment: 'node',
  },
});
