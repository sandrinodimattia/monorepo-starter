import { orpc } from '@/lib/orpc-client';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/health')({
  component: HealthComponent,
});

function HealthComponent() {
  const {
    data: channel,
    isLoading,
    isPending,
    isError,
    error,
  } = useQuery(
    orpc.health.health.queryOptions({ input: {}, throwOnError: false })
  );

  if (isLoading || isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg">Health</h2>
      </div>
      <p>{channel.status}</p>
    </div>
  );
}
