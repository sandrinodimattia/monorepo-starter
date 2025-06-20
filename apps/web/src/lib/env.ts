import { z } from 'zod';
import { createEnvSchema, loadEnv } from '@repo/env';

const schema = createEnvSchema(
  z.object({
    VITE_FOO: z.string(),
  })
);

export const env: z.infer<typeof schema> = loadEnv(schema, import.meta.env);
