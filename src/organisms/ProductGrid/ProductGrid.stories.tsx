import type { Meta, StoryObj } from '@storybook/react';
import { ProductGrid } from './ProductGrid';
const meta: Meta<typeof ProductGrid> = { title: 'Organisms/ProductGrid', component: ProductGrid };
export default meta;
const products = Array.from({ length: 8 }, (_, i) => ({
  id: String(i + 1), name: `Product ${i + 1}`, price: (i + 1) * 19.99,
  image: { src: `https://placehold.co/400?text=P${i + 1}`, alt: `Product ${i + 1}` },
  slug: `product-${i + 1}`,
}));
export const Default: StoryObj<typeof ProductGrid> = { args: { products } };
export const Loading: StoryObj<typeof ProductGrid> = { args: { products: [], loading: true } };
