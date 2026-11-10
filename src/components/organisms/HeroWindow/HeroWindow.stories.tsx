import type { Meta, StoryObj } from '@storybook/react-vite';
import { processSteps, profile, rive } from '../../../content';
import { HeroWindow } from './HeroWindow';

const meta = {
  component: HeroWindow,
  title: 'Organisms/HeroWindow',
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ height: 620, padding: 24 }}>
        <Story />
      </div>
    ),
  ],
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
} satisfies Meta<typeof HeroWindow>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
