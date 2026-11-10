import type { Meta, StoryObj } from '@storybook/react-vite';
import { profile, reviews } from '../../../content';
import { ReviewsSlider } from './ReviewsSlider';

const meta = {
  component: ReviewsSlider,
  title: 'Organisms/ReviewsSlider',
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ padding: 24 }}>
        <Story />
      </div>
    ),
  ],
  args: { reviews, fullTextUrl: profile.linkedinRecommendations },
} satisfies Meta<typeof ReviewsSlider>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
