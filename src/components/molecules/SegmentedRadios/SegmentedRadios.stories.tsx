import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { SegmentedRadios } from './SegmentedRadios';

const options = [
  { value: 'project', label: 'Project' },
  { value: 'role', label: 'Full-time role' },
  { value: 'hello', label: 'Just saying hi' },
];

const meta = {
  component: SegmentedRadios,
  title: 'Molecules/SegmentedRadios',
} satisfies Meta<typeof SegmentedRadios>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {
    legend: 'What�s this about?',
    name: 'topic',
    options,
    value: 'project',
    onChange: () => {},
  },
  render: function Render() {
    const [value, setValue] = useState('project');
    return (
      <SegmentedRadios
        legend="What’s this about?"
        name="topic"
        options={options}
        value={value}
        onChange={setValue}
      />
    );
  },
};
