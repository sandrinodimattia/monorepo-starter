import { env } from '../../lib/env';

export function EnvironmentVariables() {
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
    <div className="border border-gray-200 p-8">
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-xl font-normal mb-2">Environment Variables</h2>
        </div>

        <div className="space-y-4">
          {envVars.map(({ key, value }) => (
            <div
              key={key}
              className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
            >
              <div className="font-medium text-gray-900">{key}</div>
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
