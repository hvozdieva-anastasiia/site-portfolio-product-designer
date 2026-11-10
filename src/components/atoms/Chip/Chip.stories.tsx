import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chip } from './Chip';

const meta = {
  component: Chip,
  title: 'Atoms/Chip',
  args: { children: 'UX Research' },
} satisfies Meta<typeof Chip>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
