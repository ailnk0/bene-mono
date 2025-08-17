# bene-mono-cli

[![npm version](https://img.shields.io/npm/v/bene-mono-cli.svg)](https://www.npmjs.com/package/bene-mono-cli)
[![license](https://img.shields.io/npm/l/bene-mono-cli.svg)](https://github.com/ailnk0/bene-mono/blob/main/LICENSE)

A CLI to generate modern monorepo setups.

This tool helps you quickly bootstrap a new monorepo project with pre-configured templates, including Turborepo, React, and popular frameworks like Vite or Next.js.

## Usage

To create a new monorepo project, run the following command. There is no need for a separate installation.

```bash
pnpm dlx bene-mono-cli init
```

When you run the command, you will be prompted to select a template and enter a project name.

## Example

```
$ pnpm dlx bene-mono-cli init

? Select a monorepo template: › - Use arrow-keys. Return to submit.
❯   Turbo v2 | Vite v7  | React v19 | shadcn v4 (Default)
    Turbo v2 | Next v15 | React v19 | shadcn v4

? Project name: › my-monorepo

Creating a new project in C:\path\to\your\directory\my-monorepo...
Created a new turbo2-vite7-react19-shadcn4.
```

## Templates

Currently available templates:

1.  **Turbo v2 | Vite v7 | React v19 | shadcn v4**: A frontend template using Vite and React in a Turborepo V2 environment.
2.  **Turbo v2 | Next v15 | React v19 | shadcn v4**: A full-stack/frontend template using Next.js in a Turborepo V2 environment.

Each template provides a ready-to-use monorepo structure managed by Turborepo.

### 1. Turbo v2 | Next v15 | React v19 | shadcn v4

A full-stack template using Next.js for the web application.

```
.
├── apps
│   └── web/          # Next.js 15 App
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

### 2. Turbo v2 | Vite v7 | React v19 | shadcn v4

A frontend-focused template using Vite for a fast development experience.

```
.
├── apps
│   └── web/          # Vite + React 19 App
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

## License

This project is licensed under the [MIT License](https://github.com/ailnk0/bene-mono/blob/main/LICENSE).
