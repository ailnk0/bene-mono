import { config as importSortConfig } from '@workspace/eslint-config/import-sort';
import { config as tanstackQueryConfig } from '@workspace/eslint-config/tanstack-query';
import { config as viteConfig } from '@workspace/eslint-config/vite';

/** @type {import("eslint").Linter.Config} */
export default [...importSortConfig, ...tanstackQueryConfig, ...viteConfig];
