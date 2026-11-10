import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProcessList } from './ProcessList';

const steps = [
  { text: 'Ask what the real problem is.', ms: 4000 },
  { text: 'Dig into research and data.', ms: 6000 },
  { text: 'Design the solution.', ms: 3000 },
  { text: 'Prove it with an experiment.', ms: 3000 },
];

const meta = {
  component: ProcessList,
  title: 'Molecules/ProcessList',
  args: { label: 'How I work', steps, activeIndex: 1 },
} satisfies Meta<typeof ProcessList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Cycling: Story = { args: { mode: 'cycling' } };
export const Static: Story = { args: { mode: 'static' } };
