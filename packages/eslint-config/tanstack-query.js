import pluginTanstackQuery from '@tanstack/eslint-plugin-query';

/**
 * A custom ESLint configuration for projects that use Tanstack Query.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const tanstackQueryConfig = [
    ...pluginTanstackQuery.configs['flat/recommended'],
];
