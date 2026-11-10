import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToolRow } from './ToolRow';

const meta = {
  component: ToolRow,
  title: 'Molecules/ToolRow',
  args: { tool: { name: 'Photoshop', mono: 'Ps' } },
} satisfies Meta<typeof ToolRow>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
