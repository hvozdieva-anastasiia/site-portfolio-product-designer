import type { Meta, StoryObj } from '@storybook/react-vite';
import { profile, talks } from '../../../content';
import { Talks } from './Talks';

const meta = {
  component: Talks,
  title: 'Blocks/Talks',
  parameters: { layout: 'fullscreen' },
  args: {
    items: talks,
    heading: {
      kicker: 'On camera',
      first: 'Talks.',
      second: 'Conversations from the It Depends channel.',
    },
    channel: {
      name: 'It Depends',
      label: 'YouTube channel',
      href: profile.youtube,
    },
  },
} satisfies Meta<typeof Talks>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
