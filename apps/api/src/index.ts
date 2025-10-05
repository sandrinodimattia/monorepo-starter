import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';
import { createServer } from 'node:http';
import { OpenAPIHandler } from '@orpc/openapi/fetch';
import { ZodToJsonSchemaConverter } from '@orpc/zod/zod4';
import { OpenAPIReferencePlugin } from '@orpc/openapi/plugins';

import { env } from './lib/env.js';
import routes from './routes/index.js';
const handler = new OpenAPIHandler(routes, {
  plugins: [
    new OpenAPIReferencePlugin({
      schemaConverters: [new ZodToJsonSchemaConverter()],
      specGenerateOptions: {
        info: {
          title: 'oRPC Server',
          version: '0.0.1',
        },
        servers: [{ url: '/api/rpc' }],
      },
    }),
  ],
});

const app = new Hono().basePath('/api').use('/rpc/*', cors(), async (c, next) => {
  const { matched, response } = await handler.handle(c.req.raw, {
    prefix: '/api/rpc',
    context: {
      headers: c.req.raw.headers,
    },
  });

  if (matched) {
    return c.newResponse(response.body, response);
  }

  return await next();
});

const server = serve({ fetch: app.fetch, createServer, port: env.PORT }, (info) => {
  console.log(`Server is running on ${info.address}:${info.port}`);
});

// graceful shutdown
process.on('SIGINT', () => {
  server.close();
  process.exit(0);
});
process.on('SIGTERM', () => {
  server.close((err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    process.exit(0);
  });
});
