import { z } from 'zod';

export const baseEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
});

/**
 * Creates a new schema that extends the base environment schema with the provided schema.
 * @param schema - The schema to extend the base environment schema with.
 * @returns The extended schema.
 */
export function createEnvSchema<T extends z.ZodRawShape>(
  schema: z.ZodObject<T>,
): z.ZodObject<T & typeof baseEnvSchema.shape> {
  return baseEnvSchema.extend(schema.shape) as z.ZodObject<T & typeof baseEnvSchema.shape>;
}

/**
 * Loads environment variables from the .env file and parses them using the provided schema.
 * @param schema - The schema to use for parsing the environment variables.
 * @param env - The environment variables to use for parsing.
 * @returns The parsed environment variables.
 */
export function loadEnv<T extends z.ZodRawShape>(
  schema: z.ZodObject<T & typeof baseEnvSchema.shape>,
  env: Record<string, string | number | boolean | undefined>,
): z.infer<z.ZodObject<T & typeof baseEnvSchema.shape>> {
  try {
    return schema.parse(env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Invalid environment variables:', JSON.stringify(error.issues, null, 2));
    } else {
      console.error('❌ Error loading environment variables:', error);
    }

    throw new Error('Failed to load environment variables');
  }
}
