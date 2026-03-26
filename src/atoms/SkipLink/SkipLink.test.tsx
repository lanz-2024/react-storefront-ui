import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, it, expect } from 'vitest';
import { SkipLink } from './SkipLink';
describe('SkipLink', () => {
  it('renders without a11y violations', async () => {
    const { container } = render(<SkipLink />);
    expect(await axe(container)).toHaveNoViolations();
  });
  it('has correct href', () => {
    const { getByRole } = render(<SkipLink href="#main" />);
    expect(getByRole('link')).toHaveAttribute('href', '#main');
  });
});
