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
      first: 'Three projects.',
      second: 'A telecom brand, an eSIM feature and a campaign app.',
    },
  },
} satisfies Meta<typeof Cases>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
