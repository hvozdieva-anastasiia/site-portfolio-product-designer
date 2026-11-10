import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, ButtonLink } from './Button';

const meta = {
  component: Button,
  title: 'Atoms/Button',
  args: { children: 'Get in touch' },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Lift: Story = { args: { variant: 'lift' } };
export const Carbon: Story = { args: { variant: 'carbon' } };
export const Disabled: Story = { args: { variant: 'carbon', disabled: true } };
export const AsLink: Story = {
  render: () => (
    <ButtonLink variant="carbon" href="#cases">
      View selected work
    </ButtonLink>
  ),
};
