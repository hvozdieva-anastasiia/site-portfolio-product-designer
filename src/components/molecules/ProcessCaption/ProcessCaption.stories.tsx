import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProcessCaption } from './ProcessCaption';

const steps = [
  { text: 'Ask what the real problem is.', ms: 4000 },
  { text: 'Dig into research and data.', ms: 6000 },
  { text: 'Design the solution.', ms: 3000 },
  { text: 'Prove it with an experiment.', ms: 3000 },
];

const meta = {
  component: ProcessCaption,
  title: 'Molecules/ProcessCaption',
  decorators: [
    (Story) => (
      <div style={{ width: 520 }}>
        <Story />
      </div>
    ),
  ],
  args: { label: 'How I work', steps, activeIndex: 1 },
} satisfies Meta<typeof ProcessCaption>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Cycling: Story = { args: { mode: 'cycling' } };
export const Static: Story = { args: { mode: 'static' } };
