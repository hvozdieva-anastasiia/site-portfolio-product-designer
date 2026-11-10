import type { Meta, StoryObj } from '@storybook/react-vite';
import { processSteps, profile, rive } from '../../../content';
import { Hero } from './Hero';

const meta = {
  component: Hero,
  title: 'Blocks/Hero',
  parameters: { layout: 'fullscreen' },
  args: {
    kicker: `${profile.role} · ${profile.location}`,
    title: (
      <>
        Hi, I’m Anastasiia.
        <br />I find the right
        <br />
        problems to solve.
      </>
    ),
    summary:
      'Then I validate solutions through research, data and experimentation.',
    primaryAction: { label: 'View selected work', href: '#cases' },
    secondaryAction: { label: 'Get in touch', onClick: () => {} },
    steps: processSteps,
    rive,
    processLabel: 'How I work',
    characterLabel: 'Animated portrait at her laptop',
  },
} satisfies Meta<typeof Hero>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
