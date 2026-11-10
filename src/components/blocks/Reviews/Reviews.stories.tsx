import type { Meta, StoryObj } from '@storybook/react-vite';
import { profile, reviews } from '../../../content';
import { Reviews } from './Reviews';

const meta = {
  component: Reviews,
  title: 'Blocks/Reviews',
  parameters: { layout: 'fullscreen' },
  args: {
    reviews,
    heading: {
      kicker: 'Reviews',
      first: 'Kind words.',
      second: 'Recommendations from colleagues on LinkedIn.',
    },
    recommendationsUrl: profile.linkedinRecommendations,
  },
} satisfies Meta<typeof Reviews>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
