import type { Meta, StoryObj } from '@storybook/react-vite';
import { rive } from '../../../content';
import { CharacterScene } from '../../illustrations/CharacterScene/CharacterScene';
import { RiveSlot } from './RiveSlot';

const meta = {
  component: RiveSlot,
  title: 'Organisms/RiveSlot',
  decorators: [
    (Story) => (
      <div style={{ width: 480, height: 420 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    src: rive.src,
    artboard: rive.artboard,
    machine: rive.idle,
    label: 'Animated portrait at her laptop',
    children: <CharacterScene />,
  },
} satisfies Meta<typeof RiveSlot>;

export default meta;
export const Idle: StoryObj<typeof meta> = {};
