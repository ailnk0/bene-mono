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

You can use `bene-mono-cli` to create a new monorepo from scratch or to add a new application to an existing monorepo.

### Creating a new monorepo

To create a new monorepo project, run the following command in an empty directory.

```bash
pnpm dlx bene-mono-cli
```

You will be prompted to select a template and enter a project name.

**Example**

```
$ pnpm dlx bene-mono-cli

? Select a template for the new monorepo: › - Use arrow-keys. Return to submit.
❯   Turbo v2 | Vite v7  | React v19 | Tailwind v4 | shadcn (Default)
    Turbo v2 | Vite v7  | React v19 | Tailwind v4 | shadcn | storybook
    Turbo v2 | Next v15 | React v19 | Tailwind v4 | shadcn

? Project name: › my-monorepo
```

### Adding a new app to an existing monorepo

If you run the same command inside an existing monorepo (one that contains a `pnpm-workspace.yaml` or `turbo.json` file), the CLI will help you add a new application.

```bash
pnpm dlx bene-mono-cli
```

The CLI detects the monorepo environment and prompts you to choose a template and name for your new app, which will be placed in the `apps` directory.

**Example**

```
$ cd <your-monorepo>
$ pnpm dlx bene-mono-cli

? Select a template for the new app: › - Use arrow-keys. Return to submit.
❯   Turbo v2 | Vite v7  | React v19 | Tailwind v4 | shadcn (Default)
    Turbo v2 | Vite v7  | React v19 | Tailwind v4 | shadcn | storybook
    Turbo v2 | Next v15 | React v19 | Tailwind v4 | shadcn

? What is the name of the new app? › my-app
```

## Templates

Currently available templates:

### Turbo v2 | Vite v7 | React v19 | Tailwind v4 | shadcn

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

### Turbo v2 | Next v15 | React v19 | Tailwind v4 | shadcn

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
