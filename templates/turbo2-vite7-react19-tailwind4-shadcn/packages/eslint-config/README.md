# `@workspace/eslint-config`

This package provides a shared ESLint configuration for the entire workspace. It is designed to be a guide for anyone using this monorepo template.

## Usage

To use this shared configuration in other apps or packages within the monorepo, import the `base` config in your project's `eslint.config.js` file:

```javascript
import baseConfig from '@workspace/eslint-config/base';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...baseConfig,
  // ... add any project-specific rules here
];
```

## Core Concept

The main configuration file, `eslint.config.js`, acts as an aggregator. It imports several smaller, specialized configuration files (`eslint-*-config.js`) and merges them into a single array. This approach, known as "flat config," makes the configuration modular, easier to understand, and more maintainable.

## Configuration File Details

### `eslint.config.js`

This is the main entry point for the package. It assembles the final ESLint configuration by combining the individual configs listed below.

```javascript
import tanstackQueryConfig from './eslint-tanstack-query-config.js';
import turboConfig from './eslint-turbo-config.js';
import uiConfig from './eslint-ui-config.js';
import viteConfig from './eslint-vite-config.js';

/** @type {import("eslint").Linter.Config} */
export default [...turboConfig, ...viteConfig, ...tanstackQueryConfig, ...uiConfig];
```

### `eslint-vite-config.js`

This is the core ESLint configuration for a Vite, TypeScript, and React-based project. It includes the following plugins and configurations:

- `@eslint/js`: Basic recommended JavaScript rules.
- `typescript-eslint`: Recommended rules for TypeScript.
- `eslint-plugin-react-hooks`: Enforces the rules of React Hooks.
- `eslint-plugin-react-refresh`: Rules for the React Refresh (Fast Refresh) feature in a Vite environment.

### `eslint-turbo-config.js`

This configuration is specialized for a Turborepo monorepo environment.

- `eslint-config-prettier`: Disables ESLint's stylistic rules that might conflict with Prettier.
- `eslint-plugin-turbo`: Applies rules related to Turborepo, such as caching and environment variable usage (`turbo/no-undeclared-env-vars`).
- `eslint-plugin-only-warn`: Downgrades ESLint errors to warnings during development to avoid interrupting the workflow.

### `eslint-tanstack-query-config.js`

Applies the recommended rules for using TanStack Query (React Query) via `@tanstack/eslint-plugin-query`.

### `eslint-ui-config.js`

Sets override rules specifically for UI component library packages like `@workspace/ui`.

- `react-refresh/only-export-components`: `'off'`
  - This rule is disabled because UI packages often export utility functions, types, and other values alongside components. Turning it off allows for more flexible exports.

### `eslint-import-sort-config.js`

This file configures the `eslint-plugin-simple-import-sort` plugin to enforce a consistent order for `import` statements. It groups imports (e.g., external libraries, internal monorepo packages, relative paths) to improve readability.

**Note:** This feature is optional and not enabled by default. Follow the steps below to activate it.

#### How to Enable Auto-sorting on Save

To automatically sort your imports every time you save a file in VS Code, follow these two steps:

**Step 1: Activate the ESLint Configuration**

Modify `packages/eslint-config/eslint.config.js` to include the import sorting rules.

```javascript
import importSortConfig from './eslint-import-sort-config.js'; // 1. Add this line
import tanstackQueryConfig from './eslint-tanstack-query-config.js';
import turboConfig from './eslint-turbo-config.js';
import uiConfig from './eslint-ui-config.js';
import viteConfig from './eslint-vite-config.js';

/** @type {import("eslint").Linter.Config} */
export default [
  ...turboConfig,
  ...viteConfig,
  ...tanstackQueryConfig,
  ...uiConfig,
  ...importSortConfig, // 2. Add this line
];
```

**Step 2: Configure VS Code Settings**

Modify the `.vscode/settings.json` file at the root of the project to include the following content. This tells the VS Code ESLint extension to automatically fix issues, including import order, upon saving.

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "editor.formatOnSave": true
}
```

Once both steps are completed, imports will be sorted automatically when you save a file.
