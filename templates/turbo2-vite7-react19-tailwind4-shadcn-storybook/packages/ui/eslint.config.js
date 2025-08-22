import storybook from 'eslint-plugin-storybook';

import baseConfig from '@workspace/eslint-config/base';

/** @type {import("eslint").Linter.Config} */
export default [...baseConfig, ...storybook.configs['flat/recommended']];
