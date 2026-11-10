import type { Meta, StoryObj } from '@storybook/react-vite';
import { OutcomeLine } from './OutcomeLine';

const meta = {
  component: OutcomeLine,
  title: 'Molecules/OutcomeLine',
} satisfies Meta<typeof OutcomeLine>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithValue: Story = {
  args: { value: 'MVNO', children: 'launched by Silpo' },
};
export const Plain: Story = {
  args: { children: 'Team project · published May 2026' },
};
