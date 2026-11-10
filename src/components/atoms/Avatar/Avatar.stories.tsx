import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';

const meta = {
  component: Avatar,
  title: 'Atoms/Avatar',
  args: { name: 'Anastasiia Hvozdieva' },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Medium: Story = {};
export const Small: Story = { args: { size: 'sm' } };
