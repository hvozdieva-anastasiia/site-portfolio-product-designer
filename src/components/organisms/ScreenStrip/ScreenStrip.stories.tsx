import type { Meta, StoryObj } from '@storybook/react-vite';
import { caseStudies } from '../../../content';
import { ScreenStrip } from './ScreenStrip';

const { flow, hero } = caseStudies[0];

const meta = {
  component: ScreenStrip,
  title: 'Organisms/ScreenStrip',
  parameters: { layout: 'padded' },
  args: { screens: hero.screens, eager: true, label: 'Final screens' },
} satisfies Meta<typeof ScreenStrip>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
export const Flow: StoryObj<typeof meta> = {
  args: {
    screens: flow.steps.map((step) => step.screen),
    steps: flow.steps.map((step) => step.label),
    label: 'The new activation flow',
  },
};
