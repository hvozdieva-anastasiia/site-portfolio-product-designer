import type { Meta, StoryObj } from '@storybook/react-vite';
import { cases } from '../../../content';
import { CaseSpec } from './CaseSpec';

const meta = {
  component: CaseSpec,
  title: 'Organisms/CaseSpec',
  decorators: [
    (Story) => (
      <div style={{ width: 480 }}>
        <Story />
      </div>
    ),
  ],
  args: { domains: cases[0].domains, tools: cases[0].tools },
} satisfies Meta<typeof CaseSpec>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
