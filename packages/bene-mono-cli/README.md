# bene-mono-cli

[![npm version](https://img.shields.io/npm/v/bene-mono-cli.svg)](https://www.npmjs.com/package/bene-mono-cli)
[![license](https://img.shields.io/npm/l/bene-mono-cli.svg)](https://github.com/ailnk0/bene-mono/blob/main/LICENSE)

A CLI to generate monorepo setups.

This tool helps you quickly bootstrap a new monorepo project with pre-configured templates, including Turborepo, React, and popular frameworks like Vite or Next.js.

## Features

- **Monorepo Ready**: Powered by Turborepo for high-performance builds.
- **Modern Frameworks**: Choose between Vite or Next.js for your application.
- **React 19**: Start with the latest version of React.
- **Tailwind CSS 4**: Styled with the next generation of Tailwind CSS.
- **Shared UI**: Includes a shared UI package using `shadcn/ui`.
- **Pre-configured**: Comes with ESLint, Prettier, and TypeScript configurations out of the box.

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

A frontend template using Vite and React in a Turborepo environment. For a detailed guide on the ESLint and TypeScript setup, please see the template's `README.md` file.

```
.
├── apps
│   └── web/          # Vite + React App
├── packages
│   ├── eslint-config/
│   ├── typescript-config/
│   └── ui/           # Shared React components (shadcn/ui)
└── turbo.json
```

### 2. Turbo v2 | Next v15 | React v19 | Tailwind v4 | shadcn

A full-stack/frontend template using Next.js in a Turborepo environment.

```
.
├── apps
│   └── web/          # Next.js App
├── packages
│   ├── eslint-config/
│   ├── typescript-config/
│   └── ui/           # Shared React components (shadcn/ui)
└── turbo.json
```

## License

This project is licensed under the [MIT License](https://github.com/ailnk0/bene-mono/blob/main/LICENSE).
