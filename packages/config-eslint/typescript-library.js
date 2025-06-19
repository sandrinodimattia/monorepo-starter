import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import { config as baseConfig } from './base.js';

/**
 * ESLint configuration for TypeScript libraries.
 *
 * @type {import("eslint").Linter.Config}
 */
export const config = [
  ...baseConfig,
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    plugins: {
      import: importPlugin,
    },
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      'import/no-unresolved': 'error',
    },
  },
];
