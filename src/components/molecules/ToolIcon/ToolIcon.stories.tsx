import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToolIcon } from './ToolIcon';

const meta = {
  component: ToolIcon,
  title: 'Molecules/ToolIcon',
  args: { tool: { name: 'Figma', icon: 'figma' } },
} satisfies Meta<typeof ToolIcon>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
