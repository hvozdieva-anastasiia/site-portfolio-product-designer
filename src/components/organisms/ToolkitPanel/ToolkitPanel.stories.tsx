import type { Meta, StoryObj } from '@storybook/react-vite';
import { rive, toolGroups } from '../../../content';
import { ToolkitPanel } from './ToolkitPanel';

const meta = {
  component: ToolkitPanel,
  title: 'Organisms/ToolkitPanel',
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ padding: 24 }}>
        <Story />
      </div>
    ),
  ],
  args: { groups: toolGroups, rive },
} satisfies Meta<typeof ToolkitPanel>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
