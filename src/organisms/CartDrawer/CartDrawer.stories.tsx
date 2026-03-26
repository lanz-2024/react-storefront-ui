import type { Meta, StoryObj } from '@storybook/react';
import { CartDrawer } from './CartDrawer';
const meta: Meta<typeof CartDrawer> = { title: 'Organisms/CartDrawer', component: CartDrawer };
export default meta;
export const Open: StoryObj<typeof CartDrawer> = {
  args: { isOpen: true, itemCount: 3, onClose: () => {}, children: <div className="space-y-4"><p>Cart item 1</p><p>Cart item 2</p></div> },
};
