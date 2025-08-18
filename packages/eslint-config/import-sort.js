import pluginImportSort from 'eslint-plugin-simple-import-sort';

/**
 * A custom ESLint configuration for sorting imports.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const importSortConfig = [
    {
        plugins: {
            'simple-import-sort': pluginImportSort,
        },
        rules: {
            'simple-import-sort/imports': [
                'error',
                {
                    groups: [
                        ['^react', '^@?\w', '^src', '^\./', '^\../'],
                        ['^.+\.style$'],
                        ['^.+\.(gif|png|svg|jpg)$'],
                    ],
                },
            ],
            'simple-import-sort/exports': 'error',
        },
    },
];
