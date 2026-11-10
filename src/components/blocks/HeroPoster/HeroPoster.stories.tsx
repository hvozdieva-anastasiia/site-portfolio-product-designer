import type { Meta, StoryObj } from '@storybook/react-vite';
import { processSteps, rive } from '../../../content';
import { HeroPoster } from './HeroPoster';

const meta = {
  component: HeroPoster,
  title: 'Blocks/HeroPoster',
  parameters: { layout: 'fullscreen' },
  args: {
    kicker: 'Hi, I’m Anastasiia · Senior Product Designer',
    title: (
      <>
        I find the <em>right</em>
        <br />
        <em>problems</em> to solve.
      </>
    ),
    summary:
      'Then I validate solutions through research, data and experimentation, for telecom, travel and advertising products.',
    primaryAction: { label: 'View selected work', href: '#cases' },
    secondaryAction: { label: 'Get in touch', onClick: () => {} },
    steps: processSteps,
    rive,
    processLabel: 'How I work',
    characterLabel: 'Animated portrait at her laptop',
  },
} satisfies Meta<typeof HeroPoster>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
