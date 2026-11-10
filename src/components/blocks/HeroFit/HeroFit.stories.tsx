import type { Meta, StoryObj } from '@storybook/react-vite';
import { processSteps, profile, rive } from '../../../content';
import { HeroFit } from './HeroFit';

const meta = {
  component: HeroFit,
  title: 'Blocks/HeroFit',
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
      'Then I validate solutions through research, data and experimentation, for telecom, travel and advertising products.',
    primaryAction: { label: 'View selected work', href: '#cases' },
    secondaryAction: { label: 'Get in touch', onClick: () => {} },
    steps: processSteps,
    rive,
    processLabel: 'How I work',
    characterLabel: 'Animated portrait at her laptop',
  },
} satisfies Meta<typeof HeroFit>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
