/**
 * Vitest global test setup.
 *
 * Extends `expect` with custom jest-dom matchers such as:
 *   - toBeInTheDocument()
 *   - toHaveValue()
 *   - toBeVisible()
 *   - toHaveClass()
 *   - toBeDisabled()
 *   - toHaveTextContent()
 *   … and more
 *
 * This file is referenced by the `test.setupFiles` option in vite.config.ts
 * and is executed once before every test file.
 */
import '@testing-library/jest-dom';
