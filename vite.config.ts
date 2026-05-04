import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname in ESM context
const __dirname = fileURLToPath(new URL('.', import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Allows clean imports like: import Foo from '@/components/Foo'
      '@': resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: false,
    environmentMatchGlobs: [
      // React component tests use jsdom (already the default above)
      ['src/components/**/*.test.*', 'jsdom'],
      ['src/pages/**/*.test.*', 'jsdom'],
      ['src/hooks/**/*.test.*', 'jsdom'],
      ['src/context/**/*.test.*', 'jsdom'],
      ['src/App.test.*', 'jsdom'],
    ],
  },
});
