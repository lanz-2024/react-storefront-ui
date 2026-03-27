import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = { title: 'Atoms/Input', component: Input };
export default meta;
type Story = StoryObj<typeof Input>;
export const Default: Story = { args: { placeholder: 'Enter text...' } };
export const WithError: Story = {
  args: { id: 'email', placeholder: 'Email', error: 'Invalid email address' },
};
export const Disabled: Story = { args: { placeholder: 'Disabled', disabled: true } };
