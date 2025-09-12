import { z } from 'zod';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { baseEnvSchema, createEnvSchema, loadEnv } from './index.js';

// Mock process.env
const originalEnv = process.env;

describe('env package', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset process.env to original state
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    // Restore process.env
    process.env = originalEnv;
  });

  describe('baseEnvSchema', () => {
    it('should validate correct environment variables', () => {
      const validEnv = {
        NODE_ENV: 'development',
      };

      const result = baseEnvSchema.parse(validEnv);
      expect(result).toEqual(validEnv);
    });

    it('should use default values when environment variables are missing', () => {
      const result = baseEnvSchema.parse({});
      expect(result).toEqual({
        NODE_ENV: 'development',
      });
    });

    it('should accept all valid NODE_ENV values', () => {
      const validNodeEnvs = ['development', 'test', 'production'];

      validNodeEnvs.forEach((nodeEnv) => {
        const result = baseEnvSchema.parse({ NODE_ENV: nodeEnv });
        expect(result.NODE_ENV).toBe(nodeEnv);
      });
    });

    it('should throw error for invalid NODE_ENV', () => {
      expect(() => {
        baseEnvSchema.parse({ NODE_ENV: 'invalid' });
      }).toThrow();
    });
  });

  describe('createEnvSchema', () => {
    it('should extend base schema with custom schema', () => {
      const customSchema = z.object({
        DATABASE_URL: z.string(),
        PORT: z.string().transform(Number),
      });

      const extendedSchema = createEnvSchema(customSchema);

      const validEnv = {
        NODE_ENV: 'development',
        DATABASE_URL: 'postgres://localhost:5432/db',
        PORT: '3000',
      };

      const result = extendedSchema.parse(validEnv);
      expect(result).toEqual({
        NODE_ENV: 'development',
        DATABASE_URL: 'postgres://localhost:5432/db',
        PORT: 3000,
      });
    });

    it('should preserve base schema defaults when extending', () => {
      const customSchema = z.object({
        API_KEY: z.string(),
      });

      const extendedSchema = createEnvSchema(customSchema);

      const envWithOnlyCustom = {
        API_KEY: 'secret-key',
      };

      const result = extendedSchema.parse(envWithOnlyCustom);
      expect(result).toEqual({
        NODE_ENV: 'development',
        API_KEY: 'secret-key',
      });
    });
  });

  describe('loadEnv', () => {
    it('should load environment variables from the env object', () => {
      const customSchema = z.object({
        DATABASE_URL: z.string(),
      });
      const schema = createEnvSchema(customSchema);

      process.env.NODE_ENV = 'development';
      process.env.DATABASE_URL = 'postgres://localhost:5432/db';

      const result = loadEnv(schema, process.env);
      expect(result).toEqual({
        NODE_ENV: 'development',
        DATABASE_URL: 'postgres://localhost:5432/db',
      });
    });

    it('should throw ZodError for invalid environment variables', () => {
      const customSchema = z.object({
        PORT: z.string().transform(Number),
      });
      const schema = createEnvSchema(customSchema);

      process.env.NODE_ENV = 'invalid';
      process.env.PORT = 'not-a-number';

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => loadEnv(schema, process.env)).toThrow('Failed to load environment variables');
      expect(consoleSpy).toHaveBeenCalledWith('❌ Invalid environment variables:', expect.any(String));

      consoleSpy.mockRestore();
    });

    it('should work with extended schemas', () => {
      const customSchema = z.object({
        DATABASE_URL: z.string(),
        API_KEY: z.string(),
      });

      const extendedSchema = createEnvSchema(customSchema);

      process.env.NODE_ENV = 'test';
      process.env.DATABASE_URL = 'postgres://test:5432/db';
      process.env.API_KEY = 'test-key';

      const result = loadEnv(extendedSchema, process.env);

      expect(result).toEqual({
        NODE_ENV: 'test',
        DATABASE_URL: 'postgres://test:5432/db',
        API_KEY: 'test-key',
      });
    });
  });
});
