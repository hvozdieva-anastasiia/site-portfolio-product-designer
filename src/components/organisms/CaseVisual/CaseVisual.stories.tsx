import type { Meta, StoryObj } from '@storybook/react-vite';
import { cases } from '../../../content';
import { CaseVisual } from './CaseVisual';

const meta = {
  component: CaseVisual,
  title: 'Organisms/CaseVisual',
  decorators: [
    (Story) => (
      <div style={{ width: 620 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CaseVisual>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BehanceCover: Story = {
  args: {
    cover: cases[1].cover,
    coverAlt: cases[1].coverAlt,
    art: cases[1].art,
  },
};
export const IllustrationFallback: Story = {
  args: { cover: '', coverAlt: '', art: 'dashboard' },
};
