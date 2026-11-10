import type { Meta, StoryObj } from '@storybook/react-vite';
import { caseStudies, cases } from '../../../content';
import { CaseHero } from './CaseHero';

const meta = {
  component: CaseHero,
  title: 'Blocks/CaseHero',
  parameters: { layout: 'fullscreen' },
  args: {
    ...caseStudies[0].hero,
    backTo: '/#cases',
    externalHref: cases[0].behance,
  },
} satisfies Meta<typeof CaseHero>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
