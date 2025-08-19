import { config as viteConfig } from './eslint-vite-config.js';

/** @type {import('eslint').Linter.Config[]} */
export const config = [
  ...viteConfig,
  {
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
];
