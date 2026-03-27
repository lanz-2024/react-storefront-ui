import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
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
