import type { Meta, StoryObj } from '@storybook/react-vite';
import { VideoThumb } from './VideoThumb';

const meta = {
  component: VideoThumb,
  title: 'Molecules/VideoThumb',
  decorators: [
    (Story) => (
      <div style={{ width: 420 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    kicker: 'It Depends',
    title: '4 hours until release. How to decide without data?',
    duration: '22:10',
  },
} satisfies Meta<typeof VideoThumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DrawnSlide: Story = {};
export const YouTubeThumbnail: Story = { args: { youtubeId: 'Zbnu4FYPHCQ' } };
