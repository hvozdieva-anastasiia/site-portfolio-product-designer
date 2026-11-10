import type { Meta, StoryObj } from '@storybook/react-vite';
import { articles } from '../../../content';
import { ArticleVisual } from './ArticleVisual';

const meta = {
  component: ArticleVisual,
  title: 'Organisms/ArticleVisual',
  decorators: [
    (Story) => (
      <div style={{ width: 380 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ArticleVisual>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Cover: Story = {
  args: {
    cover: articles[0].cover,
    coverAlt: articles[0].coverAlt,
    art: articles[0].art,
  },
};
export const IllustrationFallback: Story = {
  args: { cover: '', coverAlt: '', art: 'hiring' },
};
