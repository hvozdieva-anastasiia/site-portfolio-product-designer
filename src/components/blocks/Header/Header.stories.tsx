import type { Meta, StoryObj } from '@storybook/react-vite';
import { navLinks, profile } from '../../../content';
import { Header } from './Header';

const meta = {
  component: Header,
  title: 'Blocks/Header',
  parameters: { layout: 'fullscreen' },
  args: {
    name: profile.name,
    links: navLinks,
    linkedinUrl: profile.linkedin,
    onContact: () => {},
  },
} satisfies Meta<typeof Header>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
