import type { Meta, StoryObj } from '@storybook/react-vite';
import { Display } from './Display';

const meta = {
  component: Display,
  title: 'Atoms/Display',
  args: { children: 'Hi, I’m Anastasiia.' },
} satisfies Meta<typeof Display>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Large: Story = {};
export const Small: Story = { args: { size: 'sm' } };
