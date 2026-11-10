import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContactDialog } from './ContactDialog';

const meta = {
  component: ContactDialog,
  title: 'Organisms/ContactDialog',
  args: {
    open: true,
    session: 1,
    onClose: () => {},
    email: 'hello@example.com',
    formEndpoint: '',
  },
} satisfies Meta<typeof ContactDialog>;

export default meta;
export const Open: StoryObj<typeof meta> = {};
