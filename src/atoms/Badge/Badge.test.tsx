import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, it, expect } from 'vitest';
import { Badge } from './Badge';
describe('Badge', () => {
  it('renders without a11y violations', async () => {
    const { container } = render(<Badge>Sale</Badge>);
    expect(await axe(container)).toHaveNoViolations();
  });
  it('applies sale variant', () => {
    const { container } = render(<Badge variant="sale">Sale</Badge>);
    expect(container.firstChild).toHaveClass('bg-destructive');
  });
});
