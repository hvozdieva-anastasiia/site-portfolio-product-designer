import type { Meta, StoryObj } from '@storybook/react-vite';
import { DialogCard } from './DialogCard';

const meta = {
  component: DialogCard,
  title: 'Molecules/DialogCard',
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 560 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    title: 'Get in touch',
    titleId: 'story-dialog-title',
    description: 'Tell me about your product or role. I’ll reply by email.',
    onClose: () => {},
    children: <p>The content of the dialog goes here.</p>,
  },
} satisfies Meta<typeof DialogCard>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
