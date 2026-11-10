import type { Meta, StoryObj } from '@storybook/react-vite';
import { Glyph } from './Glyph';

const meta = {
  component: Glyph,
  title: 'Atoms/Glyph',
} satisfies Meta<typeof Glyph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Blue: Story = { args: { tone: 'blue' } };
export const Green: Story = { args: { tone: 'green' } };
export const Tomato: Story = { args: { tone: 'tomato' } };
export const Amber: Story = { args: { tone: 'amber' } };
