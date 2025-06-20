import { z } from 'zod';
import { createEnvSchema, loadEnv } from '@repo/env';

const schema = createEnvSchema(
  z.object({
    VITE_FOO: z.string(),
  })
);

// eslint-disable-next-line no-process-env
export const env: z.infer<typeof schema> = loadEnv(schema, { ...process.env, ...import.meta.env });
