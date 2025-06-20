/* eslint-disable turbo/no-undeclared-env-vars */
/* eslint-disable no-process-env */
import { z } from 'zod';
import * as dotenv from 'dotenv';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { baseEnvSchema, createEnvSchema, loadEnv } from './index';

// Mock dotenv
vi.mock('dotenv', () => ({
  config: vi.fn(),
}));

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
        LOG_LEVEL: 'info',
      };

      const result = baseEnvSchema.parse(validEnv);
      expect(result).toEqual(validEnv);
    });

    it('should use default values when environment variables are missing', () => {
      const result = baseEnvSchema.parse({});
      expect(result).toEqual({
        NODE_ENV: 'development',
        LOG_LEVEL: 'info',
      });
    });

    it('should accept all valid NODE_ENV values', () => {
      const validNodeEnvs = ['development', 'test', 'production'];

      validNodeEnvs.forEach((nodeEnv) => {
        const result = baseEnvSchema.parse({ NODE_ENV: nodeEnv });
        expect(result.NODE_ENV).toBe(nodeEnv);
      });
    });

    it('should accept all valid LOG_LEVEL values', () => {
      const validLogLevels = ['debug', 'info', 'warn', 'error'];

      validLogLevels.forEach((logLevel) => {
        const result = baseEnvSchema.parse({ LOG_LEVEL: logLevel });
        expect(result.LOG_LEVEL).toBe(logLevel);
      });
    });

    it('should throw error for invalid NODE_ENV', () => {
      expect(() => {
        baseEnvSchema.parse({ NODE_ENV: 'invalid' });
      }).toThrow();
    });

    it('should throw error for invalid LOG_LEVEL', () => {
      expect(() => {
        baseEnvSchema.parse({ LOG_LEVEL: 'invalid' });
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
        LOG_LEVEL: 'info',
        DATABASE_URL: 'postgres://localhost:5432/db',
        PORT: '3000',
      };

      const result = extendedSchema.parse(validEnv);
      expect(result).toEqual({
        NODE_ENV: 'development',
        LOG_LEVEL: 'info',
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
        LOG_LEVEL: 'info',
        API_KEY: 'secret-key',
      });
    });
  });

  describe('loadEnv', () => {
    it('should load environment variables from .env file', () => {
      const mockConfig = vi.mocked(dotenv.config);
      mockConfig.mockReturnValue({});

      const customSchema = z.object({
        DATABASE_URL: z.string(),
      });
      const schema = createEnvSchema(customSchema);

      process.env.NODE_ENV = 'development';
      process.env.LOG_LEVEL = 'info';
      process.env.DATABASE_URL = 'postgres://localhost:5432/db';

      const result = loadEnv(schema);

      expect(mockConfig).toHaveBeenCalledWith({ path: '.env' });
      expect(result).toEqual({
        NODE_ENV: 'development',
        LOG_LEVEL: 'info',
        DATABASE_URL: 'postgres://localhost:5432/db',
      });
    });

    it('should load environment variables from custom path', () => {
      const mockConfig = vi.mocked(dotenv.config);
      mockConfig.mockReturnValue({});

      const schema = createEnvSchema(z.object({}));

      process.env.NODE_ENV = 'production';

      loadEnv(schema, '.env.production');

      expect(mockConfig).toHaveBeenCalledWith({ path: '.env.production' });
    });

    it('should throw ZodError for invalid environment variables', () => {
      const mockConfig = vi.mocked(dotenv.config);
      mockConfig.mockReturnValue({});

      const customSchema = z.object({
        PORT: z.string().transform(Number),
      });
      const schema = createEnvSchema(customSchema);

      process.env.NODE_ENV = 'invalid';
      process.env.PORT = 'not-a-number';

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {
        throw new Error('process.exit called');
      });

      expect(() => loadEnv(schema)).toThrow('process.exit called');
      expect(consoleSpy).toHaveBeenCalledWith(
        '❌ Invalid environment variables:',
        expect.any(String)
      );
      expect(exitSpy).toHaveBeenCalledWith(1);

      consoleSpy.mockRestore();
      exitSpy.mockRestore();
    });

    it('should handle non-Zod errors gracefully', () => {
      const mockConfig = vi.mocked(dotenv.config);
      mockConfig.mockImplementation(() => {
        throw new Error('File not found');
      });

      const schema = createEnvSchema(z.object({}));

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {
        throw new Error('process.exit called');
      });

      expect(() => loadEnv(schema)).toThrow('process.exit called');
      expect(consoleSpy).toHaveBeenCalledWith(
        '❌ Error loading environment variables:',
        expect.any(Error)
      );
      expect(exitSpy).toHaveBeenCalledWith(1);

      consoleSpy.mockRestore();
      exitSpy.mockRestore();
    });

    it('should work with extended schemas', () => {
      const mockConfig = vi.mocked(dotenv.config);
      mockConfig.mockReturnValue({});

      const customSchema = z.object({
        DATABASE_URL: z.string(),
        API_KEY: z.string(),
      });

      const extendedSchema = createEnvSchema(customSchema);

      process.env.NODE_ENV = 'test';
      process.env.LOG_LEVEL = 'debug';
      process.env.DATABASE_URL = 'postgres://test:5432/db';
      process.env.API_KEY = 'test-key';

      const result = loadEnv(extendedSchema);

      expect(result).toEqual({
        NODE_ENV: 'test',
        LOG_LEVEL: 'debug',
        DATABASE_URL: 'postgres://test:5432/db',
        API_KEY: 'test-key',
      });
    });
  });
});
