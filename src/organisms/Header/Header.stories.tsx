import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

const meta: Meta<typeof Header> = { title: 'Organisms/Header', component: Header };
export default meta;
export const Default: StoryObj<typeof Header> = {
  args: {
    cartItemCount: 2,
    onSearch: (q) => console.log(q),
    onCartOpen: () => {},
    nav: [
      { label: 'Products', href: '/products' },
      { label: 'Collections', href: '/collections' },
    ],
  },
};
