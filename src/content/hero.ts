import type { ProcessStep } from './types';

// Mirrors the line "I find the right problems to solve, then validate
// solutions through research, data and experimentation".
export const processSteps: ProcessStep[] = [
  { text: 'Ask what the real problem is.', machine: 'ThinkDemo', ms: 4000 },
  { text: 'Dig into research and data.', machine: 'ScrollDemo', ms: 6000 },
  { text: 'Design the solution.', machine: 'IdeaDemo', ms: 3000 },
  { text: 'Prove it with an experiment.', machine: 'WinDemo', ms: 3000 },
];
