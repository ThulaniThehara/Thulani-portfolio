export type ExploringIcon =
  | 'cloud'
  | 'ai'
  | 'security'
  | 'network'
  | 'mobile'
  | 'devops';

export interface ExploringTopic {
  id: string;
  title: string;
  description: string;
  icon: ExploringIcon;
  /** Focus keywords drawn from the topic description */
  focus: string[];
  /**
   * Header gradient stops. The ramp runs deep teal → bright teal → coral so each
   * card is distinguishable while staying inside the brand palette. Both stops are
   * kept dark enough to clear WCAG contrast for the white heading text on top.
   */
  accentFrom: string;
  accentTo: string;
}

export const exploringTopics: ExploringTopic[] = [
  {
    id: 'cloud-serverless',
    title: 'Cloud & Serverless',
    description:
      'Deepening my understanding of AWS and scalable cloud architectures.',
    icon: 'cloud',
    focus: ['AWS', 'Scalable Architecture', 'Serverless'],
    accentFrom: '#1F2937',
    accentTo: '#2C3539',
  },
  {
    id: 'ai-generative-ai',
    title: 'AI & Generative AI',
    description:
      'Exploring LLMs, AI agents, and practical AI-powered applications.',
    icon: 'ai',
    focus: ['LLMs', 'AI Agents', 'Applied AI'],
    accentFrom: '#2C3539',
    accentTo: '#3D4A4F',
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    description:
      'Learning secure application design, authentication, and cloud security.',
    icon: 'security',
    focus: ['Secure Design', 'Authentication', 'Cloud Security'],
    accentFrom: '#3D4A4F',
    accentTo: '#4A5568',
  },
  {
    id: 'networking',
    title: 'Networking',
    description:
      'Strengthening my understanding of networks, protocols, and distributed systems.',
    icon: 'network',
    focus: ['Protocols', 'Distributed Systems'],
    accentFrom: '#4A5568',
    accentTo: '#718096',
  },
  {
    id: 'flutter-mobile',
    title: 'Flutter & Mobile Development',
    description:
      'Exploring cross-platform mobile application development.',
    icon: 'mobile',
    focus: ['Flutter', 'Cross-Platform', 'Mobile'],
    accentFrom: '#8B7355',
    accentTo: '#C4A882',
  },
  {
    id: 'devops-cicd',
    title: 'DevOps & CI/CD',
    description:
      'Learning modern development workflows, automation, and deployment practices.',
    icon: 'devops',
    focus: ['CI/CD', 'Automation', 'Deployment'],
    accentFrom: '#A86540',
    accentTo: '#C07856',
  },
];

/** Heroicons-style outline paths keyed by topic icon */
export const exploringIconPaths: Record<ExploringIcon, string> = {
  cloud:
    'M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z',
  ai: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z',
  security:
    'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751A11.959 11.959 0 0112 2.714z',
  network:
    'M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418',
  mobile:
    'M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3',
  devops:
    'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99',
};
