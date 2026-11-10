import type { Meta, StoryObj } from '@storybook/react-vite';
import { Kbd } from './Kbd';

const meta = {
  component: Kbd,
  title: 'Atoms/Kbd',
  args: { children: 'C' },
} satisfies Meta<typeof Kbd>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
