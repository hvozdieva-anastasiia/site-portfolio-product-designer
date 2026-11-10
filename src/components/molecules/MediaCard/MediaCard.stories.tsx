import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArticleArt } from '../../illustrations/ArticleArt/ArticleArt';
import { MediaCard } from './MediaCard';

const meta = {
  component: MediaCard,
  title: 'Molecules/MediaCard',
  decorators: [
    (Story) => (
      <div style={{ width: 380 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    href: '#',
    media: <ArticleArt kind="questions" />,
    meta: 'DOU · 21 Oct 2026 · in Ukrainian',
    title: 'Why a good product designer asks questions before opening Figma',
    text: 'A team exercise on a product task with little time and incomplete information.',
    linkLabel: 'Read on DOU',
  },
} satisfies Meta<typeof MediaCard>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
