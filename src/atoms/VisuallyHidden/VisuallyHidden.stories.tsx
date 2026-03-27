import type { Meta, StoryObj } from '@storybook/react';
import { VisuallyHidden } from './VisuallyHidden';

const meta: Meta<typeof VisuallyHidden> = {
  title: 'Atoms/VisuallyHidden',
  component: VisuallyHidden,
};
export default meta;
export const Default: StoryObj<typeof VisuallyHidden> = {
  args: { children: 'This text is only visible to screen readers' },
};
