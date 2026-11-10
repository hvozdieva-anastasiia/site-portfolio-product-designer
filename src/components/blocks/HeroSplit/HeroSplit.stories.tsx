import type { Meta, StoryObj } from '@storybook/react-vite';
import { processSteps, rive } from '../../../content';
import { HeroSplit } from './HeroSplit';

const meta = {
  component: HeroSplit,
  title: 'Blocks/HeroSplit',
  parameters: { layout: 'fullscreen' },
  args: {
    kicker: 'Hi, I’m Anastasiia · Senior Product Designer',
    title: (
      <>
        I find the right
        <br />
        problems to solve.
      </>
    ),
    summary:
      'Then I validate solutions through research, data and experimentation.',
    primaryAction: { label: 'View selected work', href: '#cases' },
    secondaryAction: { label: 'Get in touch', onClick: () => {} },
    facts: [
      { label: 'Focus', value: 'Research-led product design' },
      { label: 'Industries', value: 'Telecom, travel, advertising' },
      { label: 'Based in', value: 'Bucharest, Romania' },
    ],
    steps: processSteps,
    rive,
    processLabel: 'How I work',
    characterLabel: 'Animated portrait at her laptop',
  },
} satisfies Meta<typeof HeroSplit>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
