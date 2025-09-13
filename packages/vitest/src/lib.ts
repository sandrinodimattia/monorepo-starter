import { defineConfig } from 'vitest/config';

export const config = defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'dist/', '**/*.d.ts', '**/vitest.config.ts', '**/coverage/**'],
    },
  },
  resolve: {
    extensions: ['.ts'],
  },
});
