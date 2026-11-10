import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContactForm } from './ContactForm';

const meta = {
  component: ContactForm,
  title: 'Organisms/ContactForm',
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 560 }}>
        <Story />
      </div>
    ),
  ],
  args: { email: 'hello@example.com', endpoint: '', onClose: () => {} },
} satisfies Meta<typeof ContactForm>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
