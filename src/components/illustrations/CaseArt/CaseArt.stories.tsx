import type { Meta, StoryObj } from '@storybook/react-vite';
import { CaseArt } from './CaseArt';

const meta = {
  component: CaseArt,
  title: 'Illustrations/CaseArt',
  decorators: [
    (Story) => (
      <div style={{ width: 620 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CaseArt>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Onboarding: Story = { args: { kind: 'onboarding' } };
export const Dashboard: Story = { args: { kind: 'dashboard' } };
export const Booking: Story = { args: { kind: 'booking' } };
