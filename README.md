# Example of a Modern Monorepo

This is an example of a modern monorepo using PNPM, Node.js 24, Turbo, TypeScript and Biome.

## Getting Started

### Installing the dependencies

```bash
pnpm add turbo --global
pnpm install
```

### Building the project

```bash
turbo build
```

### Running the CLI

```bash
turbo @apps/cli#dev
```

### Adding dependencies

In order to add a package to an other package or an app, you'll need to use the `workspace` parameter:

```bash
pnpm --filter @apps/cli add @packages/math --workspace
```

And the following command shows how you can install external dependencies:

```bash
pnpm --filter @apps/cli add @clack/prompts
```

Adding a global package:

```bash
pnpm add -D vitest -w
```
