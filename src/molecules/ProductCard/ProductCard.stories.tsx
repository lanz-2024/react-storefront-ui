import type { Meta, StoryObj } from '@storybook/react';
import { ProductCard } from './ProductCard';
const meta: Meta<typeof ProductCard> = { title: 'Molecules/ProductCard', component: ProductCard };
export default meta;
type Story = StoryObj<typeof ProductCard>;
export const Default: Story = { args: { id: '1', name: 'Premium Widget', price: 29.99, image: { src: 'https://placehold.co/400', alt: 'Widget' }, slug: 'premium-widget' } };
export const OnSale: Story = { args: { ...Default.args, compareAtPrice: 49.99, badge: 'sale' } };
export const OutOfStock: Story = { args: { ...Default.args, stockStatus: 'outofstock', badge: 'out-of-stock' } };
