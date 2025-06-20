import { z } from 'zod';

function loadEnv<T>(schema: z.ZodType<T>): z.infer<typeof schema> {
  try {
    return schema.parse(import.meta.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Invalid environment variables:', JSON.stringify(error.errors, null, 2));
    } else {
      console.error('❌ Error loading environment variables:', error);
    }
    throw new Error('Failed to load environment variables');
  }
}

export default loadEnv(
  z.object({
    VITE_FOO: z.string(),
  })
);
