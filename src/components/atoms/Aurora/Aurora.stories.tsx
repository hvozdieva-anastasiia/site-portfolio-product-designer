import type { Meta, StoryObj } from '@storybook/react-vite';
import { Aurora } from './Aurora';

const meta = {
  component: Aurora,
  title: 'Atoms/Aurora',
  decorators: [
    (Story) => (
      <div
        style={{
          position: 'relative',
          height: 220,
          overflow: 'hidden',
          borderRadius: 16,
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Aurora>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Panel: Story = { args: { variant: 'panel' } };
