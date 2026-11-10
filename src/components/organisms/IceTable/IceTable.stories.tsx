import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { caseStudies } from '../../../content';
import { IceTable } from './IceTable';

const { items, selected } = caseStudies[0].hypotheses;

const meta = {
  component: IceTable,
  title: 'Organisms/IceTable',
  args: { items, selected, caption: 'Hypotheses ranked by ICE score' },
} satisfies Meta<typeof IceTable>;

export default meta;
export const Default: StoryObj<typeof meta> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('button', { name: 'Show all 15' });
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(canvas.getAllByRole('row')).toHaveLength(16);
  },
};
