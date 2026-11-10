import type { Meta, StoryObj } from '@storybook/react-vite';
import { caseStudies } from '../../../content';
import { PhoneShot } from './PhoneShot';

const meta = {
  component: PhoneShot,
  title: 'Atoms/PhoneShot',
  decorators: [
    (Story) => (
      <div style={{ width: 260, padding: 24 }}>
        <Story />
      </div>
    ),
  ],
  args: { ...caseStudies[0].hero.screens[0], loading: 'eager' },
} satisfies Meta<typeof PhoneShot>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
