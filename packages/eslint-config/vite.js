import pluginReactRefresh from "eslint-plugin-react-refresh";

import { importSortConfig } from "./import-sort.js";
import { config as reactConfig } from "./react-internal.js";
import { tanstackQueryConfig } from "./tanstack-query.js";

/**
 * A custom ESLint configuration for libraries that use Vite.
 *
 * @type {import("eslint").Linter.Config} */
export const viteConfig = [
  ...reactConfig,
  ...importSortConfig,
  ...tanstackQueryConfig,
  {
    plugins: {
      "react-refresh": pluginReactRefresh,
    },
    rules: {
      "react-refresh/only-export-components": "warn",
    },
  },
];
