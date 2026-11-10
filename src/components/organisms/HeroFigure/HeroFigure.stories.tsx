import type { Meta, StoryObj } from '@storybook/react-vite';
import { processSteps, rive } from '../../../content';
import { HeroFigure } from './HeroFigure';

const meta = {
  component: HeroFigure,
  title: 'Organisms/HeroFigure',
  decorators: [
    (Story) => (
      <div style={{ width: 520, height: 700 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    steps: processSteps,
    rive,
    processLabel: 'How I work',
    characterLabel: 'Animated portrait at her laptop',
  },
} satisfies Meta<typeof HeroFigure>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
