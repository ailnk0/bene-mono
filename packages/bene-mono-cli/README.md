# bene-mono-cli

[![npm version](https://img.shields.io/npm/v/bene-mono-cli.svg)](https://www.npmjs.com/package/bene-mono-cli)
[![license](https://img.shields.io/npm/l/bene-mono-cli.svg)](https://github.com/ailnk0/bene-mono/blob/main/LICENSE)

A CLI to generate modern monorepo setups.

This tool helps you quickly bootstrap a new monorepo project with pre-configured templates, including Turborepo, React, and popular frameworks like Vite or Next.js.

## Usage

To create a new monorepo project, run the following command. There is no need for a separate installation.

```bash
pnpm dlx bene-mono-cli
```

When you run the command, you will be prompted to select a template and enter a project name.

## Example

```
$ pnpm dlx bene-mono-cli

? Select a monorepo template: › - Use arrow-keys. Return to submit.
❯   Turbo v2 | Vite v7  | React v19 | Tailwind v4 | shadcn (Default)
    Turbo v2 | Next v15 | React v19 | Tailwind v4 | shadcn

? Project name: › my-monorepo

Creating a new project in C:\path\to\your\directory\my-monorepo...
Created a new turbo2-vite7-react19-tailwind4-shadcn.
```

## Templates

Currently available templates:

### 1. Turbo v2 | Vite v7 | React v19 | Tailwind v4 | shadcn

A frontend template using Vite and React in a Turborepo environment.

```
.
├── apps
│   └── web/          # Vite + React App
│       ├── src/
│       ├── index.html
│       └── package.json
├── packages
│   ├── eslint-config/
│   ├── typescript-config/
│   └── ui/           # Shared React components (shadcn/ui)
│       ├── components/
│       └── package.json
├── package.json      # Root package.json
└── turbo.json
```

### 2. Turbo v2 | Next v15 | React v19 | Tailwind v4 | shadcn

A full-stack/frontend template using Next.js in a Turborepo environment.

```
.
├── apps
│   └── web/          # Next.js App
│       ├── app/
│       ├── components/
│       └── package.json
├── packages
│   ├── eslint-config/
│   ├── typescript-config/
│   └── ui/           # Shared React components (shadcn/ui)
│       ├── components/
│       └── package.json
├── package.json      # Root package.json
└── turbo.json
```

## ESLint Configuration (`@workspace/eslint-config`)

### 1. Turbo v2 | Vite v7 | React v19 | Tailwind v4 | shadcn

#### Usage

To use this shared configuration in other apps or packages within the monorepo, import the `base` config in your project's `eslint.config.js` file:

```javascript
import baseConfig from '@workspace/eslint-config/base';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...baseConfig,
  // ... add any project-specific rules here
];
```

#### Core Concept

The main configuration file, `eslint.config.js`, acts as an aggregator. It imports several smaller, specialized configuration files (`eslint-*-config.js`) and merges them into a single array. This approach, known as "flat config," makes the configuration modular, easier to understand, and more maintainable.

#### Configuration File Details

##### `eslint.config.js`

This is the main entry point for the package. It assembles the final ESLint configuration by combining the individual configs listed below.

```javascript
import tanstackQueryConfig from './eslint-tanstack-query-config.js';
import turboConfig from './eslint-turbo-config.js';
import uiConfig from './eslint-ui-config.js';
import viteConfig from './eslint-vite-config.js';

/** @type {import("eslint").Linter.Config} */
export default [...turboConfig, ...viteConfig, ...tanstackQueryConfig, ...uiConfig];
```

##### `eslint-vite-config.js`

This is the core ESLint configuration for a Vite, TypeScript, and React-based project. It includes the following plugins and configurations:

- `@eslint/js`: Basic recommended JavaScript rules.
- `typescript-eslint`: Recommended rules for TypeScript.
- `eslint-plugin-react-hooks`: Enforces the rules of React Hooks.
- `eslint-plugin-react-refresh`: Rules for the React Refresh (Fast Refresh) feature in a Vite environment.

##### `eslint-turbo-config.js`

This configuration is specialized for a Turborepo monorepo environment.

- `eslint-config-prettier`: Disables ESLint's stylistic rules that might conflict with Prettier.
- `eslint-plugin-turbo`: Applies rules related to Turborepo, such as caching and environment variable usage (`turbo/no-undeclared-env-vars`).
- `eslint-plugin-only-warn`: Downgrades ESLint errors to warnings during development to avoid interrupting the workflow.

##### `eslint-tanstack-query-config.js`

Applies the recommended rules for using TanStack Query (React Query) via `@tanstack/eslint-plugin-query`.

##### `eslint-ui-config.js`

Sets override rules specifically for UI component library packages like `@workspace/ui`.

- `react-refresh/only-export-components`: `'off'`
  - This rule is disabled because UI packages often export utility functions, types, and other values alongside components. Turning it off allows for more flexible exports.

##### `eslint-import-sort-config.js`

This file configures the `eslint-plugin-simple-import-sort` plugin to enforce a consistent order for `import` statements. It groups imports (e.g., external libraries, internal monorepo packages, relative paths) to improve readability.

**Note:** This feature is optional and not enabled by default. Follow the steps below to activate it.

**How to Enable Auto-sorting on Save**

To automatically sort your imports every time you save a file in VS Code, follow these two steps:

**Step 1: Activate the ESLint Configuration**

Modify `packages/eslint-config/eslint.config.js` to include the import sorting rules.

```javascript
import tanstackQueryConfig from './eslint-tanstack-query-config.js';
import turboConfig from './eslint-turbo-config.js';
import uiConfig from './eslint-ui-config.js';
import viteConfig from './eslint-vite-config.js';
import importSortConfig from './eslint-import-sort-config.js'; // 1. Add this line

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

## TypeScript Configuration (`@workspace/typescript-config`)

### 1. Turbo v2 | Vite v7 | React v19 | Tailwind v4 | shadcn

#### Usage

This monorepo uses a "solution-style" `tsconfig.json` at the project level (e.g., `apps/web/tsconfig.json`). This root file typically doesn't include source files directly but uses `references` to point to more specific configurations for different environments, like the application source code and Node.js-specific files.

Shared path aliases like `@/*` and `@workspace/ui/*` are also defined here.

#### Project Root Configuration (`apps/web/tsconfig.json`)

This is an example of a typical root `tsconfig.json` in a project using this template. It references the two specific configs for app and node environments.

```json
{
  // This root config doesn't compile files itself, hence `files` is empty.
  "files": [],
  // It points to the actual projects that TypeScript should analyze.
  "references": [{ "path": "./tsconfig.app.json" }, { "path": "./tsconfig.node.json" }],
  "compilerOptions": {
    // Sets the base directory for resolving non-relative module names.
    "baseUrl": ".",
    // Creates path aliases for easier importing.
    "paths": {
      "@/*": ["./src/*"],
      "@workspace/ui/*": ["../../packages/ui/src/*"]
    }
  }
}
```

#### Extending Shared Configurations

The specific configuration files (`tsconfig.app.json` and `tsconfig.node.json`) are the ones that actually `extend` the shared configs from this package.

#### For Application Code (`apps/web/tsconfig.app.json`)

This file should extend `tsconfig.app.json` for browser-based application code.

```json
{
  // Inherits the base configuration from the shared package.
  "extends": "@workspace/typescript-config/tsconfig.app.json",
  "compilerOptions": {
    // Specifies a file to store incremental build information, speeding up subsequent compiles.
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    // Base URL for path resolution.
    "baseUrl": ".",
    // Path aliases specific to this project.
    "paths": {
      "@/*": ["./src/*"],
      "@workspace/ui/*": ["../../packages/ui/src/*"]
    }
  },
  // Specifies that only files in the `src` directory are part of this project.
  "include": ["src"]
}
```

#### For Node.js Environment Code (`apps/web/tsconfig.node.json`)

This file should extend `tsconfig.node.json` for Node.js-specific files.

```json
{
  // Inherits the Node.js-specific configuration.
  "extends": "@workspace/typescript-config/tsconfig.node.json",
  "compilerOptions": {
    // Separate build info file for the Node.js environment build.
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo"
  },
  // Includes only the vite.config.ts file for this specific configuration.
  "include": ["vite.config.ts"]
}
```

#### Shared Configurations

##### `tsconfig.app.json`

This is the base configuration for **browser-based application code**.

- **Environment**: Targets modern browsers (`target: ES2022`) and includes `DOM` libraries.
- **JSX**: Configured for the modern React JSX transform (`jsx: react-jsx`).
- **Module Resolution**: Uses `"bundler"` mode, which is optimized for modern bundlers like Vite and webpack.
- **Linting**: Enforces `strict` mode and other rules (`noUnusedLocals`, `noUnusedParameters`) for high code quality.

##### `tsconfig.node.json`

This is a stricter configuration for files that **run in a Node.js environment**.

- **Environment**: Targets a modern version of Node.js (`target: ES2023`) and does **not** include `DOM` libraries.
- **JSX**: JSX support is not included.
- **Module Resolution**: Also uses `"bundler"` mode.
- **Linting**: Enforces the same `strict` type-checking rules as the app configuration.

## License

This project is licensed under the [MIT License](https://github.com/ailnk0/bene-mono/blob/main/LICENSE).
