import type { Meta, StoryObj } from '@storybook/react-vite';
import { articles, profile } from '../../../content';
import { Articles } from './Articles';

const meta = {
  component: Articles,
  title: 'Blocks/Articles',
  parameters: { layout: 'fullscreen' },
  args: {
    items: articles,
    heading: {
      kicker: 'Writing',
      first: 'Articles.',
      second: 'Notes on product design, published on DOU.',
    },
    allLink: { label: 'All articles', href: profile.dou },
  },
} satisfies Meta<typeof Articles>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
