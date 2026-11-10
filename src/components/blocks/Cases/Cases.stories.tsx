import type { Meta, StoryObj } from '@storybook/react-vite';
import { cases } from '../../../content';
import { Cases } from './Cases';

const meta = {
  component: Cases,
  title: 'Blocks/Cases',
  parameters: { layout: 'fullscreen' },
  args: {
    items: cases,
    heading: {
      kicker: 'Selected work',
      first: 'Cases.',
      second: 'From real problems to measurable results.',
    },
  },
} satisfies Meta<typeof Cases>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
