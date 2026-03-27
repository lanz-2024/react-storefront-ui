import type { Meta, StoryObj } from '@storybook/react';
import { Price } from './Price';

const meta: Meta<typeof Price> = {
  title: 'Atoms/Price',
  component: Price,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Price>;

export const Default: Story = {
  args: { amount: 29.99, currency: 'USD' },
};

export const OnSale: Story = {
  args: { amount: 29.99, saleAmount: 19.99, currency: 'USD' },
};

export const Free: Story = {
  args: { amount: 0, currency: 'USD' },
};

export const LargeAmount: Story = {
  args: { amount: 1299.99, currency: 'USD' },
};
