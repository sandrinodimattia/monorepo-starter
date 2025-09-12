# @packages/env

A TypeScript library for type-safe environment variable management using Zod schemas.

## API Reference

### `baseEnvSchema`

The base environment schema that validates `NODE_ENV`.

```typescript
const baseEnvSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
});
```

### `createEnvSchema<T>(schema: z.ZodObject<T>)`

Creates a new schema that extends the base environment schema with your custom schema.

**Parameters:**

- `schema`: A Zod object schema defining your custom environment variables

**Returns:** Extended Zod schema combining base and custom schemas

```typescript
const customSchema = z.object({
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url().optional(),
});

const envSchema = createEnvSchema(customSchema);
// Result: { NODE_ENV: ..., DATABASE_URL: ..., REDIS_URL?: ... }
```

### `loadEnv<T>(schema, env)`

Loads environment variables from an object and parses them using the provided schema.

**Parameters:**

- `schema`: The Zod schema to validate against
- `env`: Object containing environment variables (e.g., `process.env`)

**Returns:** Parsed and validated environment variables

**Throws:** Error with detailed validation messages if parsing fails

```typescript
try {
  const env = loadEnv(envSchema, process.env);
  // Use validated env variables
} catch (error) {
  // Handle validation errors
  console.error('Environment validation failed:', error.message);
}
```

## Usage Examples

### Basic Setup

```typescript
import { z } from 'zod';
import { createEnvSchema, loadEnv } from '@packages/env';

const schema = createEnvSchema(
  z.object({
    API_URL: z.string().url(),
    DEBUG: z.string().transform((val) => val === 'true'),
  })
);

const env = loadEnv(schema, process.env);
```

### With .env File

```typescript
import { config } from 'dotenv';
import { createEnvSchema, loadEnv } from '@packages/env';

// Load .env file
config();

const env = loadEnv(
  createEnvSchema(
    z.object({
      DATABASE_URL: z.string().url(),
    })
  ),
  process.env
);
```

### Advanced Schema with Transforms

```typescript
const advancedSchema = createEnvSchema(
  z.object({
    PORT: z.string().transform(Number),
    TIMEOUT: z.string().transform(Number).default('5000'),
    FEATURES: z
      .string()
      .transform((val) => val.split(','))
      .optional(),
  })
);

const env = loadEnv(advancedSchema, process.env);
// env.PORT: number
// env.TIMEOUT: number
// env.FEATURES: string[] | undefined
```

## Error Handling

The library provides detailed error messages for invalid environment variables:

```typescript
try {
  const env = loadEnv(schema, process.env);
} catch (error) {
  // Error message includes specific validation issues
  console.error(error.message);
  process.exit(1);
}
```

## TypeScript Integration

Get full type safety with your environment variables:

```typescript
const envSchema = createEnvSchema(
  z.object({
    DATABASE_URL: z.string().url(),
    PORT: z.string().transform(Number),
  })
);

type Env = z.infer<typeof envSchema>;
// Env = {
//   NODE_ENV: 'development' | 'test' | 'production';
//   DATABASE_URL: string;
//   PORT: number;
// }
```
