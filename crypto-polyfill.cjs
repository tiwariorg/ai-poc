// Polyfill for Node 16 which does not expose crypto.getRandomValues as a global.
// Vite 5 / vitest 2 require this symbol at startup.
const { webcrypto } = require('crypto');
if (!globalThis.crypto) {
  globalThis.crypto = webcrypto;
} else if (typeof globalThis.crypto.getRandomValues !== 'function') {
  globalThis.crypto.getRandomValues = webcrypto.getRandomValues.bind(webcrypto);
}
