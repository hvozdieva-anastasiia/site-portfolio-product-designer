import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from './Label';

const meta = {
  component: Label,
  title: 'Atoms/Label',
  args: { children: 'Selected work' },
} satisfies Meta<typeof Label>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
