import type { Meta, StoryObj } from '@storybook/react-vite';
import { rive, toolGroups } from '../../../content';
import { Toolkit } from './Toolkit';

const meta = {
  component: Toolkit,
  title: 'Blocks/Toolkit',
  parameters: { layout: 'fullscreen' },
  args: {
    groups: toolGroups,
    rive,
    heading: {
      kicker: 'Toolkit',
      first: 'Daily tools.',
      second: 'Pick a group and watch the desk change.',
    },
  },
} satisfies Meta<typeof Toolkit>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
