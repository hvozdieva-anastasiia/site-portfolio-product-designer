import type { Meta, StoryObj } from '@storybook/react-vite';
import { caseStudies } from '../../../content';
import { SolutionCase } from './SolutionCase';

const meta = {
  component: SolutionCase,
  title: 'Organisms/SolutionCase',
  parameters: { layout: 'padded' },
  args: { n: 3, direction: caseStudies[0].solution.directions[2] },
} satisfies Meta<typeof SolutionCase>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
