import type { Meta, StoryObj } from '@storybook/react-vite';
import { profile } from '../../../content';
import { Contact } from './Contact';

const meta = {
  component: Contact,
  title: 'Blocks/Contact',
  parameters: { layout: 'fullscreen' },
  args: { name: profile.name, onContact: () => {} },
} satisfies Meta<typeof Contact>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
