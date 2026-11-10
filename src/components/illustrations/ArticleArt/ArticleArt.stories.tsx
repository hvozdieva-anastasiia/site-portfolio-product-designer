import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArticleArt } from './ArticleArt';

const meta = {
  component: ArticleArt,
  title: 'Illustrations/ArticleArt',
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ArticleArt>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Questions: Story = { args: { kind: 'questions' } };
export const CrowdedScreen: Story = { args: { kind: 'crowded' } };
export const HiringStages: Story = { args: { kind: 'hiring' } };
