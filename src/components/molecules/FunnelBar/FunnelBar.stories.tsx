import type { Meta, StoryObj } from '@storybook/react-vite';
import { FunnelBar } from './FunnelBar';

const meta = {
  component: FunnelBar,
  title: 'Molecules/FunnelBar',
  decorators: [
    (Story) => (
      <ol style={{ maxWidth: 640 }}>
        <Story />
      </ol>
    ),
  ],
  args: {
    label: 'Reached phone number entry',
    count: 18224,
    share: '13.16%',
    ratio: 0.1316,
  },
} satisfies Meta<typeof FunnelBar>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
