import nodePlugin from 'eslint-plugin-node';
import securityPlugin from 'eslint-plugin-security';

import { config as baseConfig } from './base.js';

/**
 * ESLint configuration for Node.js applications.
 *
 * @type {import("eslint").Linter.Config}
 */
export const config = [
  ...baseConfig,
  {
    plugins: {
      node: nodePlugin,
      security: securityPlugin,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        node: true,
        es6: true,
      },
    },
    rules: {
      'no-process-exit': 'error',
      'node/no-missing-import': 'off',
      'node/no-unpublished-import': 'off',
      'node/no-unsupported-features/es-syntax': [
        'error',
        { ignores: ['modules'] },
      ],
      'security/detect-non-literal-fs-filename': 'warn',
      'security/detect-eval-with-expression': 'error',
      'security/detect-no-csrf-before-method-override': 'error',
      'security/detect-possible-timing-attacks': 'warn',
    },
  },
  'plugin:node/recommended',
  'plugin:security/recommended',
];
