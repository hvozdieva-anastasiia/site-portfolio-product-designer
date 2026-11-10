import type { Meta, StoryObj } from '@storybook/react-vite';
import { ExternalTextLink } from '../../atoms/TextLink/TextLink';
import { SectionHead } from './SectionHead';

const meta = {
  component: SectionHead,
  title: 'Molecules/SectionHead',
  args: {
    id: 'story-heading',
    kicker: 'Writing',
    first: 'Articles.',
    second: 'Notes on product design, published on DOU.',
  },
} satisfies Meta<typeof SectionHead>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithAction: Story = {
  args: {
    children: (
      <ExternalTextLink href="https://dou.ua">All articles</ExternalTextLink>
    ),
  },
};
