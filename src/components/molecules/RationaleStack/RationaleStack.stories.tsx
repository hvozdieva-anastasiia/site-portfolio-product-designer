import type { Meta, StoryObj } from '@storybook/react-vite';
import { caseStudies } from '../../../content';
import { RationaleStack } from './RationaleStack';

const direction = caseStudies[0].solution.directions[2];

const meta = {
  component: RationaleStack,
  title: 'Molecules/RationaleStack',
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 420 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    hypothesis: direction.hypothesis,
    insight: direction.insight,
    decision: direction.decision,
  },
} satisfies Meta<typeof RationaleStack>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
