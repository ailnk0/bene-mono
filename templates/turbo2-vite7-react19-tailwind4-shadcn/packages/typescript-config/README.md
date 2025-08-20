# `@workspace/typescript-config`

This package provides shared TypeScript `tsconfig.json` files for use across the monorepo. Using these shared configs ensures consistency and simplifies project setup.

## Usage

This monorepo uses a "solution-style" `tsconfig.json` at the project level (e.g., `apps/web/tsconfig.json`). This root file typically doesn't include source files directly but uses `references` to point to more specific configurations for different environments, like the application source code and Node.js-specific files.

Shared path aliases like `@/*` and `@workspace/ui/*` are also defined here.

### Project Root Configuration (`apps/web/tsconfig.json`)

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

### Extending Shared Configurations

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

## Available Configurations

### `tsconfig.app.json`

This is the base configuration for **browser-based application code**.

- **Environment**: Targets modern browsers (`target: ES2022`) and includes `DOM` libraries.
- **JSX**: Configured for the modern React JSX transform (`jsx: react-jsx`).
- **Module Resolution**: Uses `"bundler"` mode, which is optimized for modern bundlers like Vite and webpack.
- **Linting**: Enforces `strict` mode and other rules (`noUnusedLocals`, `noUnusedParameters`) for high code quality.

### `tsconfig.node.json`

This is a stricter configuration for files that **run in a Node.js environment**.

- **Environment**: Targets a modern version of Node.js (`target: ES2023`) and does **not** include `DOM` libraries.
- **JSX**: JSX support is not included.
- **Module Resolution**: Also uses `"bundler"` mode.
- **Linting**: Enforces the same `strict` type-checking rules as the app configuration.
