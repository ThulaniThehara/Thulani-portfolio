import React, { useState } from 'react';

interface InteractiveExplorerProps {
  initialDomain?: string;
}

const domains = [
  { id: 'fullstack', label: 'Full-Stack', summary: 'End-to-end web architectures, microservices, and databases.' },
  { id: 'cloud', label: 'Cloud & Serverless', summary: 'Scalable infrastructure, serverless functions, and event pipelines.' },
  { id: 'ai', label: 'AI & Machine Learning', summary: 'LLM orchestrations, RAG pipelines, and intelligent agent workflows.' },
  { id: 'iot', label: 'IoT & Hardware', summary: 'Embedded microcontrollers, MQTT telemetry, and edge computing.' },
];

export const InteractiveExplorer: React.FC<InteractiveExplorerProps> = ({ initialDomain = 'fullstack' }) => {
  const [activeDomain, setActiveDomain] = useState(initialDomain);
  const selected = domains.find((d) => d.id === activeDomain) || domains[0];

  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="flex flex-wrap gap-2 mb-4">
        {domains.map((domain) => (
          <button
            key={domain.id}
            type="button"
            onClick={() => setActiveDomain(domain.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              activeDomain === domain.id
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {domain.label}
          </button>
        ))}
      </div>
      <div className="p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-semibold mb-1">{selected.label}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-300">{selected.summary}</p>
      </div>
    </div>
  );
};

export default InteractiveExplorer;
