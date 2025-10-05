import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { routeTree } from './routeTree.gen';
import { RouterProvider, createRouter } from '@tanstack/react-router';

import './index.css';
import './globals.css';
import { getContext, TanStackQueryProvider } from './lib/tanstack/query';

const queryContext = getContext();
const router = createRouter({
  routeTree,
  context: {
    ...queryContext,
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <TanStackQueryProvider {...queryContext}>
      <RouterProvider router={router} />
    </TanStackQueryProvider>
  </StrictMode>
);
