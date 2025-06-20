import { z } from 'zod';
import { createEnvSchema, loadEnv } from '@repo/env';

const schema = createEnvSchema(
  z.object({
    PORT: z
      .string()
      .default('3000')
      .transform((val) => parseInt(val, 10)),
    FOO: z.string(),
  })
);

export const env: z.infer<typeof schema> = loadEnv(schema);
