import nodePlugin from 'eslint-plugin-n';

import { config as baseConfig } from './base.js';

/**
 * ESLint configuration for Node.js applications.
 *
 * @type {import("eslint").Linter.Config}
 */
export const config = [
  ...baseConfig,
  nodePlugin.configs['flat/recommended-script'],
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        node: true,
        es6: true,
      },
    },
    rules: {
      'no-process-exit': 'off',
      'n/no-missing-import': 'off',
      'n/no-unpublished-import': 'off',
      'security/detect-non-literal-fs-filename': 'warn',
      'security/detect-eval-with-expression': 'error',
      'security/detect-no-csrf-before-method-override': 'error',
      'security/detect-possible-timing-attacks': 'warn',
    },
  },
];
