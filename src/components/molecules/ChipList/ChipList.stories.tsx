import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChipList } from './ChipList';

const meta = {
  component: ChipList,
  title: 'Molecules/ChipList',
  args: {
    label: 'Research work',
    items: ['UX Research', 'Interviews', 'Usability tests'],
  },
} satisfies Meta<typeof ChipList>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
