import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from './FormField';

const meta: Meta<typeof FormField> = { title: 'Molecules/FormField', component: FormField };
export default meta;
type Story = StoryObj<typeof FormField>;
export const Default: Story = { args: { label: 'Email Address', placeholder: 'you@example.com' } };
export const WithHint: Story = {
  args: { label: 'Password', type: 'password', hint: 'At least 8 characters' },
};
export const WithError: Story = {
  args: { label: 'Email Address', error: 'Please enter a valid email' },
};
