import type { Meta, StoryObj } from '@storybook/react-vite';
import { Kbd } from '../Kbd/Kbd';
import { Key, KeyLink } from './Key';

const meta = { component: Key, title: 'Atoms/Key' } satisfies Meta<typeof Key>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithShortcut: Story = {
  render: () => (
    <Key aria-keyshortcuts="C">
      Get in touch <Kbd>C</Kbd>
    </Key>
  ),
};
export const IconKey: Story = {
  args: {
    variant: 'icon',
    'aria-label': 'Next',
    children: <span aria-hidden="true">→</span>,
  },
};
export const AsLink: Story = {
  render: () => (
    <KeyLink href="#" variant="icon" aria-label="LinkedIn">
      <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="6" fill="currentColor" />
      </svg>
    </KeyLink>
  ),
};
