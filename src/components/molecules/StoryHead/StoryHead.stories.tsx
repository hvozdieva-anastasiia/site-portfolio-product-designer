import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoryHead } from './StoryHead';

const meta = {
  component: StoryHead,
  title: 'Molecules/StoryHead',
  args: {
    id: 'story-head-demo',
    kicker: '01 — Problem',
    title: 'Users saw the offer, but rarely activated it.',
    text: 'Yezzz! was already available inside the Silpo app, but the activation funnel showed a critical gap between awareness and completion.',
  },
} satisfies Meta<typeof StoryHead>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
