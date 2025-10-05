import contract from '@apps/api/contract';
import { createORPCClient } from '@orpc/client';
import { OpenAPILink } from '@orpc/openapi-client/fetch';
import type { ContractRouterClient } from '@orpc/contract';
import type { JsonifiedClient } from '@orpc/openapi-client';
import { createTanstackQueryUtils } from '@orpc/tanstack-query';

import { env } from './env';

const link = new OpenAPILink(contract, {
  url: `${env.VITE_ORPC_URL}`,
  eventIteratorKeepAliveEnabled: true,
  eventIteratorKeepAliveInterval: 5000,
  eventIteratorKeepAliveComment: '',
});

export const client: JsonifiedClient<ContractRouterClient<typeof contract>> = createORPCClient(link);
export const orpc = createTanstackQueryUtils(client);
