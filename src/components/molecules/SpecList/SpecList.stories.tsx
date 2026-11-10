import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChipList } from '../ChipList/ChipList';
import { SpecList, SpecRow } from './SpecList';

const meta = {
  component: SpecList,
  title: 'Molecules/SpecList',
  decorators: [
    (Story) => (
      <div style={{ width: 420 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SpecList>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: { children: null },
  render: () => (
    <SpecList>
      <SpecRow label="Design">
        <ChipList label="Design work" items={['UI/UX', 'Interaction design']} />
      </SpecRow>
      <SpecRow label="Product">
        <ChipList label="Product work" items={['Mobile app', 'Landing page']} />
      </SpecRow>
    </SpecList>
  ),
};
