import { createFileRoute } from '@tanstack/react-router';

import { env } from '../lib/env';

export const Route = createFileRoute('/settings')({
  component: SettingsComponent,
});

function SettingsComponent() {
  const envVars = [
    { key: 'NODE_ENV', value: env.NODE_ENV },
    { key: 'BASE_URL', value: env.BASE_URL },
    { key: 'MODE', value: env.MODE },
    { key: 'DEV', value: env.DEV.toString() },
    { key: 'PROD', value: env.PROD.toString() },
    { key: 'SSR', value: env.SSR.toString() },
    { key: 'VITE_FOO', value: env.VITE_FOO },
  ];

  return (
    <div className="w-full">
      <div className="space-y-6">
        <div className="mb-8">
          <h2 className="text-xl font-normal mb-2">Settings</h2>
        </div>

        <div className="space-y-1">
          {envVars.map(({ key, value }) => (
            <div
              key={key}
              className="flex items-center justify-between py-1 border-b border-gray-100 last:border-b-0"
            >
              <div className="font-medium text-gray-900 text-sm">{key}</div>
              <div className="text-gray-600 font-mono text-sm bg-gray-50 px-3 py-1 rounded">
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
