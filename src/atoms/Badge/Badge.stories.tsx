import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = { title: 'Atoms/Badge', component: Badge };
export default meta;
type Story = StoryObj<typeof Badge>;
export const Default: Story = { args: { children: 'New' } };
export const Sale: Story = { args: { variant: 'sale', children: 'Sale' } };
export const OutOfStock: Story = { args: { variant: 'out-of-stock', children: 'Out of Stock' } };
