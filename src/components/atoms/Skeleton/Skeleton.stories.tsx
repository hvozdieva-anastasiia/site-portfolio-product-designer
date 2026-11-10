import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from './Skeleton';

const meta = {
  component: Skeleton,
  title: 'Atoms/Skeleton',
  decorators: [
    (Story) => (
      <div style={{ display: 'grid', gap: 8, width: 240 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Bar: Story = { args: { w: '60%' } };
export const Blue: Story = { args: { tone: 'blue', w: '80%' } };
export const Button: Story = { args: { tone: 'ink', h: 24 } };
