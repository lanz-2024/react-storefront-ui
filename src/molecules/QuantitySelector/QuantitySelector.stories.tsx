import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { QuantitySelector } from './QuantitySelector';
const meta: Meta<typeof QuantitySelector> = { title: 'Molecules/QuantitySelector', component: QuantitySelector };
export default meta;
export const Default: StoryObj<typeof QuantitySelector> = {
  render: (args) => {
    const [value, setValue] = useState(1);
    return <QuantitySelector {...args} value={value} onChange={setValue} />;
  },
};
