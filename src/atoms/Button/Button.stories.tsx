import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'destructive'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    isLoading: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: 'primary', size: 'md', children: 'Add to Cart' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', size: 'md', children: 'Save for Later' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', size: 'md', children: 'View Details' },
};

export const Destructive: Story = {
  args: { variant: 'destructive', size: 'md', children: 'Remove Item' },
};

export const Loading: Story = {
  args: { variant: 'primary', size: 'md', children: 'Adding...', isLoading: true },
};

export const Disabled: Story = {
  args: { variant: 'primary', size: 'md', children: 'Out of Stock', disabled: true },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Button variant="primary" size="sm">Small</Button>
      <Button variant="primary" size="md">Medium</Button>
      <Button variant="primary" size="lg">Large</Button>
    </div>
  ),
};
