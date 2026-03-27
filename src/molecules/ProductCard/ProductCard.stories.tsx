import type { Meta, StoryObj } from '@storybook/react';
import { ProductCard } from './ProductCard';

const meta: Meta<typeof ProductCard> = {
  title: 'Molecules/ProductCard',
  component: ProductCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

const sampleProduct = {
  id: 'classic-white-t-shirt',
  name: 'Classic White T-Shirt',
  slug: 'classic-white-t-shirt',
  price: 29.99,
  image: { src: 'https://placehold.co/400x400', alt: 'Classic White T-Shirt' },
};

export const Default: Story = {
  args: { ...sampleProduct },
};

export const OnSale: Story = {
  args: {
    ...sampleProduct,
    compareAtPrice: 29.99,
    price: 19.99,
    badge: 'sale',
  },
};

export const OutOfStock: Story = {
  args: {
    ...sampleProduct,
    stockStatus: 'outofstock',
    badge: 'out-of-stock',
  },
};

export const LongTitle: Story = {
  args: {
    ...sampleProduct,
    name: 'Premium Organic Cotton Long-Sleeve Crew Neck T-Shirt in Classic White',
  },
};
