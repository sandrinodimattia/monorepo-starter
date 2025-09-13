import { useState } from 'react';
import { Calculator } from './components/calculator';
import { EnvironmentVariables } from './components/env';

type Tab = 'calculator' | 'env-vars';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('calculator');

  const tabs = [
    {
      id: 'calculator' as Tab,
      label: 'Calculator',
    },
    {
      id: 'env-vars' as Tab,
      label: 'Environment',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-2xl mx-auto py-10">
        <div className="text-center">
          <h1 className="text-2xl font-normal mb-4 tracking-tight">
            React + Tailwind with TypeScript
          </h1>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {tabs.map((tab) => (
              <button
                type="button"
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-black shadow-sm'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'calculator' && <Calculator />}
        {activeTab === 'env-vars' && <EnvironmentVariables />}
      </div>
    </div>
  );
}

export default App;
