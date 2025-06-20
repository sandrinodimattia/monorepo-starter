# Monorepo Starter

A minimal boilerplate for a monorepo using Turborepo and TypeScript.

## Getting Started

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Build all packages:

   ```bash
   pnpm run build
   ```

3. Run the CLI:

   ```bash
   # From the root directory
   pnpm --filter=@repo/cli run start
   ```

4. Run the Web Application:

   ```bash
   # From the root directory
   pnpm --filter=@repo/web run dev
   ```

## Available Scripts

- `npm run build` - Build all packages
- `npm run dev` - Start development mode with watch
- `npm run lint` - Lint all packages
- `npm run test` - Run tests (when implemented)
- `npm run clean` - Clean all build outputs
- `npm run type-check` - Type check all packages
