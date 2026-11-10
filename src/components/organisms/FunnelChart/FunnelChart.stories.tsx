import type { Meta, StoryObj } from '@storybook/react-vite';
import { caseStudies } from '../../../content';
import { FunnelChart } from './FunnelChart';

const meta = {
  component: FunnelChart,
  title: 'Organisms/FunnelChart',
  args: { kicker: 'Activation funnel', ...caseStudies[0].problem.funnel },
} satisfies Meta<typeof FunnelChart>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
