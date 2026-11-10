import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input, Textarea } from './Input';

const meta = {
  component: Input,
  title: 'Atoms/Input',
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleLine: Story = {
  args: { 'aria-label': 'Name', placeholder: 'Jane Smith' },
};
export const Invalid: Story = {
  args: { 'aria-label': 'Email', 'aria-invalid': true, defaultValue: 'jane@' },
};
export const MultiLine: Story = {
  render: () => (
    <Textarea
      aria-label="Message"
      rows={4}
      placeholder="What are you building?"
    />
  ),
};
