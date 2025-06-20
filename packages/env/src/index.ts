import { z } from 'zod';
import * as dotenv from 'dotenv';

export const baseEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
});

/**
 * Creates a new schema that extends the base environment schema with the provided schema.
 * @param schema - The schema to extend the base environment schema with.
 * @returns The extended schema.
 */
export function createEnvSchema<T extends z.ZodRawShape>(
  schema: z.ZodObject<T>
): z.ZodObject<T & typeof baseEnvSchema.shape> {
  return baseEnvSchema.extend(schema.shape) as z.ZodObject<T & typeof baseEnvSchema.shape>;
}

/**
 * Loads environment variables from the .env file and parses them using the provided schema.
 * @param schema - The schema to use for parsing the environment variables.
 * @param envPath - The path to the .env file.
 * @returns The parsed environment variables.
 */
export function loadEnv<T extends z.ZodRawShape>(
  schema: z.ZodObject<T & typeof baseEnvSchema.shape>,
  envPath: string = '.env'
): z.infer<z.ZodObject<T & typeof baseEnvSchema.shape>> {
  try {
    dotenv.config({
      path: envPath,
    });

    // eslint-disable-next-line no-process-env
    const env = process.env as Record<string, string | undefined>;
    return schema.parse(env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Invalid environment variables:', JSON.stringify(error.errors, null, 2));
    } else {
      console.error('❌ Error loading environment variables:', error);
    }

    process.exit(1);
  }
}
