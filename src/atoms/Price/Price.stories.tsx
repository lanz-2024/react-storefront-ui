import type { Meta, StoryObj } from '@storybook/react';
import { Price } from './Price';
const meta: Meta<typeof Price> = { title: 'Atoms/Price', component: Price };
export default meta;
type Story = StoryObj<typeof Price>;
export const Default: Story = { args: { amount: 29.99 } };
export const OnSale: Story = { args: { amount: 49.99, saleAmount: 29.99 } };
export const EUR: Story = { args: { amount: 39.99, currency: 'EUR', locale: 'de-DE' } };
