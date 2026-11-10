import type { Meta, StoryObj } from '@storybook/react-vite';
import { RouterLink } from './RouterLink';

const meta = {
  component: RouterLink,
  title: 'Atoms/RouterLink',
  args: { to: '/cases/yezzz', children: 'Open the case' },
} satisfies Meta<typeof RouterLink>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
