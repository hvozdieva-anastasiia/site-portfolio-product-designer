import type { Tool, ToolGroup } from './types';

export const tools = {
  claude: { name: 'Claude', icon: 'claude' },
  chatgpt: { name: 'ChatGPT', icon: 'openai' },
  figmaMake: { name: 'Figma Make', icon: 'figma' },
  figma: { name: 'Figma', icon: 'figma' },
  miro: { name: 'Miro', icon: 'miro' },
  framer: { name: 'Framer', icon: 'framer' },
  storybook: { name: 'Storybook', icon: 'storybook' },
  amplitude: { name: 'Amplitude' },
  mixpanel: { name: 'Mixpanel', icon: 'mixpanel' },
  hotjar: { name: 'Hotjar', icon: 'hotjar' },
  maze: { name: 'Maze', icon: 'maze' },
  // Not in simple-icons: the logomark from useberry.com, in one colour.
  useberry: { name: 'Useberry', src: '/icons/useberry.svg' },
  ga: { name: 'Google Analytics', icon: 'googleanalytics' },
  notion: { name: 'Notion', icon: 'notion' },
  jira: { name: 'Jira', icon: 'jira' },
  linear: { name: 'Linear', icon: 'linear' },
  slack: { name: 'Slack', icon: 'slack' },
  invision: { name: 'InVision', mono: 'In' },
  photoshop: { name: 'Photoshop', mono: 'Ps' },
  illustrator: { name: 'Illustrator', mono: 'Ai' },
  googleDocs: { name: 'Google Docs', icon: 'googledocs' },
} satisfies Record<string, Tool>;

export const toolGroups: ToolGroup[] = [
  {
    title: 'AI',
    note: 'Research synthesis, prototyping, copy',
    tools: [tools.claude, tools.chatgpt, tools.figmaMake],
  },
  {
    title: 'Design',
    note: 'Interfaces, systems, workshops',
    tools: [tools.figma, tools.miro, tools.framer, tools.storybook],
  },
  {
    title: 'Research & analytics',
    note: 'Behaviour, funnels, experiments',
    tools: [
      tools.amplitude,
      tools.mixpanel,
      tools.hotjar,
      tools.maze,
      tools.ga,
    ],
  },
  {
    title: 'Delivery',
    note: 'Specs, planning, handoff',
    tools: [tools.notion, tools.jira, tools.linear, tools.slack],
  },
];
