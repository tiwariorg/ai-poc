/// <reference types="vite/client" />

/**
 * Type declarations for CSS Modules.
 * Allows TypeScript to resolve `import styles from '*.module.css'`
 * without errors, treating each exported key as a string class name.
 */
declare module '*.module.css' {
  const classes: Record<string, string>;
  export default classes;
}
