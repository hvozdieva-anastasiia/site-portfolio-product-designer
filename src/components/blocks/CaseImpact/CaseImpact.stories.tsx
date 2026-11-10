import type { Meta, StoryObj } from '@storybook/react-vite';
import { caseStudies } from '../../../content';
import { CaseImpact } from './CaseImpact';

const meta = {
  component: CaseImpact,
  title: 'Blocks/CaseImpact',
  parameters: { layout: 'fullscreen' },
  args: { kicker: '06 — Impact', ...caseStudies[0].impact },
} satisfies Meta<typeof CaseImpact>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
