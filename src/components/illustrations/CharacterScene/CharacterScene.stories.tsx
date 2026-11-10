import type { Meta, StoryObj } from '@storybook/react-vite';
import { CharacterScene } from './CharacterScene';

const meta = {
  component: CharacterScene,
  title: 'Illustrations/CharacterScene',
  decorators: [
    (Story) => (
      <div style={{ width: 480 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CharacterScene>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
