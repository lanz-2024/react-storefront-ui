import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FilterPanel } from './FilterPanel';

const meta: Meta<typeof FilterPanel> = { title: 'Organisms/FilterPanel', component: FilterPanel };
export default meta;
const groups = [
  {
    id: 'category',
    label: 'Category',
    options: [
      { value: 'electronics', label: 'Electronics', count: 42 },
      { value: 'clothing', label: 'Clothing', count: 28 },
    ],
  },
  {
    id: 'price',
    label: 'Price Range',
    options: [
      { value: 'under-25', label: 'Under $25' },
      { value: '25-50', label: '$25 – $50' },
      { value: '50-100', label: '$50 – $100' },
    ],
  },
];
export const Default: StoryObj<typeof FilterPanel> = {
  render: () => {
    const [selected, setSelected] = useState<Record<string, string[]>>({});
    return (
      <FilterPanel
        groups={groups}
        selected={selected}
        onChange={(id, vals) => setSelected((p) => ({ ...p, [id]: vals }))}
        className="w-64"
      />
    );
  },
};
