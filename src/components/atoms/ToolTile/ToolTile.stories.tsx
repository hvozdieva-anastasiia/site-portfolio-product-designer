import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToolTile } from './ToolTile';

const meta = {
  component: ToolTile,
  title: 'Atoms/ToolTile',
} satisfies Meta<typeof ToolTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithIcon: Story = {
  args: { icon: 'figma', monogram: 'F', title: 'Figma' },
};
export const Monogram: Story = { args: { monogram: 'Ps', title: 'Photoshop' } };
