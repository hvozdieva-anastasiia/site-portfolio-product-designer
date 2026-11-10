import type { Meta, StoryObj } from '@storybook/react-vite';
import { FactStrip } from './FactStrip';

const meta = {
  component: FactStrip,
  title: 'Molecules/FactStrip',
  args: {
    facts: [
      { label: 'Focus', value: 'Research-led product design' },
      { label: 'Industries', value: 'Telecom, travel, advertising' },
      { label: 'Based in', value: 'Bucharest, Romania' },
    ],
  },
} satisfies Meta<typeof FactStrip>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
