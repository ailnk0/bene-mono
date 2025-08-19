import simpleImportSort from 'eslint-plugin-simple-import-sort';

/** @type {import('eslint').Linter.Config[]} */
export const config = [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react', '^@?\\w', '^src', '^\\./', '^\\../'],
            ['^.+\\.style$'],
            ['^.+\\.(gif|png|svg|jpg)$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },
];
