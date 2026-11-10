import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pill } from './Pill';

const meta = {
  component: Pill,
  title: 'Atoms/Pill',
  args: { children: 'Redesign' },
} satisfies Meta<typeof Pill>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
