import type { Meta, StoryObj } from '@storybook/react-vite';
import { PagerControls } from './PagerControls';

const meta = {
  component: PagerControls,
  title: 'Molecules/PagerControls',
  args: {
    position: '3 / 13',
    prevLabel: 'Previous review',
    nextLabel: 'Next review',
    onPrev: () => {},
    onNext: () => {},
  },
} satisfies Meta<typeof PagerControls>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
