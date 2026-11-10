import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatFigure } from './StatFigure';

const meta = {
  component: StatFigure,
  title: 'Molecules/StatFigure',
  args: {
    value: '2.35%',
    label: 'Activation conversion rate',
    note: 'The gap between exposure and activation became the central question of this case.',
  },
} satisfies Meta<typeof StatFigure>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
export const Large: StoryObj<typeof meta> = { args: { size: 'lg' } };
