import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { ProcessPicker } from './ProcessPicker';

const steps = [
  { text: 'Ask what the real problem is.', ms: 4000 },
  { text: 'Dig into research and data.', ms: 6000 },
  { text: 'Design the solution.', ms: 3000 },
  { text: 'Prove it with an experiment.', ms: 3000 },
];

const meta = {
  component: ProcessPicker,
  title: 'Molecules/ProcessPicker',
  decorators: [
    (Story) => (
      <div style={{ width: 340 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    label: 'How I work',
    steps,
    activeIndex: 1,
    onSelect: fn(),
    onTogglePause: fn(),
  },
} satisfies Meta<typeof ProcessPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Cycling: Story = { args: { mode: 'cycling' } };
export const Paused: Story = { args: { mode: 'cycling', paused: true } };
export const Static: Story = { args: { mode: 'static' } };

export const PicksAStep: Story = {
  args: { mode: 'cycling' },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole('button', { name: /Design the solution/ }),
    );
    await expect(args.onSelect).toHaveBeenCalledWith(2);
    await userEvent.click(
      canvas.getByRole('button', { name: 'Pause the steps' }),
    );
    await expect(args.onTogglePause).toHaveBeenCalled();
  },
};
