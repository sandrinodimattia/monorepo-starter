import { config as baseConfig } from '@repo/config-eslint/typescript-library';

export default [
  ...baseConfig,
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.test.json',
      },
    },
  },
  {
    files: ['./src/**/*.ts', './src/**/*.test.ts'],
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
  },
];
