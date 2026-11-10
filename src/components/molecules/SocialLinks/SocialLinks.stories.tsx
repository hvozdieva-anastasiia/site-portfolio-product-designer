import type { Meta, StoryObj } from '@storybook/react-vite';
import { SocialLinks } from './SocialLinks';

const meta = {
  component: SocialLinks,
  title: 'Molecules/SocialLinks',
  args: {
    links: [
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/',
        icon: 'linkedin',
      },
      { label: 'YouTube', href: 'https://www.youtube.com/', icon: 'youtube' },
    ],
  },
} satisfies Meta<typeof SocialLinks>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
