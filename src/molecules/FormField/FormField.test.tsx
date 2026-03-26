import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, it, expect } from 'vitest';
import { FormField } from './FormField';
describe('FormField', () => {
  it('renders without a11y violations', async () => {
    const { container } = render(<FormField label="Email" placeholder="you@example.com" />);
    expect(await axe(container)).toHaveNoViolations();
  });
  it('renders with error', async () => {
    const { container } = render(<FormField label="Email" error="Required" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
