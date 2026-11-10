import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckIcon, MoonIcon, PlayIcon, SunIcon } from './Icon';

const meta = { title: 'Atoms/Icon', component: SunIcon } satisfies Meta<
  typeof SunIcon
>;

export default meta;

export const All: StoryObj<typeof meta> = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <SunIcon />
      <MoonIcon />
      <CheckIcon />
      <PlayIcon />
    </div>
  ),
};
