import type { Meta, StoryObj } from '@storybook/react-vite';
import { Slab } from './Slab';

const meta = {
  component: Slab,
  title: 'Atoms/Slab',
  args: {
    style: { padding: 24 },
    children: 'A Mist panel with a hairline border.',
  },
} satisfies Meta<typeof Slab>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
