import type { Meta, StoryObj } from '@storybook/react-vite';
import { ExternalTextLink, TextLink } from './TextLink';

const meta = {
  component: TextLink,
  title: 'Atoms/TextLink',
} satisfies Meta<typeof TextLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = { args: { href: '#', children: '← All cases' } };
export const External: Story = {
  args: { href: 'https://dou.ua', children: 'All articles' },
  render: () => (
    <ExternalTextLink href="https://dou.ua">All articles</ExternalTextLink>
  ),
};
