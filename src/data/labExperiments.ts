export type ExperimentStatus = 'Experiment' | 'Prototype' | 'In Progress' | 'Completed';
export type ExperimentCategory =
  | 'AI'
  | 'Cloud'
  | 'Web'
  | 'Three.js'
  | 'IoT'
  | 'Hardware'
  | 'UI/UX'
  | 'Performance';

export interface LabExperiment {
  id: string;
  title: string;
  description: string;
  category: ExperimentCategory;
  technologies: string[];
  status: ExperimentStatus;
  date: string;
  demoUrl?: string;
  githubUrl?: string;
  highlights?: string[];
  metrics?: { label: string; value: string }[];
}

export const labExperiments: LabExperiment[] = [
  {
    id: 'interactive-3d-scene',
    title: 'Interactive 3D Portfolio Scene',
    description:
      'Prototyping a lightweight WebGL / Three.js viewport featuring custom fragment shaders, reactive cursor raycasting, and GPU particle flows without bogging down mobile frames.',
    category: 'Three.js',
    technologies: ['Three.js', 'React Three Fiber', 'GLSL Shaders', 'WebGPU API', 'TypeScript'],
    status: 'Prototype',
    date: '2024',
    githubUrl: 'https://github.com',
    highlights: [
      'Custom procedural noise fragment shader',
      'Targeted 60 FPS on low-power mobile GPUs',
      'Progressive fallback for devices without WebGL2',
    ],
    metrics: [
      { label: 'Draw Calls', value: '< 15' },
      { label: 'Bundle Impact', value: '< 45 KB' },
    ],
  },
  {
    id: 'ai-portfolio-assistant',
    title: 'AI Portfolio Assistant & Tool-Calling Agent',
    description:
      'An experimental conversational agent that uses OpenAI function calling and vector embeddings to answer inquiries about technical case studies, resume history, and system design decisions.',
    category: 'AI',
    technologies: ['OpenAI API', 'LangChain', 'Vector Embeddings', 'Server-Sent Events', 'TypeScript'],
    status: 'In Progress',
    date: '2024',
    githubUrl: 'https://github.com',
    highlights: [
      'Streaming responses via Server-Sent Events',
      'Deterministic JSON tool calling for resume queries',
      'Context window pruning for sub-200ms latency',
    ],
    metrics: [
      { label: 'TTFT Latency', value: '~175ms' },
      { label: 'Tool Accuracy', value: '96%' },
    ],
  },
  {
    id: 'cloudflare-worker-edge',
    title: 'Cloudflare Worker Sub-10ms Edge Cache',
    description:
      'Benchmarking edge compute execution times and distributed KV storage lookups to deliver sub-10ms dynamic JSON responses worldwide without central origin hits.',
    category: 'Cloud',
    technologies: ['Cloudflare Workers', 'Workers KV', 'TypeScript', 'V8 Isolates', 'Wrangler'],
    status: 'Completed',
    date: '2024',
    githubUrl: 'https://github.com',
    highlights: [
      'Zero cold starts via V8 Isolate execution',
      'Geo-distributed cache tagging and instant purging',
      'Automated global telemetry tracking',
    ],
    metrics: [
      { label: 'Edge TTFB', value: '< 9ms' },
      { label: 'Global PoPs', value: '300+' },
    ],
  },
  {
    id: 'interactive-aws-architecture-explorer',
    title: 'Interactive AWS Architecture Visualizer',
    description:
      'A node-graph canvas prototype to visualize event-driven serverless flows: tracing AppSync GraphQL requests through Lambdas, SQS FIFO queues, and DynamoDB single-table partitions.',
    category: 'UI/UX',
    technologies: ['React Flow', 'TypeScript', 'SVG Canvas', 'Tailwind CSS', 'AWS Architecture SDK'],
    status: 'Experiment',
    date: '2024',
    githubUrl: 'https://github.com',
    highlights: [
      'Interactive packet flow animation along SVG paths',
      'Live JSON event payload inspector',
      'Exportable infrastructure state snapshots',
    ],
    metrics: [
      { label: 'Render Speed', value: '60 FPS' },
      { label: 'Graph Nodes', value: '50+ Supported' },
    ],
  },
  {
    id: 'iot-telemetry-dashboard',
    title: 'IoT Real-Time Telemetry Dashboard',
    description:
      'Testing bidirectional ESP32 microcontroller telemetry streams with binary WebSocket payloads, real-time Chart.js dials, and MQTT broker failover protocols.',
    category: 'IoT',
    technologies: ['ESP32', 'MQTT', 'WebSockets', 'Chart.js', 'C++', 'Node.js'],
    status: 'Prototype',
    date: '2024',
    githubUrl: 'https://github.com',
    highlights: [
      'Sub-50ms sensor telemetry updates in browser',
      'Binary array buffer packing for minimal bandwidth',
      'Automatic exponential backoff reconnects',
    ],
    metrics: [
      { label: 'Live Hz', value: '60 Hz Updates' },
      { label: 'Packet Overhead', value: '18 Bytes' },
    ],
  },
  {
    id: 'web-performance-optimizations',
    title: 'Zero-JS Static Partial Hydration Audit',
    description:
      'Analyzing Astro Islands vs traditional React SPA hydration waterfalls to achieve perfect 100/100 Core Web Vitals on low-end Android mobile devices over 3G throttling.',
    category: 'Performance',
    technologies: ['Astro Islands', 'Lighthouse CI', 'Web Vitals API', 'Chromium DevTools'],
    status: 'Completed',
    date: '2023',
    githubUrl: 'https://github.com',
    highlights: [
      'Zero runtime JavaScript shipped for static content',
      'Sub-1.0s Largest Contentful Paint (LCP) on 3G',
      'Automated Lighthouse CI performance budgets',
    ],
    metrics: [
      { label: 'Lighthouse Score', value: '100 / 100' },
      { label: 'Total Blocking', value: '0 ms' },
    ],
  },
];
