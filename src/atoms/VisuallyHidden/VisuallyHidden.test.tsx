import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, it, expect } from 'vitest';
import { VisuallyHidden } from './VisuallyHidden';
describe('VisuallyHidden', () => {
  it('renders without a11y violations', async () => {
    const { container } = render(<VisuallyHidden>Hidden text</VisuallyHidden>);
    expect(await axe(container)).toHaveNoViolations();
  });
  it('has sr-only class', () => {
    const { container } = render(<VisuallyHidden>Screen reader text</VisuallyHidden>);
    expect(container.firstChild).toHaveClass('sr-only');
  });
});
