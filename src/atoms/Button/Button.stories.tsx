import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Polymorphic button with CVA variant system. Renders as any HTML element via the `as` prop. Fully accessible with keyboard navigation and ARIA attributes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'destructive', 'outline', 'link'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'icon'],
      description: 'Button size',
    },
    isLoading: {
      control: 'boolean',
      description: 'Shows loading spinner and disables interaction',
    },
    disabled: {
      control: 'boolean',
    },
    as: {
      control: 'text',
      description: 'HTML element or component to render as (polymorphic)',
    },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    isLoading: false,
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: 'primary', children: 'Add to Cart' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Save for Later' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Cancel' },
};

export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Remove Item' },
};

export const Outline: Story = {
  args: { variant: 'outline', children: 'View Details' },
};

export const Link: Story = {
  args: { variant: 'link', children: 'View all products' },
};

export const Small: Story = {
  args: { size: 'sm', children: 'Quick Add' },
};

export const Large: Story = {
  args: { size: 'lg', children: 'Checkout Now' },
};

export const Loading: Story = {
  args: { isLoading: true, children: 'Processing...' },
};

export const LoadingCustomLabel: Story = {
  args: { isLoading: true, loadingLabel: 'Adding to cart…', children: 'Add to Cart' },
  name: 'Loading (custom label)',
};

export const Disabled: Story = {
  args: { disabled: true, children: 'Out of Stock' },
};

export const AsAnchor: Story = {
  args: { as: 'a', href: '/products', children: 'Shop All Products', variant: 'outline' },
  name: 'Polymorphic — as <a>',
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
  name: 'All Variants',
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
  name: 'All Sizes',
};
