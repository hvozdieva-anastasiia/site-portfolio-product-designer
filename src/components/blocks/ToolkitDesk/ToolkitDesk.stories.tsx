import type { Meta, StoryObj } from '@storybook/react-vite';
import { rive, toolGroups } from '../../../content';
import { ToolkitDesk } from './ToolkitDesk';

const meta = {
  component: ToolkitDesk,
  title: 'Blocks/ToolkitDesk',
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
} satisfies Meta<typeof ToolkitDesk>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
