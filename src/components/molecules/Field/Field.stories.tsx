import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input, Textarea } from '../../atoms/Input/Input';
import { Field } from './Field';

const meta = {
  component: Field,
  title: 'Molecules/Field',
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Name',
    htmlFor: 'story-name',
    errorId: 'story-name-error',
    children: <Input id="story-name" placeholder="Jane Smith" />,
  },
};
export const WithError: Story = {
  args: {
    label: 'Email',
    htmlFor: 'story-email',
    errorId: 'story-email-error',
    error: 'That email doesn’t look right.',
    children: (
      <Input
        id="story-email"
        aria-invalid
        aria-describedby="story-email-error"
        defaultValue="jane@"
      />
    ),
  },
};
export const WithCounter: Story = {
  args: {
    label: 'Message',
    htmlFor: 'story-message',
    errorId: 'story-message-error',
    counter: '0/2000',
    children: <Textarea id="story-message" rows={4} />,
  },
};
