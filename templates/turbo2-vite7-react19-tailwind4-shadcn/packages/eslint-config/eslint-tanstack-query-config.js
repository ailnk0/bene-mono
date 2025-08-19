import pluginQuery from '@tanstack/eslint-plugin-query';

/** @type {import('eslint').Linter.Config[]} */
export const config = [...pluginQuery.configs['flat/recommended']];
