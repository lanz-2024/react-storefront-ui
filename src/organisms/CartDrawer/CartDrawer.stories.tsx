import type { Meta, StoryObj } from '@storybook/react';
import { CartDrawer } from './CartDrawer';

const meta: Meta<typeof CartDrawer> = {
  title: 'Organisms/CartDrawer',
  component: CartDrawer,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof CartDrawer>;

const sampleCartItems = (
  <div className="space-y-4">
    <div className="flex items-center gap-4">
      <img
        src="https://placehold.co/80x80"
        alt="Classic White T-Shirt"
        width={80}
        height={80}
        className="rounded"
      />
      <div>
        <p className="font-medium">Classic White T-Shirt</p>
        <p className="text-sm text-muted-foreground">$29.99 × 2</p>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <img
        src="https://placehold.co/80x80"
        alt="Blue Denim Jacket"
        width={80}
        height={80}
        className="rounded"
      />
      <div>
        <p className="font-medium">Blue Denim Jacket</p>
        <p className="text-sm text-muted-foreground">$89.99 × 1</p>
      </div>
    </div>
  </div>
);

export const WithItems: Story = {
  args: {
    isOpen: true,
    itemCount: 2,
    onClose: () => {},
    children: sampleCartItems,
  },
};

export const Empty: Story = {
  args: {
    isOpen: true,
    itemCount: 0,
    onClose: () => {},
    children: <p className="text-center text-muted-foreground py-8">Your cart is empty.</p>,
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    itemCount: 2,
    onClose: () => {},
    children: sampleCartItems,
  },
};
