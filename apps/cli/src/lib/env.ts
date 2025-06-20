import { z } from 'zod';
import { config } from 'dotenv';
import { createEnvSchema, loadEnv } from '@repo/env';

config({
  path: '.env',
});

const schema = createEnvSchema(
  z.object({
    PORT: z
      .string()
      .default('3000')
      .transform((val) => parseInt(val, 10)),
    FOO: z.string(),
  })
);

// eslint-disable-next-line no-process-env
export const env: z.infer<typeof schema> = loadEnv(schema, process.env);
