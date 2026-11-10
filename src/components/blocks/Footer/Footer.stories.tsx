import type { Meta, StoryObj } from '@storybook/react-vite';
import { cases, navLinks, profile } from '../../../content';
import { Footer } from './Footer';

const meta = {
  component: Footer,
  title: 'Blocks/Footer',
  parameters: { layout: 'fullscreen' },
  args: {
    name: profile.name,
    role: profile.role,
    cases,
    exploreLinks: navLinks.filter((link) => link.href !== '/#cases'),
    socials: [
      { label: 'LinkedIn', href: profile.linkedin, icon: 'linkedin' },
      { label: 'YouTube', href: profile.youtube, icon: 'youtube' },
    ],
    onContact: () => {},
  },
} satisfies Meta<typeof Footer>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
