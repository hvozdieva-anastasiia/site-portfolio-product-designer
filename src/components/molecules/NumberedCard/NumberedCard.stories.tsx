import type { Meta, StoryObj } from '@storybook/react-vite';
import { NumberedCard } from './NumberedCard';

const meta = {
  component: NumberedCard,
  title: 'Molecules/NumberedCard',
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 320 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    n: 2,
    tag: 'Drop-off reasons',
    title: 'Find activation barriers',
    text: 'Why do users stop after clicking the Yezzz! banner?',
  },
} satisfies Meta<typeof NumberedCard>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
