import { z } from 'zod';
import { createEnvSchema, loadEnv } from '@packages/env';

const schema = createEnvSchema(
  z.object({
    BASE_URL: z.string(),
    MODE: z.string(),
    DEV: z.boolean(),
    PROD: z.boolean(),
    SSR: z.boolean(),
    VITE_FOO: z.string(),
  })
);

export const env: z.infer<typeof schema> = loadEnv(schema, { ...import.meta.env });
