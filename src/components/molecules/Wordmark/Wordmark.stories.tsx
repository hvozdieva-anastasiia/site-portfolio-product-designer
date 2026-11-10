import type { Meta, StoryObj } from '@storybook/react-vite';
import { Wordmark } from './Wordmark';

const meta = {
  component: Wordmark,
  title: 'Molecules/Wordmark',
  args: { name: 'Anastasiia Hvozdieva' },
} satisfies Meta<typeof Wordmark>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Full: Story = { args: { variant: 'full' } };
export const Compact: Story = { args: { variant: 'compact' } };
