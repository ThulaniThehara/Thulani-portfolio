import React, { useState } from 'react';

interface InteractiveExplorerProps {
  initialDomain?: string;
}

const domains = [
  { id: 'fullstack', label: 'Full-Stack Systems', summary: 'End-to-end type-safe web platforms, microservices, and relational databases.' },
  { id: 'cloud', label: 'Cloud & Serverless', summary: 'Edge worker runtimes, automated CI/CD deployment pipelines, and scalable cloud queues.' },
  { id: 'ai', label: 'Applied AI & LLMs', summary: 'Context orchestration, tool-calling pipelines, vector embeddings, and streaming UI.' },
  { id: 'iot', label: 'IoT & Hardware', summary: 'Embedded C++ microcontrollers, MQTT telemetry brokers, and hardware actuation.' },
];

export const InteractiveExplorer: React.FC<InteractiveExplorerProps> = ({ initialDomain = 'fullstack' }) => {
  const [activeDomain, setActiveDomain] = useState(initialDomain);
  const selected = domains.find((d) => d.id === activeDomain) || domains[0];

  return (
    <div className="border border-[var(--border-subtle)] rounded-2xl p-6 bg-[var(--bg-surface)] shadow-xs">
      <div className="flex flex-wrap gap-2 mb-4">
        {domains.map((domain) => {
          const isActive = activeDomain === domain.id;
          return (
            <button
              key={domain.id}
              type="button"
              onClick={() => setActiveDomain(domain.id)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-[var(--brand-deep-teal)] text-white shadow-xs'
                  : 'bg-[var(--bg-page)] text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:border-[var(--brand-soft-teal)] hover:text-[var(--brand-deep-teal)]'
              }`}
            >
              {domain.label}
            </button>
          );
        })}
      </div>
      <div className="p-4 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)]">
        <h4 className="text-sm font-bold text-[var(--text-primary)] mb-1">{selected.label}</h4>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">{selected.summary}</p>
      </div>
    </div>
  );
};

export default InteractiveExplorer;
