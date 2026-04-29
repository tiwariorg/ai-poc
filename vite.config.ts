import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use app/index.html as the Vite entry point so the existing root index.html
  // (a static Hello World page with its own test suite) is left untouched.
  root: resolve(__dirname, 'app'),
  resolve: {
    alias: {
      // Allow clean imports like: import Foo from '@/components/Foo'
      '@': resolve(__dirname, 'app/src'),
    },
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
  server: {
    open: '/index.html',
  },
});
