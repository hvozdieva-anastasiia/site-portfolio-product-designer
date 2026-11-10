import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChatPreview } from './ChatPreview';

const meta = {
  component: ChatPreview,
  title: 'Organisms/ChatPreview',
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 440 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    name: 'Anastasiia Hvozdieva',
    greeting:
      'Hi! Tell me a bit about your product and what you’re trying to solve.',
    reply: 'We need to fix onboarding before the next release…',
  },
} satisfies Meta<typeof ChatPreview>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
