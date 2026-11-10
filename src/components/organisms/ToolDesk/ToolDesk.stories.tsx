import type { Meta, StoryObj } from '@storybook/react-vite';
import { rive, toolGroups } from '../../../content';
import { ToolDesk } from './ToolDesk';

const meta = {
  component: ToolDesk,
  title: 'Organisms/ToolDesk',
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ padding: 24 }}>
        <Story />
      </div>
    ),
  ],
  args: { groups: toolGroups, rive },
} satisfies Meta<typeof ToolDesk>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
