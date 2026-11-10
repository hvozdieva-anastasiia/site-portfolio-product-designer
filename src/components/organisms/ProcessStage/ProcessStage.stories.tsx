import type { Meta, StoryObj } from '@storybook/react-vite';
import { processSteps, rive } from '../../../content';
import { ProcessStage } from './ProcessStage';

const meta = {
  component: ProcessStage,
  title: 'Organisms/ProcessStage',
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ padding: 24 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    steps: processSteps,
    rive,
    label: 'How I work',
    characterLabel: 'Animated portrait at her laptop',
  },
} satisfies Meta<typeof ProcessStage>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
