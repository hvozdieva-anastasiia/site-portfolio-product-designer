import type { Meta, StoryObj } from '@storybook/react-vite';
import { QuoteFigure } from './QuoteFigure';

const meta = {
  component: QuoteFigure,
  title: 'Molecules/QuoteFigure',
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 780, margin: '0 auto', padding: 24 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    quote:
      'Working together changed how our team thinks about design. Every decision came with research behind it and a metric to check it against.',
    name: 'Reviewer Name',
    role: 'Head of Product, Company',
    meta: 'Managed Anastasia directly · May 2025',
    active: true,
    label: 'Recommendation 1 of 13',
  },
} satisfies Meta<typeof QuoteFigure>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
