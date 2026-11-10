import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { cases } from '../../../content';
import { CaseCard } from './CaseCard';

const meta = {
  component: CaseCard,
  title: 'Organisms/CaseCard',
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '1244px', marginInline: 'auto', padding: 24 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CaseCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Yezzz: Story = { args: { item: cases[0], number: 1 } };
export const YoEsim: Story = { args: { item: cases[1], number: 2 } };
export const AdApp: Story = { args: { item: cases[2], number: 3 } };

export const LinksToCasePage: Story = {
  args: { ...Yezzz.args },
  play: async ({ canvas, args }) => {
    // The title, the preview and the button all lead to the case page.
    const links = [
      canvas.getByRole('link', { name: args.item.title }),
      ...canvas.getAllByRole('link', {
        name: `View project: ${args.item.title}`,
      }),
    ];
    expect(links).toHaveLength(3);
    for (const link of links) {
      await expect(link).toHaveAttribute('href', `/cases/${args.item.slug}`);
    }
  },
};
